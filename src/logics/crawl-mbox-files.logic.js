const { logUtils } = require('../utils');
const crawlMBOXFilesSettings = require('../settings/crawl-mbox-files.settings');
const { CrawlMBOXFilesConfirmService, CrawlMBOXFilesCrawlService, CrawlMBOXFilesFinalizeService, CrawlMBOXFilesInitiateService,
    CrawlMBOXFilesMergeService, CrawlMBOXFilesPostProcessService, CrawlMBOXFilesPreProcessService, CrawlMBOXFilesScanService,
    CrawlMBOXFilesSetupService, CrawlMBOXFilesSummaryService, CrawlMBOXFilesValidateService } = require('../services/crawl-mbox-files');
const { GlobalSummaryData } = require('../core/models');

class CrawlMBOXFilesLogic {

    constructor() {
        // ===SUMMARY=== //
        this.globalSummaryData = new GlobalSummaryData();

        // ===LIMITS=== //
        this.emailAddressesCrawlLimitCount = 0;
        this.emailAddressesMergeLimitCount = 0;
        this.maximumMergeRoundsCount = 0;

        // ===PATHS=== //
        this.sourcesPath = null;
        this.distPath = null;

        // ===FILE NAMES=== //
        this.distTemporaryFileName = null;
        this.distFinalMergeViewFileName = null;
        this.distFinalListViewFileName = null;
        this.distFinalValidFileName = null;
        this.distFinalInvalidFileName = null;
        this.distFinalSummaryFileName = null;

        // ===FILE PROCESS=== //
        this.filesList = [];
        this.currentFileProcessIndex = null;
        this.currentFileProcess = null;
    }

    // This method will run all the methods of the crawl process.
    async run() {
        (async () => {
            // ===SETUP STEP=== //
            // This is the first step of the crawl process. It contains logic that validate all the settings in the
            // settings/crawl-mbox-files.settings.js file. Also, in this step, there is a validation process of the
            // external API in the validation step.
            await this.setup();

            // ===INITIATE STEP=== //
            // This step main goal is to prepare the actual crawl process. It validates the dist and the sources paths,
            // and pull out all the MBOX files to crawl email addresses from, and make a list of all the files and sizes,
            // and to log it in a table to the console.
            await this.initiate();

            // Process all the MBOX files.
            for (let i = 0, length = this.filesList.length; i < length; i++) {
                this.currentFileProcessIndex = i;
                this.currentFileProcess = this.filesList[i];
                await this.processFile();
            }
        })();
    }

    async processFile() {
        // ===PRE PROCESS STEP=== //
        await this.preProcess();

        // ===SCAN STEP=== //
        // This is the first step in the crawl of a single MBOX file process. The scan process combine 2 NPM libraries
        // to scan the number of email messages, number of lines, and the number of email addresses in the MBOX file.
        await this.scan();

        // ===CONFIRM STEP=== //
        // This step main goal is to validate the file details and properties with the process settings, and to verify
        // they fit.
        await this.confirm();

        // ===CRAWL STEP=== //
        // The crawl step contains the logic of scanning the MBOX file and crawling all the email addresses into arrays,
        // and in stepwise progression to write them all down to TXT files. No filter what so ever done on the pulled email
        // addresses that pulled out from the MBOX file.
        await this.crawl();

        // ===MERGE STEP=== //
        // The next step, is to merge all the TXT files. This is the step that take care of it. It contains the logic
        // to filter duplicate email addresses fetched from all the TXT files, and recursively merge all the unique
        // email addresses, in the end of the process, to a single TXT file.
        await this.merge();

        // ===VALIDATION STEP=== //
        // After fetching all the email addresses to single TXT file, it's time to validate which one are valid and invalid.
        // This step contains the logic of validation that do just that. In the end of this step, couple of TXT files will be created,
        // such as: list of all the email addresses, list of the valid email addresses, and list of all the invalid email addresses.
        // The validation process preformed by external API in post request and with response if a given email address is valid or not.
        // ToDo: Return this only with appropriate internet connection.
        //await this.validation();

        // ===FINALIZE STEP=== //
        // In the finalize step, there is logic to finish the crawl process: verify that all the main TXT files exists,
        // delete unnecessary files, validate the process data through all the steps, and calculate the data for the summary log table.
        await this.finalize();

        // ===SUMMARY STEP=== //
        // This is the last and final step in the single MBOX file crawl process. In this step, the logic to log all the summary data
        // in a table to the console take place, and to log all the summary data to a TXT file. after this step, either the process
        // continues to the next MBOX file, or log the global summary (if more than 1 MBOX file).
        await this.summary();

        // ===POST PROCESS STEP=== //
        await this.postProcess();
    }

