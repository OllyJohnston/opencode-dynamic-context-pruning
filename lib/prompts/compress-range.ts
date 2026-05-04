export const COMPRESS_RANGE = `HOW TO COMPRESS (TECHNICAL MANUAL)

1. THE SAFETY GAP (MANDATORY)
- **Distance Rule**: Your \`endId\` MUST be an ID that appeared at least 5 messages BEFORE the current one. Count backwards from the bottom: current Turn (0), previous (1), previous (2)... go back at least 5 before picking your \`endId\`.
- **Active Instruction**: Never compress the User's active instruction (the prompt you are currently fulfilling).
- **System Headers**: The \`mNNNN\` tags in the system headers are REAL message IDs. Do not ignore them as "wrappers."
- **Emergency Exception**: Only violate the floor if the gap itself exceeds the context limit.

2. ID SELECTION ALGORITHM
- **startId**: Pick the first available \`mNNNN\` message ID in your history (usually \`m0001\`).
- **endId**: The last message in the range (must obey Safety Gap).
- **No Guessing**: NEVER numerically increment IDs (e.g., if you see m0040, don't assume m0041 exists). Use ONLY visible tags.
- **Exclusions**: Skip system-generated notifications (e.g., "Compressed N messages") and technical reminders.
- **Visual Order**: In the raw conversation, the \`startId\` must appear vertically above the \`endId\`.
- **Verification**: After execution, you MUST report the newly created block ID (e.g., \`b11\`) in your response. Do not fake results.

3. PREVIOUS BLOCKS & PLACEHOLDERS (bN)
- **Reference**: If your range includes any \`bN\` block, include its placeholder \`(bN)\` exactly once.
- **Weaving**: Weave \`(bN)\` placeholders into your summary prose chronologically as landmarks.
  - *Example*: "After resolving the dependency issues documented in \`(b10)\`, I proceeded to implement the handler..."

4. THE SUMMARY (EXHAUSTIVE)
- **Purpose**: Your summary replaces raw messages. Stored as \`bN\`.
- **Content**: Capture paths, signatures, decisions. **NO narrative filler.**
- **Calibration Example**:
  - **BAD**: "I looked at the code, found a bug in the directory logic, and fixed it. I then ran the tests and they passed."
  - **GOOD**: "Fixed \`ReferenceError\` in \`lib/utils.ts:142\`. Implemented recursive directory creation via \`fs.mkdir(path, { recursive: true })\`. Verified via \`npm test\` (77/77 passing)."

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
