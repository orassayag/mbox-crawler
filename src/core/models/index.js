const BackupDataModel = require('./files/BackupData.model');
const BackupDirectoryModel = require('./files/BackupDirectory.model');
const CrawlDataModel = require('./files/CrawlData.model');
const FileDataModel = require('./files/FileData.model');
const FileProcessModel = require('./files/FileProcess.model');
const GlobalSummaryDataModel = require('./files/GlobalSummaryData.model');
const MergeDataModel = require('./files/MergeData.model');
const MergeRoundModel = require('./files/MergeRound.model');
const ScanDataModel = require('./files/ScanData.model');
const ScanRoundModel = require('./files/ScanRound.model');
const StatisticsDataModel = require('./files/StatisticsData.model');
const SummaryDataModel = require('./files/SummaryData.model');
const TimesDataModel = require('./files/TimesData.model');

module.exports = {
    BackupDataModel, BackupDirectoryModel, CrawlDataModel, FileDataModel, FileProcessModel, GlobalSummaryDataModel, MergeDataModel,
    MergeRoundModel, ScanDataModel, ScanRoundModel, StatisticsDataModel, SummaryDataModel, TimesDataModel
};