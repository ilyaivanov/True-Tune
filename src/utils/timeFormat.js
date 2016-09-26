export default function formatTime(t) {
    var hours = Math.floor(t / 60 / 60);
    var minutes = Math.floor(t / 60) - 60 * hours;
    var seconds = Math.round(t % 60);
    return pad(hours, 2) + ":"
        + pad(minutes, 2) + ':'
        + pad(seconds, 2);
}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}