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
            const func = comm.listOfCommands[commandName];
            console.log(func.length);
            if (func.length > 0) {
                
                await func(nonProcessedInput.slice(1));
            } else {
                await func();
            }
        } catch(err) {
            if(isNaN(err.code)) {
                console.log(`\nOperation failed\n message: ${err.message}\n`);
            } else {
                console.log(`\nOperation failed\n code: ${err.code}\n message: ${err.message}\n`);
            }
        }
    }
    return true;
}