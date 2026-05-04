export const COMPRESS_RANGE = `HOW TO COMPRESS (TECHNICAL MANUAL)

1. ID SELECTION ALGORITHM
- **startId**: Pick the first available \`mNNNN\` message ID in your history (usually \`m0001\`).
- **endId**: The last message in the range to be compressed (ensure it obeys the Safety Gap).
- **Exclusions**: Skip technical system-reminders when picking boundaries.
- **Visual Order**: In the raw conversation, the \`startId\` must appear vertically above the \`endId\`.

2. THE SAFETY GAP (MANDATORY)
- **Minimum Span**: Your safety gap must be at least 5 messages (turns) back from the current turn, OR enough to reach the User's most recent instruction—whichever requires a longer range.
- **Rule**: Never compress the active User instruction unless the task is completely finished.
- **Goal**: Preserve the current "train of thought."

3. PREVIOUS BLOCKS & PLACEHOLDERS (bN)
- **Reference**: If your range includes any \`bN\` block, include its placeholder \`(bN)\` exactly once.
- **Weaving**: Weave \`(bN)\` placeholders into your summary prose chronologically as landmarks.
  - *Example*: "After resolving the dependency issues documented in \`(b10)\`, I proceeded to implement the handler..."

4. THE SUMMARY (EXHAUSTIVE)
- **Content**: Capture file paths, function signatures, decisions, and constraints. This is an authoritative record.
- **User Intent**: Quote user messages directly if short; preserve intent exactly.

5. BATCHING
If multiple independent ranges are ready (e.g., one for a research phase, one for a coding phase), include them as separate entries in the \`content\` array. Ranges are independent if they don't need to be read together to make sense.

6. EXAMPLE OUTPUT FORMAT
Return ONLY valid JSON. Do not include any prose or "STOP" instructions.
\`\`\`json
{
  "content": [
    {
      "startId": "m0001",
      "endId": "m0038",
      "summary": "## Context\\nSummarized previous work..."
    }
  ]
}
\`\`\`
`
