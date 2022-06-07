import { checkAccess } from "../checkFileAccess.js";

export async function cd(nonProcessedInput) {
    if (nonProcessedInput.length > 1) {
        throw new SyntaxError("Number of arguments is too big")
    }
    await checkAccess(nonProcessedInput[0]);
    return;
}