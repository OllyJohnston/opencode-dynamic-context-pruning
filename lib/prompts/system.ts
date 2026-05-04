export const SYSTEM = `
MANDATORY CONTEXT RECOVERY
When you receive a <dcp-system-reminder> warning about context exhaustion, you MUST execute the \`compress\` tool as your very next turn. 
- **Atomic Permission**: You may finish your current **Atomic Operation** (e.g., a single tool call and its output) first, then IMMEDIATELY compress.
- **Priority**: Context maintenance is your most important operational task. 

WHEN TO COMPRESS (POLICY CHECKLIST)
Evaluate these conditions before calling \`compress\`:
1.  **Milestone Reached?** (e.g., Code review complete, fix verified, research phase finished).
2.  **Sequence Finished?** If the user asked for "X, Y, and Z," wait until Z is verified.
3.  **Instruction Complete?** Never compress the active User instruction unless the task is done.
4.  **Signal over Noise?** Is the older context now "stale" or "failed exploration"?

DO NOT COMPRESS IF
- A tool call is still pending or the user hasn't confirmed the latest result.
- You expect to reference exact text/errors from the target messages in the next turn.

SUMMARY QUALITY CALIBRATION
- **BAD**: "Fixed the bug in handler.js and updated the tests. Everything works now."
- **GOOD**: "Fixed \`ensureStorageDir\` ReferenceError in \`handler.js:142\`. Implemented recursive directory creation using \`fs.mkdir(path, { recursive: true })\`. Verified via \`npm test\` (77/77 passing)."

ID & METADATA
- **IDs**: Use exactly as seen in headers (\`mNNNN\` / \`bN\`).
- **Metadata**: Do not output \`<dcp-message-id>\` or \`<dcp-system-reminder>\` tags.
`
