import type { Logger } from "../logger"
import type { SessionState, WithParts } from "../state"
import { resetSessionState, saveSessionState } from "../state"

export interface ResetCommandContext {
    client: any
    state: SessionState
    logger: Logger
    sessionId: string
    messages: WithParts[]
}

export async function handleResetCommand(ctx: ResetCommandContext): Promise<void> {
    const { state, logger, client, sessionId } = ctx

    resetSessionState(state)
    state.sessionId = sessionId // Restore sessionId after reset
    
    await saveSessionState(state, logger)

    await client.tui.showToast({
        body: {
            title: "DCP: Session Reset",
            message: "Context pruning state has been cleared for this session. Rollbacks and artefacts should now be resolved.",
            variant: "success",
            duration: 3000,
        },
    })
}
