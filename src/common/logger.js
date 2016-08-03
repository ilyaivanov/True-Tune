class logger {
    constructor() {
        this.currentGroup = '';
    }

    static log(message) {
        if (this.currentGroup) {
            this.endGroup();
            this.currentGroup = '';
        }
        this.logToConsole(message);
    }

    static warn(message) {
        if (this.currentGroup) {
            this.groupEnd();
            this.currentGroup = '';
        }
        this.warnToConsole(message);
    }


    //Motivation: I want to group all lastfm message, but I don't know how many of them user will create
    //if some intermediate log messages will appear our of the group - fine, just end current group and log them as usual
    static logToGroupOrCreateNew(group, message) {
        if (this.currentGroup) {
            this.logToConsole(message)
        } else {
            this.currentGroup = group;
            this.startGroup()(this.currentGroup);
            this.logToConsole(message);
        }
    }

    static logToConsole(message){
        /* eslint-disable no-console */
        console.log(message);
        /* eslint-enable no-console */
    }

    static warnToConsole(message){
        /* eslint-disable no-console */
        console.warn(message);
        /* eslint-enable no-console */
    }

    static startGroup(groupName){
        /* eslint-disable no-console */
        console.group(groupName);
        /* eslint-enable no-console */
    }

    static endGroup(){
        /* eslint-disable no-console */
        console.groupEnd();
        /* eslint-enable no-console */
    }
}

export default logger;