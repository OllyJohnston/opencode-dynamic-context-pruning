export const COMPRESS_RANGE = `HOW TO COMPRESS (TECHNICAL MANUAL)

1. START ID ANCHOR
- Identify the most recent summary block (e.g., \`bN\`) and its \`endId\`.
- Your \`startId\` is the first message ID containing actual content after that block.
- Skip "Compression Successful" or technical notifications.

2. THE SAFETY GAP (MANDATORY)
To maintain immediate context awareness, you MUST observe these boundaries for your \`endId\`:
- **Precedence**: Your safety gap must be at least 5 messages (turns), OR must extend back to include the latest User prompt, whichever is larger.
- **Rule**: Never compress the active User instruction unless the task is completely finished.
- **Goal**: Preserve the current "train of thought."

3. THE SUMMARY (EXHAUSTIVE)
- **Content**: Capture file paths, function signatures, decisions, and constraints. This is an authoritative record.
- **Lean**: Strip failed attempts and verbose tool noise. 
- **User Intent**: Quote user messages directly if short; preserve intent exactly.

4. PREVIOUS BLOCKS & PLACEHOLDERS (bN)
- **Reference**: If your range includes any \`bN\` block, include its placeholder \`(bN)\` exactly once.
- **Weaving**: Weave \`(bN)\` placeholders into your summary prose chronologically as landmarks.
  - *Example*: "After the fixes in \`(b1)\`, I implemented the handler..."
- **Flow**: Ensure prose remains coherent once \`(bN)\` is replaced with its full content.

5. BATCHING
If multiple independent ranges are ready, include them as separate entries in the \`content\` array.
`
