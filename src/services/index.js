const ConfirmService = require('./files/confirm.service');
const CrawlService = require('./files/crawl.service');
const FinalizeService = require('./files/finalize.service');
const InitiateProcessService = require('./files/initiateProcess.service');
const MergeService = require('./files/merge.service');
const PostProcessService = require('./files/postProcess.service');
const PreProcessService = require('./files/preProcess.service');
const ScanService = require('./files/scan.service');
const SummaryService = require('./files/summary.service');
const ValidateService = require('./files/validate.service');

module.exports = {
    ConfirmService, CrawlService, FinalizeService, InitiateProcessService, MergeService, PostProcessService,
    PreProcessService, ScanService, SummaryService, ValidateService
};