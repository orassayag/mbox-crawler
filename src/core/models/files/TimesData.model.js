const { timeUtils } = require('../../../utils');

class TimesDataModel {

    constructor() {
        this.startProcessDateTime = timeUtils.getCurrentDate();
        this.endProcessDateTime = null;
        this.totalProcessTime = null;
        this.startProcessDateTimeDisplay = null;
        this.endProcessDateTimeDisplay = null;
        this.totalProcessTimeDisplay = null;
    }

    calculateProcessTimes() {
        const { endDateTime, totalTime, startDateTimeDisplay,
            endDateTimeDisplay, totalTimeDisplay } = timeUtils.calculateProcessTimes(this.startProcessDateTime);
        this.endProcessDateTime = endDateTime;
        this.totalProcessTime = totalTime;
        this.startProcessDateTimeDisplay = startDateTimeDisplay;
        this.endProcessDateTimeDisplay = endDateTimeDisplay;
        this.totalProcessTimeDisplay = totalTimeDisplay;
    }
}

module.exports = TimesDataModel;