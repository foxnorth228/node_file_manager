import { checkAccess } from "../checkFileAccess.js";
import { stat } from "fs/promises";
import { changeSettingLocation } from "../../settings.js";

export async function cd(nonProcessedInput) {
    if (nonProcessedInput.length > 1) {
        throw new SyntaxError("Number of arguments is too big")
    }
    const path = await checkAccess(nonProcessedInput[0]);
    const destination = await stat(path);
    if (!destination.isDirectory()) {
        throw new Error("Destination is not a folder");
    }
    changeSettingLocation(path);
    return;
}