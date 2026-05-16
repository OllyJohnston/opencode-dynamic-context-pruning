export const COMPRESS_RANGE = `HOW TO COMPRESS (TECHNICAL MANUAL)

1. THE SAFETY GAP (MANDATORY)
- **Primary Rule**: Your selection MUST extend back to include the User's most recent instruction (the prompt you are currently fulfilling). Never compress the active task instruction.
- **Minimum Floor**: Maintain a buffer of at least 5 messages (turns) back from the current turn, unless the Primary Rule requires a longer range.
- **Emergency Exception**: If the active instruction or the 5-turn gap are so large they exceed the context limit on their own, you may compress closer to the bottom as a last resort to allow the session to continue.

2. ID SELECTION ALGORITHM
- **startId**: Pick the first available \`mNNNN\` message ID in your history (usually \`m0001\`).
- **endId**: The last message in the range to be compressed (ensure it obeys the Safety Gap).
- **Exclusions**: Skip technical system-reminders when picking boundaries.
- **Visual Order**: In the raw conversation, the \`startId\` must appear vertically above the \`endId\`.

3. PREVIOUS BLOCKS & PLACEHOLDERS (bN)
- **Reference**: If your range includes any \`bN\` block, include its placeholder \`(bN)\` exactly once.
- **Weaving**: Weave \`(bN)\` placeholders into your summary prose chronologically as landmarks.
  - *Example*: "After resolving the dependency issues documented in \`(b10)\`, I proceeded to implement the handler..."

4. THE SUMMARY (EXHAUSTIVE)
- **Purpose**: Your summary replaces the raw messages. It is stored as a block ID (e.g., \`b10\`) and remains accessible via decompression if needed.
- **Content**: Capture file paths, function signatures, decisions, and constraints. This is an authoritative record.
- **User Intent**: Quote user messages directly if short; preserve intent exactly.

5. BATCHING
If multiple independent ranges are ready (e.g., one for a research phase, one for a coding phase), include them as separate entries in the \`content\` array.

6. WHEN NOT TO COMPRESS
- **Mid-Flight**: Never compress while a tool call is pending. Finish your current tool call first, then compress.
- **In-Progress**: Don't compress a task sequence that is still being verified.
- **Reference Need**: Don't compress if you need exact text/errors from those messages in your immediate next turn.

7. EXAMPLE OUTPUT FORMAT
Return ONLY valid JSON. Do not include any prose.
\`\`\`json
{
  "topic": "System Research and Bugfix",
  "content": [
    {
      "startId": "m0001",
      "endId": "m0038",
      "summary": "## Phase 1: Research..."
    },
    {
      "startId": "m0039",
      "endId": "m0062",
      "summary": "## Phase 2: Implementation..."
    }
  ]
}
\`\`\`
`
