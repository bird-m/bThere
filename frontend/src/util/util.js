import { inDevelopment } from "..";

export function logIt(object,desc="") {
    if (inDevelopment) {
        // debugger;
        // console.log(`${object} --desc`);
    }
}

export function debug() {
    if (inDevelopment) {
        // debugger;
    }
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  export function formatDate(date) {
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      })
      .replace(',', '') // remove the comma from the formatted date string
      .replace(' ', 'T'); // replace the space between the date and time with 'T'
      
    //   console.log(formattedDate, "DATE"); // output: "2023-05-03T18:47"
    //   console.log()
  }