    setParameters() {
        const {
            EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT, EMAIL_ADDRESSES_MERGE_LIMIT_COUNT, MAXIMUM_MERGE_ROUNDS_COUNT,
            SECONDS_DELAY_BETWEEN_VALIDATIONS, MAXIMUM_EMAIL_CHARACTERS_LENGTH, ADVANCE_MERGE_MULTIPLY,
            SOURCES_PATH, DIST_PATH, DIST_TEMPORARY_FILE_NAME, DIST_FINAL_MERGE_VIEW_FILE_NAME,
            DIST_FINAL_LIST_VIEW_FILE_NAME, DIST_FINAL_VALID_FILE_NAME, DIST_FINAL_INVALID_FILE_NAME,
            DIST_FINAL_SUMMARY_FILE_NAME
        } = crawlMBOXFilesSettings;

        // ===LIMITS=== //
        this.emailAddressesCrawlLimitCount = EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT;
        this.emailAddressesMergeLimitCount = EMAIL_ADDRESSES_MERGE_LIMIT_COUNT;
        this.maximumMergeRoundsCount = MAXIMUM_MERGE_ROUNDS_COUNT;
        this.secondsDelayBetweenValidations = SECONDS_DELAY_BETWEEN_VALIDATIONS;
        this.maximumEmailCharactersLength = MAXIMUM_EMAIL_CHARACTERS_LENGTH;
        this.advanceMergeMultiply = ADVANCE_MERGE_MULTIPLY;

        // ===PATHS=== //
        this.sourcesPath = SOURCES_PATH;
        this.distPath = DIST_PATH;

        // ===FILE NAMES=== //
        this.distTemporaryFileName = DIST_TEMPORARY_FILE_NAME;
        this.distFinalMergeViewFileName = DIST_FINAL_MERGE_VIEW_FILE_NAME;
        this.distFinalListViewFileName = DIST_FINAL_LIST_VIEW_FILE_NAME;
        this.distFinalValidFileName = DIST_FINAL_VALID_FILE_NAME;
        this.distFinalInvalidFileName = DIST_FINAL_INVALID_FILE_NAME;
        this.distFinalSummaryFileName = DIST_FINAL_SUMMARY_FILE_NAME;
    }

    async setup() {
        await this.step({
            stepName: 'SETUP',
            logic: async () => {
                await new CrawlMBOXFilesSetupService(crawlMBOXFilesSettings).initiateSetup();
                this.setParameters();
                return null;
            },
            isFileStep: false
        });
    }

    async initiate() {
        await this.step({
            stepName: 'INITIATE',
            logic: async () => {
                const initiateResults = await new CrawlMBOXFilesInitiateService({
                    sourcesPath: this.sourcesPath,
                    distPath: this.distPath,
                    distTemporaryFileName: this.distTemporaryFileName,
                    distFinalListViewFileName: this.distFinalListViewFileName,
                    distFinalMergeViewFileName: this.distFinalMergeViewFileName,
                    distFinalValidFileName: this.distFinalValidFileName,
                    distFinalInvalidFileName: this.distFinalInvalidFileName,
                    distFinalSummaryFileName: this.distFinalSummaryFileName
                }).initiateProcess();
                this.filesList = initiateResults;
            },
            isFileStep: false
        });
    }

