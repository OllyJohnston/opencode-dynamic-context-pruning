export const CONTEXT_LIMIT_NUDGE = `\`<dcp-system-reminder>\`
CRITICAL WARNING: CONTEXT EXHAUSTION IMMINENT

You have reached or exceeded the configured context threshold. To prevent truncation and maintain high-fidelity Message ID tracking and reference integrity, you MUST use the \`compress\` tool now.

- **PRIORITY: COMPRESS FIRST**: You MUST call the \`compress\` tool IMMEDIATELY. Your ability to track Message IDs (mXXXX) and reference past work is at risk. Do not perform any other tasks, write any code, or provide summaries until the context has been recovered through compression. This is a dedicated cleanup turn.

SELECTION PROCESS
- **MANDATORY**: Start your selection from the EARLIEST available messages in the context.
- Include all resolved history, stale research, and completed tool iterations.
- Capture as much stale context as possible in this pass to recover maximum context window.

SUMMARY REQUIREMENTS
- Your summary MUST be exhaustive and technical.
- Preserve all key findings, file paths, and function signatures.
- If the compressed range includes user messages, preserve user intent EXACTLY.
- **POST-COMPRESSION**: After calling the tool, this turn is COMPLETE. Output NO further prose or commands. STOP and wait for User confirmation.
\`</dcp-system-reminder>\`
`
