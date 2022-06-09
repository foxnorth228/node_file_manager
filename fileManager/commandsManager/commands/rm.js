import { checkAccess } from "../supportiveFileFuncs.js";
import { rm as remove } from "fs/promises";
export async function rm(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.W_OK);

    if (isFileExist) {
        const path = await makePathAbsolute(processedInput[0]);
        await remove(path);
        console.log("File successfully deleted")
    } else {
        throw error;
    }
}