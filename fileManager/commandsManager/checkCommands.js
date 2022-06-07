import { changeSetting } from "../settings.js";
import * as comm from "./commandsList.js";
import * as access from "./checkAccess.js";

export function checkCommands(input) {
    const nonProcessedInput = input.trim().split(" ");
    const commandName = nonProcessedInput[0];
    if (commandName === ".exit"){
        return false;
    } else if(!(commandName in comm.listOfCommands)) {
        console.log("Invalid input")
    } else {
        try{
            comm.listOfCommands[commandName](nonProcessedInput[1]);
        } catch(err) {
            console.log(`Operation failed\n code: ${err.code}\n message: ${err.message}`);
        }
    }
    console.log(commandName);
    return true;
}