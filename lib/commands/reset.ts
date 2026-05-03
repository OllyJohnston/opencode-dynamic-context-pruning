import type { CommandContext } from "./types"
import { resetSessionState, saveSessionState } from "../state"

export async function handleResetCommand(ctx: CommandContext): Promise<void> {
    const { state, logger, client, sessionId } = ctx

    resetSessionState(state)
    state.sessionId = sessionId // Restore sessionId after reset
    
    await saveSessionState(state, logger)

    await client.tui.showToast({
        body: {
            title: "DCP: Session Reset",
            message: "Context pruning state has been cleared for this session. Rollbacks and artefacts should now be resolved.",
            variant: "success",
            duration: 3000,
        },
    })
}
