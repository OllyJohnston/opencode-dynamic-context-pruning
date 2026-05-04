export const COMPRESS_RANGE = `HOW TO COMPRESS (TECHNICAL MANUAL)

1. ID SELECTION ALGORITHM
- **startId**: Pick the first available \`mNNNN\` message ID in your history (usually \`m0001\`).
- **endId**: Pick the most recent \`mNNNN\` ID that contains actual content. 
- **Exclusions**: Skip "Compression Successful" notifications or technical system-reminders when picking boundaries.
- **Visual Order**: In the raw conversation, the \`startId\` must appear vertically above the \`endId\`.

2. THE SAFETY GAP (MANDATORY)
- **Precedence**: Your safety gap must be at least 5 messages (turns), OR must extend back to include the latest User prompt, whichever is larger.
- **Rule**: Never compress the active User instruction unless the task is completely finished.
- **Goal**: Preserve the current "train of thought."

3. PREVIOUS BLOCKS & PLACEHOLDERS (bN)
- **Reference**: If your range includes any \`bN\` block, include its placeholder \`(bN)\` exactly once.
- **Weaving**: Weave \`(bN)\` placeholders into your summary prose chronologically as landmarks.
  - *Example*: "After resolving the dependency issues documented in \`(b10)\`, I proceeded to implement the handler..."
- **Flow**: Ensure prose remains coherent once \`(bN)\` is replaced with its full content.

4. THE SUMMARY (EXHAUSTIVE)
- **Content**: Capture file paths, function signatures, decisions, and constraints. This is an authoritative record.
- **Lean**: Strip failed attempts and verbose tool noise. 
- **User Intent**: Quote user messages directly if short; preserve intent exactly.

5. BATCHING
If multiple independent ranges are ready, include them as separate entries in the \`content\` array.

6. EXAMPLE OUTPUT FORMAT
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
