import * as containerStartArgs from "./startArgsCLContainer.js";

export function checkArgs(args) {
    for (const arg of args) {
        switch(true) {
            case arg.startsWith("--"):
                processLongFlag(arg);
                break;
            case arg.startsWith("-"):
                processShortFlag(arg);
                break;
            default: 
                throw new TypeError("Wrong command-line argument was given");;
        }
    }
}

function processLongFlag(arg) {
    let flagWithValue = arg.slice(2).split("=");
    if (flagWithValue.length !== 2) {
        throw new TypeError("Wrong syntax of command-line argument");
    }

    let [flag, value] = flagWithValue;
    if (!(flag in containerStartArgs.longFlagList)) {
        throw new TypeError(`Long flag '${flag}' dasn't exist`);
    }
    containerStartArgs.longFlagList[flag](value);
}

function processShortFlag(arg) {
    const value = arg.slice(1);
    if (!(value in containerStartArgs.shortFlagList)) {
        throw new TypeError(`Short flag '${value}' dasn't exist`);
    }
}