    async preProcess() {
        await this.step({
            stepName: '',
            logic: async () => {
                return await new CrawlMBOXFilesPreProcessService({
                    file: this.currentFileProcess,
                    currentFileProcessIndex: this.currentFileProcessIndex,
                    totalFilesProcessCount: this.filesList.length
                }).initiatePreProcess();
            },
            isFileStep: true
        });
    }

    async scan() {
        await this.step({
            stepName: 'SCAN',
            logic: async () => {
                return await new CrawlMBOXFilesScanService({
                    file: this.currentFileProcess
                }).initiateScan();
            },
            isFileStep: true
        });
    }

    async confirm() {
        await this.step({
            stepName: 'CONFIRM',
            logic: async () => {
                return await new CrawlMBOXFilesConfirmService({
                    file: this.currentFileProcess,
                    crawlMBOXFilesSettings: crawlMBOXFilesSettings
                }).initiateConfirm();
            },
            isFileStep: true
        });
    }

    async crawl() {
        await this.step({
            stepName: 'CRAWL',
            logic: async () => {
                return await new CrawlMBOXFilesCrawlService({
                    file: this.currentFileProcess,
                    emailAddressesCrawlLimitCount: this.emailAddressesCrawlLimitCount
                }).initiateCrawl();
            },
            isFileStep: true
        });
    }

    async merge() {
        await this.step({
            stepName: 'MERGE',
            logic: async () => {
                return await new CrawlMBOXFilesMergeService({
                    file: this.currentFileProcess,
                    emailAddressesMergeLimitCount: this.emailAddressesMergeLimitCount,
                    maximumMergeRoundsCount: this.maximumMergeRoundsCount,
                    advanceMergeMultiply: this.advanceMergeMultiply
                }).initiateMerge();
            },
            isFileStep: true
        });
    }

    async validation() {
        await this.step({
            stepName: 'VALIDATION',
            logic: async () => {
                return await new CrawlMBOXFilesValidateService({
                    file: this.currentFileProcess,
                    secondsDelayBetweenValidations: this.secondsDelayBetweenValidations,
                    maximumEmailCharactersLength: this.maximumEmailCharactersLength
                }).initiateValidate();
            },
            isFileStep: true
        });
    }

    async finalize() {
        await this.step({
            stepName: 'FINALIZE',
            logic: async () => {
                return await new CrawlMBOXFilesFinalizeService({
                    file: this.currentFileProcess,
                    distPath: this.distPath,
                    distTemporaryFileName: this.distTemporaryFileName
                }).initiateFinalize();
            },
            isFileStep: true
        });
    }

    async summary() {
        await this.step({
            stepName: 'SUMMARY',
            logic: async () => {
                //this.globalSummaryData['EndDateTime'] = new Date();
                return await new CrawlMBOXFilesSummaryService({
                    file: this.currentFileProcess
                }).initiateSummary();
            },
            isFileStep: true
        });
    }

    async postProcess() {
        await this.step({
            stepName: '',
            logic: async () => {
                return await new CrawlMBOXFilesPostProcessService({
                    file: this.currentFileProcess,
                    currentFileProcessIndex: this.currentFileProcessIndex,
                    totalFilesProcessCount: this.filesList.length
                }).initiatePostProcess();
            },
            isFileStep: true
        });
    }

    async step(data) {
        const { stepName, logic, isFileStep } = data;
        const fileNameDisplay = isFileStep ? this.filesList[this.currentFileProcessIndex].sourceMBOXFile.fileNameDisplay : '';
        if (stepName) {
            logUtils.logColorStatus({
                status: `${fileNameDisplay ? `FILE: ${fileNameDisplay} - `: ''}${stepName} STEP - START`,
                color: 'Blue'
            });
        }
        this.filesList[this.currentFileProcessIndex] = await logic();
        if (stepName) {
            logUtils.logColorStatus({
                status: `${fileNameDisplay ? `FILE: ${fileNameDisplay} - `: ''}${stepName} STEP - END`,
                color: 'Blue'
            });
        }
    }
}

module.exports = CrawlMBOXFilesLogic;