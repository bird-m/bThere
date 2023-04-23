import { inDevelopment } from "..";

export function logIt(object,desc="") {
    if (inDevelopment) {
        console.log(`${object} --desc`);
    }
}

export function debug() {
    if (inDevelopment) {
        debugger;
    }
}