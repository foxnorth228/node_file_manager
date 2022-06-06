const listOfCommands = {
    
};

export function checkCommands(input) {
    const commands = input.trim().split(" ");
    if(!(commands[0] in listOfCommands)) {
        console.log("Invalid input")
        return;
    }
    console.log(commands);
}