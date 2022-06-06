export const argsList = {
    username: addUserName,
};

export const flagsList = {

};

function addUserName(name="noname") {
    console.log(`User ${name} registred`);
    return name;
}