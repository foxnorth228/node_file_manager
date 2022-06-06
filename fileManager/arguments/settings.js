import * as containerArgs from "./argsContainer.js";
import { env } from "process";

export function checkArgs(args) {
    let key;
    let value;
    for (const arg of args) {
        switch(true) {
            case arg.startsWith("--"):
                [key, value] = checkArgument(arg);
                settings[key] = value;
                break;
            case arg.startsWith("-"):
                settings[arg] = checkFlag(arg);
                break;
            default: 
                throw new TypeError("Wrong command-line argument was given");;
        }
    }
}

function checkArgument(arg) {
    let values = arg.slice(2).split("=");
    if (values.length > 2) {
        throw new TypeError("Wrong syntax of command-line argument");
    }
    if (!(values[0] in containerArgs.argsList)) {
        throw new TypeError(`Argument (${value}) dasn't exist`);
    }
    return [values[0], containerArgs.argsList[values[0]](values[1])];
}

function checkFlag(arg) {
    const value = arg.slice(1);
    if (!(value in containerArgs.flagsList)) {
        throw new TypeError(`Flag (${value}) dasn't exist`);
    }
}

export const getConfig = (name) => settings[name];
export const setConfig = (name, value) => { settings[name] = value; };

const settings = {
    username: "noname",
    location: env.HOME,
}