const { emailUtils, logUtils, validationUtils } = require('../../../utils');

class CrawlMBOXFilesSetupService {

    constructor(crawlMBOXFilesSettings) {
        this.crawlMBOXFilesSettings = crawlMBOXFilesSettings;
    }

    // This method initiate the CrawlMBOXFilesSetupService class.
    async initiateSetup() {
        logUtils.logStatus('Validating "crawl-mbox-files" script parameters');

        // Validate the settings object.
        this.validateSettingsFile();

        // Validate the test email addresses to make sure that the free validation API is available.
        // ToDo: Return this only with appropriate email connection.
/*         await this.validateEmail({
            errorCode: 1000035,
            emailAddress: 'test@gmail.com',
            expectedResult: true
        });

        await this.validateEmail({
            errorCode: 1000036,
            emailAddress: 'this-is-not-an-email-address',
            expectedResult: false
        }); */
    }

    // Validate the test email addresses to make sure that the free validation API is available.
    async validateEmail(data) {
        const { errorCode, emailAddress, expectedResult } = data;
        if (expectedResult !== await emailUtils.validateServerEmailAddressFree(emailAddress)) {
            throw new Error(`The free API email validator has failed to validate ${emailAddress} (${errorCode})`);
        }
    }

    // This method validates all the settings parameters, and check that all parameters
    // listed in theses files are correct and valid. If some parameter is invalid, an
    // exception will be thrown.
    validateSettingsFile() {
        // Validate the settings object existence.
        if (!this.crawlMBOXFilesSettings) {
            throw new Error('Invalid or no crawlMBOXFilesSettings object was found (1000020)');
        }

        const {
            MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE, MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE, MAXIMUM_LINES_COUNT_PER_MBOX_FILE,
            MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE, MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE, EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT,
            EMAIL_ADDRESSES_MERGE_LIMIT_COUNT, MAXIMUM_MERGE_ROUNDS_COUNT, SECONDS_DELAY_BETWEEN_VALIDATIONS, MAXIMUM_EMAIL_CHARACTERS_LENGTH,
            ADVANCE_MERGE_MULTIPLY, SOURCES_PATH, DIST_PATH, DIST_TEMPORARY_FILE_NAME, DIST_FINAL_MERGE_VIEW_FILE_NAME,
            DIST_FINAL_LIST_VIEW_FILE_NAME, DIST_FINAL_VALID_FILE_NAME, DIST_FINAL_INVALID_FILE_NAME, DIST_FINAL_SUMMARY_FILE_NAME,
            EMAIL_VALIDATION_URL
        } = this.crawlMBOXFilesSettings;

        // Validate all the parameters in the settings object.
        if (!validationUtils.isPositiveNumber(MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE)) {
            throw new Error('Invalid or no MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE parameter was found (1000050)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE)) {
            throw new Error('Invalid or no MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE parameter was found (1000051)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_LINES_COUNT_PER_MBOX_FILE)) {
            throw new Error('Invalid or no MAXIMUM_LINES_COUNT_PER_MBOX_FILE parameter was found (1000052)');
        }

        if (!validationUtils.isPositiveNumber(MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE)) {
            throw new Error('Invalid or no MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE parameter was found (1000053)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE)) {
            throw new Error('Invalid or no MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE parameter was found (1000054)');
        }

        if (!validationUtils.isPositiveNumber(EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT)) {
            throw new Error('Invalid or no EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT parameter was found (1000055)');
        }

        if (!validationUtils.isPositiveNumber(EMAIL_ADDRESSES_MERGE_LIMIT_COUNT)) {
            throw new Error('Invalid or no EMAIL_ADDRESSES_MERGE_LIMIT_COUNT parameter was found (1000056)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_MERGE_ROUNDS_COUNT)) {
            throw new Error('Invalid or no MAXIMUM_MERGE_ROUNDS_COUNT parameter was found (1000057)');
        }

        if (!validationUtils.isPositiveNumber(SECONDS_DELAY_BETWEEN_VALIDATIONS)) {
            throw new Error('Invalid or no SECONDS_DELAY_BETWEEN_VALIDATIONS parameter was found (1000021)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_EMAIL_CHARACTERS_LENGTH)) {
            throw new Error('Invalid or no MAXIMUM_EMAIL_CHARACTERS_LENGTH parameter was found (1000022)');
        }

        if (!validationUtils.isPositiveNumber(ADVANCE_MERGE_MULTIPLY)) {
            throw new Error('Invalid or no ADVANCE_MERGE_MULTIPLY parameter was found (1000023)');
        }

        if (!SOURCES_PATH) {
            throw new Error('No SOURCES_PATH parameter was found (1000027)');
        }

        if (!DIST_PATH) {
            throw new Error('No DIST_PATH parameter was found (1000028)');
        }

        if (!DIST_TEMPORARY_FILE_NAME) {
            throw new Error('No DIST_TEMPORARY_FILE_NAME parameter was found (1000029)');
        }

        if (!DIST_FINAL_LIST_VIEW_FILE_NAME) {
            throw new Error('No DIST_FINAL_LIST_VIEW_FILE_NAME parameter was found (1000037)');
        }

        if (!DIST_FINAL_MERGE_VIEW_FILE_NAME) {
            throw new Error('No DIST_FINAL_MERGE_VIEW_FILE_NAME parameter was found (1000030)');
        }

        if (!DIST_FINAL_VALID_FILE_NAME) {
            throw new Error('No DIST_FINAL_VALID_FILE_NAME parameter was found (1000031)');
        }

        if (!DIST_FINAL_INVALID_FILE_NAME) {
            throw new Error('No DIST_FINAL_INVALID_FILE_NAME parameter was found (1000032)');
        }

        if (!DIST_FINAL_SUMMARY_FILE_NAME) {
            throw new Error('No DIST_FINAL_SUMMARY_FILE_NAME parameter was found (1000033)');
        }

        if (!EMAIL_VALIDATION_URL) {
            throw new Error('No EMAIL_VALIDATION_URL parameter was found (1000034)');
        }

        if (!validationUtils.isValidURL(EMAIL_VALIDATION_URL)) {
            throw new Error('Invalid or no EMAIL_VALIDATION_URL parameter was found (1000035)');
        }
    }
}

module.exports = CrawlMBOXFilesSetupService;