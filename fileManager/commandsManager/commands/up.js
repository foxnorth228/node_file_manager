import { checkAccess, checkArgsNumber, executeCommandFunction, checkDirAccess } from "../supportiveFileFuncs.js";
import { getSetting, changeSettingLocation } from "../../settings.js";
import { constants } from "fs";
import { dirname } from "path";

export async function up(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 0);
    const [isDirExist, error] = await checkAccess(getSetting("location"), constants.R_OK);
    await executeCommandFunction([isDirExist], [error], upDir, processedInput)
}

async function upDir(processedInput) {
    await checkDirAccess(getSetting("location"));
    if(getSetting("location") === getSetting("rootDirectory")) {
        throw new Error("You can't go upper then root directory")
    }
    changeSettingLocation(dirname(getSetting("location")));
}