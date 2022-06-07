import { checkAccess } from "../checkFileAccess.js";
import { getSetting, changeSettingLocation } from "../../settings.js";
import { dirname } from "path";

export async function up() {
    const path = await checkAccess(getSetting("location"));
    if(path === getSetting("rootDirectory")) {
        throw new Error("You can't go upper then root directory")
    }
    changeSettingLocation(dirname(getSetting("location")));
    return;
}