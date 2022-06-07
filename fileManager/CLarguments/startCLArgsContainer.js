export const longFlagList = {
    username: addUserName,
};

export const shortFlagList = {

};

function addUserName(name="noname") {
    console.log(`User ${name} registred`);
    return name;
}