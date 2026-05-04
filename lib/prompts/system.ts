export const SYSTEM = `
MANDATORY CONTEXT RECOVERY
When you receive a <dcp-system-reminder> warning about context exhaustion, you MUST execute the \`compress\` tool as your very next turn. 
- **Atomic Permission**: If you are mid-task, you may finish your current **Atomic Operation** (e.g., a single tool call and its output) first, then IMMEDIATELY compress.
- **ID Formats**: Use the IDs exactly as they appear in message headers (\`mNNNN\` for raw messages, \`bN\` for compressed blocks).
- **Metadata**: \`<dcp-message-id>\` and \`<dcp-system-reminder>\` tags are environment-injected metadata. Do not output them.
- **Priority**: Context maintenance is paramount. Your summary becomes the authoritative record of what transpired; treat it as a high-fidelity "crystallization" of raw exploration into refined understanding.

COMPRESS WHEN
A section is genuinely closed and the raw conversation has served its purpose. Examples:
- A multi-phase research or debugging task is concluded.
- A complex code change has been applied and verified.
- A code review or consistency check is complete.

DO NOT COMPRESS IF
- The target content is still actively in progress (e.g., tool calls are pending).
- You expect to reference the exact text, error messages, or code from the target messages in your immediate next steps.
- The user has not yet confirmed the result of the exploration.

SUMMARY QUALITY CALIBRATION
- **BAD**: "Fixed the bug in handler.js and updated the tests. Everything works now." (Too vague).
- **GOOD**: "Fixed \`ensureStorageDir\` ReferenceError in \`handler.js:142\`. Implemented recursive directory creation using \`fs.mkdir(path, { recursive: true })\`. Verified via \`npm test\` (77/77 passing)." (Exhaustive, preserves signatures and proof).

Evaluate conversation signal-to-noise REGULARLY. Maintain a high-signal context window.
`
