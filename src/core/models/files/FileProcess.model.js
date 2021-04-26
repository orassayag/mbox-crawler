const CrawlDataModel = require('./CrawlData.model');
const FileDataModel = require('./FileData.model');
const MergeDataModel = require('./MergeData.model');
const MergeRoundModel = require('./MergeRound.model');
const ScanDataModel = require('./ScanData.model');
const ScanRoundModel = require('./ScanRound.model');
const SummaryDataModel = require('./SummaryData.model');
const { fileUtils, pathUtils, textUtils, timeUtils } = require('../../../utils');

class FileProcessModel {

    constructor(sourceMBOXFileData) {
        const { fileName, sourcesPath, distPath, distTemporaryFileName, distFinalMergeViewFileName,
            distFinalListViewFileName, distFinalValidFileName, distFinalInvalidFileName,
            distFinalSummaryFileName } = sourceMBOXFileData;
        this.distPath = distPath;
        this.distTemporaryFileName = distTemporaryFileName;
        this.scanDataModel = null;
        this.crawlDataModel = null;
        this.mergeDataModel = null;
        this.summaryDataModel = null;
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
        this.scanDataModel.initiateScanLinesCount = await fileUtils.getFileLinesCount(this.sourceMBOXFile.filePath);
    }

    createSummaryData() {
        this.summaryDataModel = new SummaryDataModel();
    }

    createScanData(scanRoundData) {
        if (!this.scanDataModel) {
            this.scanDataModel = new ScanDataModel();
        }
        if (scanRoundData) {
            this.scanDataModel.scanRounds.push(new ScanRoundModel(scanRoundData));
        }
    }

    calculateSummaryData() {
        const scan1 = this.scanDataModel.scanRounds[0];
        const scan2 = this.scanDataModel.scanRounds[1];
        this.summaryDataModel.timesDataModel.calculateProcessTimes();
        this.summaryDataModel.sourceMBOXFile = `${this.sourceMBOXFile.fileName} - ${this.sourceMBOXFile.fileSizeDisplay}`;
        this.summaryDataModel.finalListViewTXTFile = `${this.distFinalListViewTXTFile.fileName} - ${this.distFinalListViewTXTFile.fileSizeDisplay}`;
        this.summaryDataModel.finalMergeViewTXTFile = `${this.distFinalMergeViewTXTFile.fileName} - ${this.distFinalMergeViewTXTFile.fileSizeDisplay}`;
        this.summaryDataModel.validEmailAddressesTXTFile = `${this.distFinalValidTXTFile.fileName} - ${this.distFinalValidTXTFile.fileSizeDisplay}`;
        this.summaryDataModel.invalidEmailAddressesTXTFile = `${this.distFinalInvalidTXTFile.fileName} - ${this.distFinalInvalidTXTFile.fileSizeDisplay}`;
        this.summaryDataModel.statisticsDataModel.totalMBOXFileLinesCount = this.scanDataModel.initiateScanLinesCount;
        this.summaryDataModel.statisticsDataModel.totalEmailMessagesCount = scan2.scanRoundEmailMessagesCount;
        this.summaryDataModel.statisticsDataModel.totalCrawlCreateTXTFilesCount = this.crawlDataModel.crawlTXTFilesCount;
        this.summaryDataModel.statisticsDataModel.totalMergeRoundsCount = this.mergeDataModel.mergeRounds.length;
        this.summaryDataModel.statisticsDataModel.totalMergeCreateTXTFilesCount = textUtils.getSumProperty({
            key: 'mergeRoundTXTFilesCount',
            list: this.mergeDataModel.mergeRounds
        });
        this.summaryDataModel.statisticsDataModel.totalMBOXFileEmailAddressesCount = scan1.scanRoundEmailAddressesCount;
        this.summaryDataModel.statisticsDataModel.totalRemoveEmailAddressesCount = scan1.scanRoundEmailAddressesCount - this.distFinalMergeViewTXTFile.fileEmailAddressesCount;
        this.summaryDataModel.statisticsDataModel.totalFinalEmailAddressesCount = this.distFinalMergeViewTXTFile.fileEmailAddressesCount;
        this.summaryDataModel.statisticsDataModel.totalValidEmailAddressesCount = this.distFinalValidTXTFile.fileEmailAddressesCount;
        this.summaryDataModel.statisticsDataModel.totalInvalidEmailAddressesCount = this.distFinalInvalidTXTFile.fileEmailAddressesCount;
        this.summaryDataModel.statisticsDataModel.setDisplayFields();
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
        this.crawlDataModel = new CrawlDataModel(crawlData);
    }

    createMergeData(mergeRoundData) {
        if (!this.mergeDataModel) {
            this.mergeDataModel = new MergeDataModel();
        }
        if (mergeRoundData) {
            this.mergeDataModel.mergeRounds.push(new MergeRoundModel(mergeRoundData));
        }
    }

    createTXTFileData(fileTXTKeyName) {
        fileTXTKeyName = `${fileTXTKeyName}_${timeUtils.getCurrentDateNoSpaces()}`;
        return new FileDataModel({
            fileName: this.sourceMBOXFile.fileCleanName,
            fileKeyName: fileTXTKeyName,
            fileTargetPath: this.distPath,
            isMBOX: false
        });
    }

    createMBOXFileData(sourceMBOXData) {
        const { fileName, sourcesPath } = sourceMBOXData;
        return new FileDataModel({
            fileName: fileName,
            fileKeyName: null,
            fileTargetPath: sourcesPath,
            isMBOX: true
        });
    }
}

module.exports = FileProcessModel;