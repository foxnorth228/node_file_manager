import * as containerArgs from "./argsContainer.js";

export function checkArgs(args) {
    for (const arg of args) {
        switch(true) {
            case arg.startsWith("--"):
                checkArgument(arg);
                break;
            case arg.startsWith("-"):
                checkFlag(arg);
                break;
            default: 
                throw new TypeError("Wrong command-line argument was given");;
        }
    }
}

function checkArgument(arg) {
    let value = arg.slice(2).split("=");
    if (value.length > 2) {
        throw new TypeError("Wrong syntax of command-line argument");
    }
    if (!(value[0] in containerArgs.argsList)) {
        throw new TypeError(`Argument (${value}) dasn't exist`);
    }
    containerArgs.argsList[value[0]]();
}

function checkFlag(arg) {
    const value = arg.slice(1);
    if (!(value in containerArgs.flagsList)) {
        throw new TypeError(`Flag (${value}) dasn't exist`);
    }
}