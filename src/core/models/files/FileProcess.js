const { fileUtils, pathUtils, textUtils, timeUtils } = require('../../../utils');
const CrawlData = require('./CrawlData');
const FileData = require('./FileData');
const MergeData = require('./MergeData');
const MergeRound = require('./MergeRound');
const ScanData = require('./ScanData');
const ScanRound = require('./ScanRound');
const SummaryData = require('./SummaryData');

class FileProcess {

    constructor(sourceMBOXFileData) {
        const { fileName, sourcesPath, distPath, distTemporaryFileName, distFinalMergeViewFileName,
            distFinalListViewFileName, distFinalValidFileName, distFinalInvalidFileName,
            distFinalSummaryFileName } = sourceMBOXFileData;
        this.distPath = distPath;
        this.distTemporaryFileName = distTemporaryFileName;
        this.scanData = null;
        this.crawlData = null;
        this.mergeData = null;
        this.summaryData = null;
        this.sourceMBOXFile = this.createMBOXFileData({
            fileName: fileName,
            sourcesPath: sourcesPath
        });
        this.distFinalMergeViewTXTFile = this.createTXTFileData(distFinalMergeViewFileName);
        this.distFinalListViewTXTFile = this.createTXTFileData(distFinalListViewFileName);
        this.distFinalValidTXTFile = this.createTXTFileData(distFinalValidFileName);
        this.distFinalInvalidTXTFile = this.createTXTFileData(distFinalInvalidFileName);
        this.distFinalSummaryTXTFile = this.createTXTFileData(distFinalSummaryFileName);
    }

    async startProcess() {
        this.createSummaryData();
        this.createScanData();
        this.scanData.initiateScanLinesCount = await fileUtils.getFileLinesCount(this.sourceMBOXFile.filePath);
    }

    createSummaryData() {
        this.summaryData = new SummaryData();
    }

    createScanData(scanRoundData) {
        if (!this.scanData) {
            this.scanData = new ScanData();
        }
        if (scanRoundData) {
            this.scanData.scanRounds.push(new ScanRound(scanRoundData));
        }
    }

    calculateSummaryData() {
        const scan1 = this.scanData.scanRounds[0];
        const scan2 = this.scanData.scanRounds[1];
        this.summaryData.timesData.calculateProcessTimes();
        this.summaryData.sourceMBOXFile = `${this.sourceMBOXFile.fileName} - ${this.sourceMBOXFile.fileSizeDisplay}`;
        this.summaryData.finalListViewTXTFile = `${this.distFinalListViewTXTFile.fileName} - ${this.distFinalListViewTXTFile.fileSizeDisplay}`;
        this.summaryData.finalMergeViewTXTFile = `${this.distFinalMergeViewTXTFile.fileName} - ${this.distFinalMergeViewTXTFile.fileSizeDisplay}`;
        this.summaryData.validEmailAddressesTXTFile = `${this.distFinalValidTXTFile.fileName} - ${this.distFinalValidTXTFile.fileSizeDisplay}`;
        this.summaryData.invalidEmailAddressesTXTFile = `${this.distFinalInvalidTXTFile.fileName} - ${this.distFinalInvalidTXTFile.fileSizeDisplay}`;
        this.summaryData.statisticsData.totalMBOXFileLinesCount = this.scanData.initiateScanLinesCount;
        this.summaryData.statisticsData.totalEmailMessagesCount = scan2.scanRoundEmailMessagesCount;
        this.summaryData.statisticsData.totalCrawlCreateTXTFilesCount = this.crawlData.crawlTXTFilesCount;
        this.summaryData.statisticsData.totalMergeRoundsCount = this.mergeData.mergeRounds.length;
        this.summaryData.statisticsData.totalMergeCreateTXTFilesCount = textUtils.getSumProperty({
            key: 'mergeRoundTXTFilesCount',
            list: this.mergeData.mergeRounds
        });
        this.summaryData.statisticsData.totalMBOXFileEmailAddressesCount = scan1.scanRoundEmailAddressesCount;
        this.summaryData.statisticsData.totalRemoveEmailAddressesCount = scan1.scanRoundEmailAddressesCount - this.distFinalMergeViewTXTFile.fileEmailAddressesCount;
        this.summaryData.statisticsData.totalFinalEmailAddressesCount = this.distFinalMergeViewTXTFile.fileEmailAddressesCount;
        this.summaryData.statisticsData.totalValidEmailAddressesCount = this.distFinalValidTXTFile.fileEmailAddressesCount;
        this.summaryData.statisticsData.totalInvalidEmailAddressesCount = this.distFinalInvalidTXTFile.fileEmailAddressesCount;
        this.summaryData.statisticsData.setDisplayFields();
    }

    createTemporaryFilePath(data) {
        return pathUtils.createTemporaryFilePath({
            ...data,
            targetPath: this.distPath,
            fileCleanName: this.sourceMBOXFile.fileCleanName,
            fileKeyName: this.distTemporaryFileName
        });
    }

    createCrawlData(crawlData) {
        this.crawlData = new CrawlData(crawlData);
    }

    createMergeData(mergeRoundData) {
        if (!this.mergeData) {
            this.mergeData = new MergeData();
        }
        if (mergeRoundData) {
            this.mergeData.mergeRounds.push(new MergeRound(mergeRoundData));
        }
    }

    createTXTFileData(fileTXTKeyName) {
        fileTXTKeyName = `${fileTXTKeyName}_${timeUtils.getCurrentDateNoSpaces()}`;
        return new FileData({
            fileName: this.sourceMBOXFile.fileCleanName,
            fileKeyName: fileTXTKeyName,
            fileTargetPath: this.distPath,
            isMBOX: false
        });
    }

    createMBOXFileData(sourceMBOXData) {
        const { fileName, sourcesPath } = sourceMBOXData;
        return new FileData({
            fileName: fileName,
            fileKeyName: null,
            fileTargetPath: sourcesPath,
            isMBOX: true
        });
    }
}

module.exports = FileProcess;