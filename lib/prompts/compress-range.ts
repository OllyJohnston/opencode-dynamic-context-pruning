export const COMPRESS_RANGE = `HOW TO COMPRESS (TECHNICAL MANUAL)

- **Distance Rule**: Your \`endId\` MUST be an ID that appeared at least 5 messages BEFORE the current one. 1 Message = 1 ID Tag.
- **MATH TEST**: If your current message is \`m0167\`, then \`167 - 5 = 162\`. Your \`endId\` cannot be higher than \`m0162\`. 
- **Active Instruction**: Never compress the User's active instruction.
- **System Headers**: The \`mNNNN\` tags in the system headers are REAL message IDs. Do not ignore them.
- **Emergency Exception**: Only violate the floor if the gap itself exceeds the context limit.

2. ID SELECTION ALGORITHM
- **startId**: Pick the first available \`mNNNN\` message ID in your history (usually \`m0001\`).
- **The Anchor Rule**: ALWAYS use the ID of the VERY FIRST message visible at the top of your window as your \`startId\`. NEVER guess or assume what was inside a previous block. If \`m0070\` is the first thing you see, use \`m0070\`.
- **Incremental Rule**: If a block exists, start your new range AFTER it.
- **HOW TO READ BLOCKS**: Every block header contains its ID and original range. 
  - *Example*: \`[Compressed conversation section b10 (m0001-m0038)]\`.
  - Use these numbers to identify exactly which IDs are already pruned.
- **endId**: The last message in the range (must obey Safety Gap).
- **No Guessing**: NEVER numerically increment IDs (e.g., if you see m0040, don't assume m0041 exists). Use ONLY visible tags.
- **Exclusions**: Skip system-generated notifications (e.g., "Compressed N messages") and technical reminders.
- **Visual Order**: In the raw conversation, the \`startId\` must appear vertically above the \`endId\`.
- **Verification**: After execution, you MUST report the newly created block ID (e.g., \`b11\`) in your response. Do not fake results.
- **ARITHMETIC MANDATE**: Treat \`mNNNN\` tags as numerical indexes. Perform explicit arithmetic (e.g., \`166 - 40 = 126\`) to calculate conversation depth. NEVER rely on "vibe" or "feel" for volume.
- **The Full Span Rule**: IDs are a continuous timeline. If the top ID is \`m0040\` and the bottom ID is \`m0160\`, there are 120 messages in that span, even if you are only currently looking at a few of them. Trust the numbers.
- **CHAT VS. FILES**: Message IDs (\`mNNNN\`) exist ONLY in your conversation history. They are NOT files on disk. NEVER use \`ls\`, \`read_file\`, or \`grep\` on the repository to find message IDs. Look UP at the chat headers.

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

7. THE ARRAY RULE (MANDATORY)
The \`content\` field MUST be an array \`[]\`, even if you only have one range.
- **WRONG**: \`"content": { "startId": "m0001", ... }\`
- **RIGHT**: \`"content": [{ "startId": "m0001", ... }]\`

8. EXAMPLE OUTPUT FORMAT
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
