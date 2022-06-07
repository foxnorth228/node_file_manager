import { changeSetting } from "../settings.js";
import * as comm from "./commandsList.js";
import * as access from "./checkFileAccess.js";

export async function checkCommands(input) {
    const nonProcessedInput = input.trim().split(" ");
    const commandName = nonProcessedInput[0];
    if (commandName === ".exit"){
        return false;
    } else if(!(commandName in comm.listOfCommands)) {
        console.log("Invalid input")
    } else {
        try{
            console.log("2")
            await comm.listOfCommands[commandName](nonProcessedInput.slice(1));
        } catch(err) {
            console.log("3")
            if(isNaN(err.code)) {
                console.log(`\nOperation failed\n message: ${err.message}`);
            } else {
                console.log(`\nOperation failed\n code: ${err.code}\n message: ${err.message}`);
            }
        }
    }
    return true;
}