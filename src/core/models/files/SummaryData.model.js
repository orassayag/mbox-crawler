const StatisticsDataModel = require('./StatisticsData.model');
const TimesDataModel = require('./TimesData.model');

class SummaryDataModel {

    constructor() {
        this.sourceMBOXFile = null;
        this.finalListViewTXTFile = null;
        this.finalMergeViewTXTFile = null;
        this.validEmailAddressesTXTFile = null;
        this.invalidEmailAddressesTXTFile = null;
        this.statisticsDataModel = new StatisticsDataModel();
        this.timesDataModel = new TimesDataModel();
    }
}

module.exports = SummaryDataModel;