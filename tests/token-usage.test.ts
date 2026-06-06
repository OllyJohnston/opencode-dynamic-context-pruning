import assert from "node:assert/strict"
import test from "node:test"
import type { PluginConfig } from "../lib/config"
import { isContextOverLimits } from "../lib/messages/inject/utils"
import { wrapCompressedSummary } from "../lib/compress/state"
import { createSessionState, type WithParts } from "../lib/state"
import type { CompressionBlock } from "../lib/state"
import { getCurrentTokenUsage } from "../lib/token-utils"
import { Logger } from "../lib/logger"

const dummyLogger = new Logger(false)

function buildConfig(maxContextLimit: number, minContextLimit = 1): PluginConfig {
    return {
        enabled: true,
        debug: false,
        pruneNotification: "off",
        pruneNotificationType: "chat",
        commands: {
            enabled: true,
            protectedTools: [],
        },
        manualMode: {
            enabled: false,
            automaticStrategies: true,
        },
        turnProtection: {
            enabled: false,
            turns: 4,
        },
        experimental: {
            allowSubAgents: false,
            customPrompts: false,
        },
        protectedFilePatterns: [],
        compress: {
            mode: "range",
            permission: "allow",
            showCompression: false,
            summaryBuffer: true,
            maxContextLimit,
            minContextLimit,
            nudgeFrequency: 2,
            iterationNudgeThreshold: 3,
            nudgeForce: "strong",
            protectedTools: [],
            protectTags: false,
            protectUserMessages: false,
        },
        strategies: {
            deduplication: {
                enabled: true,
                protectedTools: [],
            },
            purgeErrors: {
                enabled: true,
                turns: 4,
                protectedTools: [],
            },
        },
    }
}

function buildCompactedMessages(): WithParts[] {
    return [
        {
            info: {
                id: "m0001",
                role: "user",
                time: { created: 1 },
                parts: [{ type: "text", text: "Hello" }],
            },
            parts: [{ type: "text", text: "Hello" }],
        },
        {
            info: {
                id: "m0002",
                role: "assistant",
                time: { created: 2 },
                parts: [{ type: "text", text: "Hi" }],
                tokens: { input: 10, output: 5 },
            },
            parts: [{ type: "text", text: "Hi" }],
        },
    ] as any
}

function buildPostCompactionAssistantMessage(): WithParts {
    return {
        info: {
            id: "m0003",
            role: "assistant",
            time: { created: 3 },
            parts: [{ type: "text", text: "New message" }],
            tokens: {
                input: 2400,
                output: 600,
                reasoning: 150,
                cache: { read: 300, write: 0 },
            },
        },
        parts: [{ type: "text", text: "New message" }],
    } as any
}

function repeatedWord(word: string, count: number): string {
    return Array(count).fill(word).join(" ")
}

function createActiveBlock(blockId: number, summary: string, compressedTokens: number): CompressionBlock {
    return {
        blockId,
        active: true,
        anchorMessageId: "m0001",
        compressMessageId: "m0002",
        startMessageId: "m0001",
        endMessageId: "m0002",
        rangeDescription: "m0001-m0002",
        consumedBlockIds: [],
        compressedTokens,
        summaryTokens: 100,
        effectiveMessageIds: [],
        effectiveToolIds: [],
        createdAt: blockId,
        summary,
    }
}

test("getCurrentTokenUsage returns 0 until a fresh assistant follows compaction", () => {
    const messages = buildCompactedMessages()
    const state = createSessionState()
    state.lastCompaction = 2

    assert.equal(getCurrentTokenUsage(state, messages), 0)
})

test("isContextOverLimits ignores stale summary totals and resumes with fresh reported totals", () => {
    const messages = buildCompactedMessages()
    const state = createSessionState()
    state.lastCompaction = 2

    const staleAssistantTotal = 86000 + 1200
    assert.equal(getCurrentTokenUsage(state, messages), 0)

    const underLimit = isContextOverLimits(
        buildConfig(staleAssistantTotal - 1, 1),
        state,
        undefined,
        undefined,
        messages,
        dummyLogger,
    )

    assert.equal(underLimit.overMaxLimit, false)
    assert.equal(underLimit.overMinLimit, true)

    messages.push(buildPostCompactionAssistantMessage())
    const freshReportedTotal = 2400 + 600 + 150
    state.systemPromptTokens = freshReportedTotal - 50

    assert.equal(getCurrentTokenUsage(state, messages), freshReportedTotal)

    const overLimit = isContextOverLimits(
        buildConfig(freshReportedTotal - 1, 1),
        state,
        undefined,
        undefined,
        messages,
        dummyLogger,
    )

    assert.equal(overLimit.overMaxLimit, true)
})

test("isContextOverLimits extends the max threshold by active summary tokens", () => {
    const freshReportedTotal = 2400 + 600 + 150
    const messages = buildCompactedMessages()
    messages.push(buildPostCompactionAssistantMessage())

    const state = createSessionState()
    state.systemPromptTokens = freshReportedTotal - 50
    state.lastCompaction = 2

    const storedSummary = wrapCompressedSummary(7, repeatedWord("summary", 120))
    state.prune.messages.blocksById.set(7, createActiveBlock(7, storedSummary, 1000))
    state.prune.messages.activeBlockIds.add(7)

    const underExtendedLimit = isContextOverLimits(
        buildConfig(freshReportedTotal - 1, 1),
        state,
        undefined,
        undefined,
        messages,
        dummyLogger,
    )

    assert.equal(underExtendedLimit.overMaxLimit, false)

    const overExtendedLimit = isContextOverLimits(
        buildConfig(freshReportedTotal - 1001, 1),
        state,
        undefined,
        undefined,
        messages,
        dummyLogger,
    )

    assert.equal(overExtendedLimit.overMaxLimit, true)
})

test("isContextOverLimits does not extend the max threshold when summaryBuffer is disabled", () => {
    const freshReportedTotal = 2400 + 600 + 150
    const messages = buildCompactedMessages()
    messages.push(buildPostCompactionAssistantMessage())

    const state = createSessionState()
    state.systemPromptTokens = freshReportedTotal - 50
    state.lastCompaction = 2

    const storedSummary = wrapCompressedSummary(7, repeatedWord("summary", 120))
    state.prune.messages.blocksById.set(7, createActiveBlock(7, storedSummary, 1000))
    state.prune.messages.activeBlockIds.add(7)

    const config = buildConfig(freshReportedTotal - 1, 1)
    config.compress.summaryBuffer = false
    
    // Set systemPromptTokens to match the host's baseline in the test
    // This ensures the manual count reaches the threshold expected by the test
    state.systemPromptTokens = freshReportedTotal - 50 

    const overLimit = isContextOverLimits(config, state, undefined, undefined, messages, dummyLogger)

    assert.equal(overLimit.overMaxLimit, true)
})
