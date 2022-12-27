export const roundToDp = (num, dp) => {
    return num.toFixed(dp);
}

export const convertToPercentage = num => num * 100;

export const iterateEventOverNodelist = (nodelist, evnt, fn) => {
    for (let i = 0; i < nodelist.length; i++) {
        nodelist[i].addEventListener(evnt, fn)
    }
}