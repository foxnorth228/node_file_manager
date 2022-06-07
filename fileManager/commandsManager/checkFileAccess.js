import { access } from "fs/promises";
import { getSetting } from "../settings.js";
import { join } from "path";

export async function checkAccess(path) {
    await access(join(getSetting("location"), path));
}