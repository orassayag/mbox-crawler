const StatisticsDataModel = require('./StatisticsData.model');
const TimesDataModel = require('./TimesData.model');

class GlobalSummaryDataModel {

    constructor() {
        this.filesList = [];
        this.statisticsDataModel = new StatisticsDataModel();
        this.timesDataModel = new TimesDataModel();
    }
}

module.exports = GlobalSummaryDataModel;