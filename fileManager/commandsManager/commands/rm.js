import { checkAccess } from "../checkFileAccess.js";
import { rm as remove } from "fs/promises";
export async function rm(nonProcessedInput) {
    if (nonProcessedInput.length > 1) {
        throw new SyntaxError("Number of arguments is too big")
    }
    const path = await checkAccess(nonProcessedInput[0]);
    await remove(path);
    console.log("File successfully deleted");
}