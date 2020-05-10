const CrawlMBOXFilesConfirmService = require('./files/crawl-mbox-files-confirm.service');
const CrawlMBOXFilesCrawlService = require('./files/crawl-mbox-files-crawl.service');
const CrawlMBOXFilesFinalizeService = require('./files/crawl-mbox-files-finalize.service');
const CrawlMBOXFilesInitiateService = require('./files/crawl-mbox-files-initiate.service');
const CrawlMBOXFilesMergeService = require('./files/crawl-mbox-files-merge.service');
const CrawlMBOXFilesPostProcessService = require('./files/crawl-mbox-files-post-process.service');
const CrawlMBOXFilesPreProcessService = require('./files/crawl-mbox-files-pre-process.service');
const CrawlMBOXFilesScanService = require('./files/crawl-mbox-files-scan.service');
const CrawlMBOXFilesSetupService = require('./files/crawl-mbox-files-setup.service');
const CrawlMBOXFilesSummaryService = require('./files/crawl-mbox-files-summary.service');
const CrawlMBOXFilesValidateService = require('./files/crawl-mbox-files-validate.service');

module.exports = {
    CrawlMBOXFilesConfirmService, CrawlMBOXFilesCrawlService, CrawlMBOXFilesFinalizeService, CrawlMBOXFilesInitiateService,
    CrawlMBOXFilesMergeService, CrawlMBOXFilesPostProcessService, CrawlMBOXFilesPreProcessService, CrawlMBOXFilesScanService,
    CrawlMBOXFilesSetupService, CrawlMBOXFilesSummaryService, CrawlMBOXFilesValidateService
};