import { inDevelopment } from "..";

export function logIt(object,desc="") {
    if (inDevelopment) {
        // debugger;
        console.log(`${object} --desc`);
    }
}

export function debug() {
    if (inDevelopment) {
        debugger;
    }
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }