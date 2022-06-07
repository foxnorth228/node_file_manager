import * as containerStartArgs from "./startCLArgsContainer.js";
import { changeSetting } from "../settings.js";

export function checkArgs(args) {
    let key;
    let value;
    for (const arg of args) {
        switch(true) {
            case arg.startsWith("--"):
                [key, value] = checkLongFlag(arg);
                changeSetting(key, value);
                break;
            case arg.startsWith("-"):
                checkShortFlag(arg);
                break;
            default: 
                throw new TypeError("Wrong command-line argument was given");;
        }
    }
}

function checkLongFlag(arg) {
    let values = arg.slice(2).split("=");
    if (values.length > 2) {
        throw new TypeError("Wrong syntax of command-line argument");
    }
    if (!(values[0] in containerStartArgs.longFlagList)) {
        throw new TypeError(`Argument (${value}) dasn't exist`);
    }
    return [values[0], containerStartArgs.longFlagList[values[0]](values[1])];
}

function checkShortFlag(arg) {
    const value = arg.slice(1);
    if (!(value in containerStartArgs.shortFlagList)) {
        throw new TypeError(`Flag (${value}) dasn't exist`);
    }
}