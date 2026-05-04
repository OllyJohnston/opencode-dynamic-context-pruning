export const SYSTEM = `
MANDATORY CONTEXT RECOVERY
When you receive a <dcp-system-reminder> warning about context exhaustion, you MUST execute the \`compress\` tool as your very next turn. 
- **Atomic Permission**: You may finish your current **Atomic Operation** (one tool call + its immediate result) first, then IMMEDIATELY compress.
- **Priority**: Context maintenance is your most important operational task. 

WHEN TO COMPRESS (POLICY CHECKLIST)
Evaluate these conditions before calling \`compress\`:
1.  **Milestone Reached?** (e.g., Code review complete, fix verified, research phase finished).
2.  **Sequence Finished?** If the user asked for "X, Y, and Z," wait until Z is verified.
3.  **Instruction Complete?** Never compress the active User instruction unless the task is done.
4.  **Signal over Noise?** 
    - **Signal**: Final code, specific errors that led to the fix, key decisions, file paths.
    - **Noise**: Intermediate exploration, failed regex attempts, repetitive file listings, boilerplate.

DO NOT COMPRESS IF
- A tool call you just made is still "Pending" (waiting for its output). Finish the turn first, then compress.
- You expect to reference exact text/errors from the target messages in the next turn.
- The user has not yet confirmed the result of the exploration.

ANTI-PATTERNS (WHAT NOT TO DO)
- **Don't** leave half-finished tool calls. If a reminder fires after you call a tool but before you see the result, finish the turn first.
- **Don't** compress the active user instruction unless the entire task is complete and verified.
- **Don't** omit technical specifics (paths, signatures, error codes) from summaries.

SUMMARY QUALITY CALIBRATION
- **BAD**: "Fixed the bug in handler.js and updated the tests. Everything works now."
- **GOOD**: "Fixed \`ensureStorageDir\` ReferenceError in \`handler.js:142\`. Implemented recursive directory creation using \`fs.mkdir(path, { recursive: true })\`. Verified via \`npm test\` (77/77 passing)."

ID & METADATA
- **IDs**: Use exactly as seen in headers (\`mNNNN\` / \`bN\`).
- **Metadata**: \`<dcp-message-id>\` and \`<dcp-system-reminder>\` tags are environment-injected metadata. Do not output them.
`
