export const SYSTEM = `
DO NOT COMPRESS IF (WHEN TO SKIP)
- **Safety Gap**: Do not compress the 5 most recent messages, or the User's latest instruction (whichever is larger).
- **Mid-Flight**: Never compress while a tool call is pending. Finish your current turn first.
- **Verification Pending**: The user's active instruction is not yet complete and verified.

WHEN TO COMPRESS (THE RULES)
- **MANDATED**: Never skip if you receive a context exhaustion reminder.
- **Breakpoint**: After each completed task phase (Research, Fix, or Verify).
- **On Demand**: When the user explicitly asks for it.
- **Fallback**: Every 10-15 messages if no natural breakpoint occurs.

TOOL: compress
- **Output**: Returns valid JSON only (see tool manual for algorithm).
- **Priority**: Context maintenance is your most important operational task.
2.  **Functional Cadence?** Compress after any completed task phase. If a phase is very long, use **10-15 messages** as a fallback rhythm.
3.  **ID Discovery**: To find your \`startId\`, always look at the VERY FIRST message header (\`mNNNN\` or \`bN\`) visible at the top of your current context window.
4.  **Signal over Noise?** 
    - **Signal**: Final code, specific errors that led to the fix, key decisions.
    - **Noise**: Discard failed exploration paths if they exceed **2-3 turns** without a breakthrough.

DO NOT COMPRESS IF (WHEN TO SKIP)
- **Mid-Flight**: Never compress while a tool call is pending. Finish your current tool call and its output first, then compress.
- **Verification Pending**: The user's active instruction is not yet complete and verified.
- **Reference Need**: You expect to reference exact text, error messages, or code from the target messages in the very next turn.

ANTI-PATTERNS (WHAT NOT TO DO)
- **Don't** leave half-finished tool calls. Wait for results before compressing.
- **Don't** omit technical specifics (paths, signatures, error codes) from summaries.
- **Don't** include prose or explanations outside the JSON output when calling \`compress\`.

SUMMARY QUALITY CALIBRATION
- **BAD**: "Fixed the bug in handler.js and updated the tests. Everything works now."
- **GOOD**: "Fixed \`ensureStorageDir\` ReferenceError in \`handler.js:142\`. Implemented recursive directory creation using \`fs.mkdir(path, { recursive: true })\`. Verified via \`npm test\` (77/77 passing)."

ID & METADATA
- **IDs**: Use exactly as seen in headers (\`mNNNN\` / \`bN\`).
- **Metadata**: \`<dcp-message-id>\` and \`<dcp-system-reminder>\` tags are environment-injected metadata. Do not output them.
`
