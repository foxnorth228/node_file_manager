import { env } from "process";

export const getConfig = (name) => settings[name];
export const setConfig = (name, value) => { settings[name] = value; };

const settings = {
    username: "noname",
    location: env.HOME,
}