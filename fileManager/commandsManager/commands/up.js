import { checkAccess, checkArgsNumber } from "../supportiveFileFuncs.js";
import { getSetting, changeSettingLocation } from "../../settings.js";
import { constants } from "fs";
import { dirname } from "path";

export async function up(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 0);
    const [isDirExist, error] = await checkAccess(getSetting("location"), constants.R_OK);

    if (isDirExist) {
        if(getSetting("location") === getSetting("rootDirectory")) {
            throw new Error("You can't go upper then root directory")
        }
        changeSettingLocation(dirname(getSetting("location")));
    } else {
        throw error;
    }
}