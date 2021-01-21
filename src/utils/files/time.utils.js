const textUtils = require('../files/text.utils');
const validationUtils = require('../files/validation.utils');

class TimeUtils {

    constructor() { }

    // This method returns the current date without spaces.
    getCurrentDateNoSpaces() {
        const date = new Date();
        return [this.getYear(date), this.getMonth(date), this.getDay(date)].join('');
    }

    getDisplayDateTime(dateTime) {
        if (!validationUtils.isValidDate(dateTime)) {
            return '';
        }
        return dateTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    getDateNoSpaces() {
        const date = new Date();
        return [this.getDay(date), this.getMonth(date), this.getYear(date)].join('');
    }

    getDay(date) {
        return textUtils.addLeadingZero(date.getDate());
    }

    getMonth(date) {
        return textUtils.addLeadingZero(date.getMonth() + 1);
    }

    getYear(date) {
        return date.getFullYear();
    }

    getDifferenceTimeBetweenDates(data) {
        const { startDateTime, endDateTime } = data;
        if (!validationUtils.isValidDate(startDateTime) || !validationUtils.isValidDate(endDateTime)) {
            return null;
        }
        // Get the total time.
        const totalTime = textUtils.getPositiveNumber(endDateTime - startDateTime);
        // Get total seconds between the times.
        let delta = totalTime / 1000;
        // Calculate (and subtract) whole days.
        const days = textUtils.getFloorPositiveNumber(delta / 86400);
        delta -= days * 86400;
        // Calculate (and subtract) whole hours.
        const hours = textUtils.getFloorPositiveNumber((delta / 3600) % 24);
        delta -= hours * 3600;
        // Calculate (and subtract) whole minutes.
        const minutes = textUtils.getFloorPositiveNumber((delta / 60) % 60);
        delta -= minutes * 60;
        // What's left is seconds.
        // In theory the modulus is not required.
        const seconds = textUtils.getFloorPositiveNumber(delta % 60);
        const totalTimeDisplay = `${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s) | ${days}.${hours}:${minutes}:${seconds}`;
        return {
            totalTime: totalTime,
            totalTimeDisplay: totalTimeDisplay
        };
    }

    calculateProcessTimes(startDateTime) {
        if (!validationUtils.isValidDate(startDateTime)) {
            return [];
        }
        const endDateTime = new Date();
        const { totalTime, totalTimeDisplay } = this.getDifferenceTimeBetweenDates({
            startDateTime: startDateTime,
            endDateTime: endDateTime
        });
        const startDateTimeDisplay = this.getDisplayDateTime(startDateTime);
        const endDateTimeDisplay = this.getDisplayDateTime(endDateTime);
        return {
            endDateTime: endDateTime,
            totalTime: totalTime,
            startDateTimeDisplay: startDateTimeDisplay,
            endDateTimeDisplay: endDateTimeDisplay,
            totalTimeDisplay: totalTimeDisplay
        };
    }
}

module.exports = new TimeUtils();