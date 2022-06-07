import { checkAccess } from "../checkAccess.js";
export function cd(path) {
    checkAccess(path);
}