import { checkAccess, checkArgsNumber, makePathAbsolute } from "../supportiveFileFuncs.js";
import { stat } from "fs/promises";
import { constants } from "fs";
import { changeSettingLocation } from "../../settings.js";

export async function cd(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.R_OK);
    if (isFileExist) { 
        const path = await makePathAbsolute(processedInput[0]);
        changeSettingLocation(path);
    } else {
        throw error;
    }
    return;
}