import { checkAccess } from "../checkFileAccess.js";
export async function cd(nonProcessedInput) {
    console.log(nonProcessedInput);
    if (nonProcessedInput.length > 1) {
        throw new SyntaxError("Number of arguments is too big")
    }
    console.log(await checkAccess(nonProcessedInput[0]));
}