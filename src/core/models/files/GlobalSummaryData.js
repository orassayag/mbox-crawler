const StatisticsData = require('./StatisticsData');
const TimesData = require('./TimesData');

class GlobalSummaryData {

    constructor() {
        this.filesList = [];
        this.statisticsData = new StatisticsData();
        this.timesData = new TimesData();
    }
}

module.exports = GlobalSummaryData;