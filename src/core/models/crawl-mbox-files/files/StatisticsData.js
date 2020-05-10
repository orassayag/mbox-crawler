const { textUtils } = require('../../../../utils');

class StatisticsData {

    constructor() {
        // Original fields.
        this.totalMBOXFileLinesCount = 0;
        this.totalEmailMessagesCount = 0;
        this.totalCrawlCreateTXTFilesCount = 0;
        this.totalMergeRoundsCount = 0;
        this.totalMergeCreateTXTFilesCount = 0;
        this.totalMBOXFileEmailAddressesCount = 0;
        this.totalRemoveEmailAddressesCount = 0;
        this.totalFinalEmailAddressesCount = 0;
        this.totalValidEmailAddressesCount = 0;
        this.totalInvalidEmailAddressesCount = 0;
        // Display fields.
        this.totalMBOXFileLinesCountDisplay = null;
        this.totalEmailMessagesCountDisplay = null;
        this.totalCrawlCreateTXTFilesCountDisplay = null;
        this.totalMergeRoundsCountDisplay = null;
        this.totalMergeCreateTXTFilesCountDisplay = null;
        this.totalMBOXFileEmailAddressesCountDisplay = null;
        this.totalRemoveEmailAddressesCountDisplay = null;
        this.totalFinalEmailAddressesCountDisplay = null;
        this.totalValidEmailAddressesCountDisplay = null;
        this.totalInvalidEmailAddressesCountDisplay = null;
    }

    setDisplayFields() {
        this.totalMBOXFileLinesCountDisplay = textUtils.getNumberWithCommas(this.totalMBOXFileLinesCount);
        this.totalEmailMessagesCountDisplay = textUtils.getNumberWithCommas(this.totalEmailMessagesCount);
        this.totalCrawlCreateTXTFilesCountDisplay = textUtils.getNumberWithCommas(this.totalCrawlCreateTXTFilesCount);
        this.totalMergeRoundsCountDisplay = textUtils.getNumberWithCommas(this.totalMergeRoundsCount);
        this.totalMergeCreateTXTFilesCountDisplay = textUtils.getNumberWithCommas(this.totalMergeCreateTXTFilesCount);
        this.totalMBOXFileEmailAddressesCountDisplay = textUtils.getNumberWithCommas(this.totalMBOXFileEmailAddressesCount);
        this.totalRemoveEmailAddressesCountDisplay = textUtils.getNumberWithCommas(textUtils.getPositiveNumber(this.totalRemoveEmailAddressesCount));
        this.totalFinalEmailAddressesCountDisplay = textUtils.getNumberWithCommas(this.totalFinalEmailAddressesCount);
        this.totalValidEmailAddressesCountDisplay = textUtils.getNumberWithCommas(this.totalValidEmailAddressesCount);
        this.totalInvalidEmailAddressesCountDisplay = textUtils.getNumberWithCommas(this.totalInvalidEmailAddressesCount);
    }
}

module.exports = StatisticsData;