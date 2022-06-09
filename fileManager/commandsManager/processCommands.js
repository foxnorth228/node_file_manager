import { listOfCommands } from "./commandsList.js";

export async function processCommands(input) {
    const nonProcessedInput = input.trim().replace(/\s{2,}/gi, " ").split(" ");
    const commandName = nonProcessedInput[0];
    if (commandName === ".exit"){
        return "exit";
    } else if(!(commandName in listOfCommands)) {
        console.log("Invalid input")
        return "";
    }

    try{
        const func = listOfCommands[commandName];
        await func(nonProcessedInput.slice(1));
    } catch(err) {
        let errorMessage = "Operation failed...\n";
        errorMessage += `   message: ${err.message}`;
        console.log(errorMessage);
    }
    return commandName;
}