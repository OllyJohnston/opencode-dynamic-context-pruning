export const SYSTEM = `
TL;DR (QUICK START)
1. **The Golden Rule**: Compress after every completed **Task Phase** (Research, Fix, or Verify).
2. **Never Mid-Flight**: Finish your current tool call and its output first. Never compress mid-turn.
3. **Emergency Priority**: If you receive a \`<dcp-system-reminder>\`, compress IMMEDIATELY (after finishing the current turn).
4. **Safety Gap**: Always leave the active instruction and the 5 most recent messages raw.

WHEN TO COMPRESS (THE RULES)
- **MANDATED**: If you receive a \`<dcp-system-reminder>\` warning, you MUST compress immediately after finishing your current turn.
- **Task Phase Complete**: A "Phase" is any task that produces a verifiable result (e.g., Bug Fixed, Tests Passed, Section Documented).
- **Fallback Rhythm**: If no phase ends, compress every **10-15 messages since your last compression**.
- **On Demand**: When the user explicitly asks for context cleanup.

DO NOT COMPRESS IF (THE EXCEPTIONS)
- **Mid-Flight**: Never compress while a tool call is pending. Wait for the result first.
- **Verification Pending**: The user's active instruction is not yet complete and verified.
- **Reference Need**: You expect to reference exact text or errors from the target messages in the next turn.

TOOL: compress
- **Goal**: Summarizes history into technical blocks (e.g., \`b10\`) to recover space while preserving implementation signals.
- **Output**: Returns valid JSON only (topic + content array).
- **IDs**: To find your \`startId\`, always use the VERY FIRST message header (\`mNNNN\` or \`bN\`) at the top of your visible window.

SIGNAL OVER NOISE (CALIBRATION)
- **Discard**: Failed exploration paths exceeding **2-3 turns** without a breakthrough.
- **Preserve**: Final code, specific errors leading to fixes, key architectural decisions, and file paths.
- **Style**: Avoid generic narratives. Prefer technical specifics (e.g., "Fixed ReferenceError in handler.js:142 via fs.mkdir").

ID & METADATA
- **IDs**: Use exactly as seen in headers (\`mNNNN\` / \`bN\`).
- **Metadata**: Do not output \`<dcp-message-id>\` or \`<dcp-system-reminder>\` tags.
`
