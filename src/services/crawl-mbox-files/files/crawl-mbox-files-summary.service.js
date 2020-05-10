const { fileUtils, logUtils } = require('../../../utils');

class CrawlMBOXFilesSummaryService {

    constructor(data) {
        const { file } = data;
        this.file = file;
    }

    async initiateSummary() {
        const { summaryData } = this.file;
        const { statisticsData, timesData } = summaryData;
        const fileSummaryData = [
            ['MBOX File', summaryData.sourceMBOXFile, 'The original MBOX file name and size.'],
            ['Total MBOX File Email Addresses Count', statisticsData.totalMBOXFileEmailAddressesCountDisplay, 'The total number of email addresses.'],
            ['Total Final Email Addresses Count', statisticsData.totalFinalEmailAddressesCountDisplay, 'The total final unique email addresses count.'],
            ['Start Process Date Time', timesData.startProcessDateTimeDisplay, 'The start date time of the file process.'],
            ['End Process Date Time', timesData.endProcessDateTimeDisplay, 'The end date time of the file process.'],
            ['Total Process Time Display', timesData.totalProcessTimeDisplay, 'The total time took the file process to run.'],
            ['Total Removed Email Addresses Count', statisticsData.totalRemoveEmailAddressesCountDisplay, 'The total email addresses count that removed (duplicates).'],
            ['Total Valid Email Addresses Count', statisticsData.totalValidEmailAddressesCountDisplay, 'The total final valid email addresses count.'],
            ['Total Invalid Email Addresses Count', statisticsData.totalInvalidEmailAddressesCountDisplay, 'The total final invalid email addresses count.'],
            ['Final List View TXT File', summaryData.finalListViewTXTFile, 'The name and the size of the final email addresses TXT file in list view.'],
            ['Final Merge View TXT File', summaryData.finalMergeViewTXTFile, 'The name and the size of the final email addresses TXT file in merge view.'],
            ['Valid Email Addresses TXT File', summaryData.validEmailAddressesTXTFile, 'The name and the size of the valid email addresses TXT file in list view.'],
            ['Invalid Email Addresses TXT File', summaryData.invalidEmailAddressesTXTFile, 'The name and the size of the invalid email addresses TXT file in list view.'],
            ['Total MBOX Lines Count', statisticsData.totalMBOXFileLinesCountDisplay, 'The total number of lines the original MBOX file contain.'],
            ['Total Email Items Count', statisticsData.totalEmailMessagesCountDisplay, 'The total number of email messages the original MBOX file contain.'],
            ['Total Crawl Create TXT Files Count', statisticsData.totalCrawlCreateTXTFilesCountDisplay, 'The total number of TXT files created on the crawl step.'],
            ['Total Merge Rounds Count', statisticsData.totalMergeRoundsCountDisplay, 'The total number of merge rounds in the merge step.'],
            ['Total Merge Create TXT Files Count', statisticsData.totalMergeCreateTXTFilesCountDisplay, 'The total number of TXT files created on the merge step.']
        ];
        const summaryFilePath = this.file.distFinalSummaryTXTFile.filePath;
        await this.createSummaryFile({
            fileSummaryData: fileSummaryData,
            summaryFilePath: summaryFilePath
        });

        fileSummaryData.splice(13, 0, ['Final Summary TXT File', `${this.file.distFinalSummaryTXTFile.fileName} - ${this.file.distFinalSummaryTXTFile.fileSizeDisplay}`, 'The name and the size of the final summary TXT file.']);
        this.logSummary(fileSummaryData);
        logUtils.log(`This summary log can be found at ${summaryFilePath}`);
        return this.file;
    }

    logSummary(fileSummaryData) {
        logUtils.logTableData({
            titles: ['Key Name', 'Value', 'Comment'],
            tableData: fileSummaryData
        });
    }

    async createSummaryFile(data) {
        const { fileSummaryData, summaryFilePath } = data;
        let fileData = logUtils.logSummaryFile(fileSummaryData);
        await fileUtils.appendFile({
            targetPath: summaryFilePath,
            message: fileData
        });
        await this.file.distFinalSummaryTXTFile.calculateFileSize();
    }
}

module.exports = CrawlMBOXFilesSummaryService;