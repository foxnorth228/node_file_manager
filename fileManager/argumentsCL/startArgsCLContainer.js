import { changeSetting } from "../settings.js"

export const longFlagList = {
    username: addUserName,
};

export const shortFlagList = {

};

function addUserName(name="noname") {
    if(name) {
        changeSetting("username", name);
    } else {
        throw new Error("Wrong username");
    }
}