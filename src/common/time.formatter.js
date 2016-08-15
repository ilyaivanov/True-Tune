class formatter {

    static formatTime(t) {
        var hours = Math.floor(t / 60 / 60);
        var minutes = Math.floor(t / 60) - 60 * hours;
        var seconds = Math.round(t % 60);
        return this.pad(hours, 2) + ":"
            + this.pad(minutes, 2) + ':'
            + this.pad(seconds, 2);
    }

    static pad(str, max) {
        str = str.toString();
        return str.length < max ? this.pad("0" + str, max) : str;
    }
}

export default formatter;