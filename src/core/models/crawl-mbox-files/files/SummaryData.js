const StatisticsData = require('./StatisticsData');
const TimesData = require('./TimesData');

class SummaryData {

    constructor() {
        this.sourceMBOXFile = null;
        this.finalListViewTXTFile = null;
        this.finalMergeViewTXTFile = null;
        this.validEmailAddressesTXTFile = null;
        this.invalidEmailAddressesTXTFile = null;
        this.statisticsData = new StatisticsData();
        this.timesData = new TimesData();
    }
}

module.exports = SummaryData;