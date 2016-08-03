class logger {
    constructor() {
        this.currentGroup = '';
    }

    static log(message) {
        if (this.currentGroup) {
            console.groupEnd();
            this.currentGroup = '';
        }
        console.log(message);
    }

    static warn(message) {
        if (this.currentGroup) {
            console.groupEnd();
            this.currentGroup = '';
        }
        console.warn(message);
    }


    //Motivation: I want to group all lastfm message, but I don't know how many of them user will create
    //if some intermediate log messages will appear our of the group - fine, just end current group and log them as usual
    static logToGroupOrCreateNew(group, message) {
        if (this.currentGroup) {
            console.log(message)
        } else {
            this.currentGroup = group;
            console.group(this.currentGroup);
            console.log(message);
        }
    }
}

export default logger;