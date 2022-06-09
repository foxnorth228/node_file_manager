import { checkAccess, checkArgsNumber, makePathAbsolute,
  executeCommandFunction, checkIsDir } from "../supportiveFileFuncs.js";
import { constants } from "fs";
import { changeSettingLocation } from "../../settings.js";

export async function cd(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.R_OK);
    await executeCommandFunction([isFileExist], [error], cdDir, processedInput);
}

async function cdDir(processedInput) {
    const path = await makePathAbsolute(processedInput[0]);
    await checkIsDir(path);
    changeSettingLocation(path);
} 