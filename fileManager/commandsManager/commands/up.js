import { checkAccess } from "../checkFileAccess.js";

export async function up() {
    await checkAccess("xx");
    return;
}