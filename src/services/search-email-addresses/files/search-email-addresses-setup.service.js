const mongoose = require('mongoose');
const { logUtils, validationUtils } = require('../../../utils');

class SearchEmailAddressesSetupService {

    constructor(searchEmailAddressesSettings) {
        this.searchEmailAddressesSettings = searchEmailAddressesSettings;
    }

    // This method initiate the SearchEmailAddressesSetupService class.
    async initiateSetup() {
        logUtils.logStatus('Validating configuration settings.');

        // Validate the settings object.
        await this.validateSettingsFile();

        // Connect to MongoDatabase.
        await this.connectDatabase();
    }

    // This method validates all the settings parameters, and check that all parameters
    // listed in theses files are correct and valid. If some parameter is invalid, an
    // exception will be thrown.
    async validateSettingsFile() {
        // Validate the settings object existence.
        if (!this.searchEmailAddressesSettings) {
            throw new Error('Invalid or no searchEmailAddressesSettings object was found (1000024)');
        }

        const {
            IS_TEST_MODE,
            IS_SHORT_SUMMARY_MODE,
            SEARCH_ENGINE_TYPE,
            SEARCH_PROCESSES_COUNT,
            SEARCH_ENGINE_PAGES_COUNT_PER_PROCESS,
            MAXIMUM_RETRIES_GENERATE_SEARCH_KEY_COUNT,
            MAXIMUM_SOURCE_LENGTH,
            MAXIMUM_CRAWL_LINKS_PER_PAGE_COUNT,
            MAXIMUM_CRAWL_EMAIL_ADDRESSES_PER_PAGE_COUNT,
            MAXIMUM_SEARCH_PROCESS_LINKS_COUNT,
            MAXIMUM_SEARCH_PROCESS_EMAIL_ADDRESSES_COUNT,
            MINIMUM_CRAWL_LINKS_PER_PAGE_COUNT,
            MINIMUM_CRAWL_EMAIL_ADDRESSES_PER_ENGINE_PAGE_COUNT,
            MILLISECONDS_DELAY_DATABASE_SYNC_COUNT,
            MILLISECONDS_DELAY_BETWEEN_CRAWL_COUNT,
            MILLISECONDS_TIMEOUT_SOURCE_REQUEST_COUNT,
            MILLISECONDS_WAIT_LOAD_PAGE_COUNT,
            SOURCES_PATH,
            DIST_PATH,
            DIST_SUMMARY_FILE_NAME,
            MONGO_DATA_BASE_CONNECTION_STRING
        } = this.searchEmailAddressesSettings;

        // Validate all the parameters in the settings object.
        if (!validationUtils.isValidBoolean(IS_TEST_MODE)) {
            throw new Error('Invalid or no IS_TEST_MODE parameter was found (1000025)');
        }

        if (!validationUtils.isValidBoolean(IS_SHORT_SUMMARY_MODE)) {
            throw new Error('Invalid or no IS_SHORT_SUMMARY_MODE parameter was found (1000120)');
        }

        // ToDo: Add validation on enum search type.
        if (!SEARCH_ENGINE_TYPE) {
            throw new Error('No SEARCH_ENGINE_TYPE parameter was found (1000039)');
        }

        if (!validationUtils.isPositiveNumber(SEARCH_PROCESSES_COUNT)) {
            throw new Error('Invalid or no SEARCH_PROCESSES_COUNT parameter was found (1000026)');
        }

        if (!validationUtils.isPositiveNumber(SEARCH_ENGINE_PAGES_COUNT_PER_PROCESS)) {
            throw new Error('Invalid or no SEARCH_ENGINE_PAGES_COUNT_PER_PROCESS parameter was found (1000040)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_RETRIES_GENERATE_SEARCH_KEY_COUNT)) {
            throw new Error('Invalid or no MAXIMUM_RETRIES_GENERATE_SEARCH_KEY_COUNT parameter was found (1000041)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_SOURCE_LENGTH)) {
            throw new Error('Invalid or no MAXIMUM_SOURCE_LENGTH parameter was found (1000071)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_CRAWL_LINKS_PER_PAGE_COUNT)) {
            throw new Error('Invalid or no MAXIMUM_CRAWL_LINKS_PER_PAGE_COUNT parameter was found (1000107)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_CRAWL_EMAIL_ADDRESSES_PER_PAGE_COUNT)) {
            throw new Error('Invalid or no MAXIMUM_CRAWL_EMAIL_ADDRESSES_PER_PAGE_COUNT parameter was found (1000108)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_SEARCH_PROCESS_LINKS_COUNT)) {
            throw new Error('Invalid or no MAXIMUM_SEARCH_PROCESS_LINKS_COUNT parameter was found (1000116)');
        }

        if (!validationUtils.isPositiveNumber(MAXIMUM_SEARCH_PROCESS_EMAIL_ADDRESSES_COUNT)) {
            throw new Error('Invalid or no MAXIMUM_SEARCH_PROCESS_EMAIL_ADDRESSES_COUNT parameter was found (1000117)');
        }

        if (!validationUtils.isPositiveNumber(MINIMUM_CRAWL_LINKS_PER_PAGE_COUNT)) {
            throw new Error('Invalid or no MINIMUM_CRAWL_LINKS_PER_PAGE_COUNT parameter was found (1000109)');
        }

        if (!validationUtils.isPositiveNumber(MINIMUM_CRAWL_EMAIL_ADDRESSES_PER_ENGINE_PAGE_COUNT)) {
            throw new Error('Invalid or no MINIMUM_CRAWL_EMAIL_ADDRESSES_PER_ENGINE_PAGE_COUNT parameter was found (1000110)');
        }

        if (!validationUtils.isPositiveNumber(MILLISECONDS_DELAY_DATABASE_SYNC_COUNT)) {
            throw new Error('Invalid or no MILLISECONDS_DELAY_DATABASE_SYNC_COUNT parameter was found (1000111)');
        }

        if (!validationUtils.isPositiveNumber(MILLISECONDS_DELAY_BETWEEN_CRAWL_COUNT)) {
            throw new Error('Invalid or no MILLISECONDS_DELAY_BETWEEN_CRAWL_COUNT parameter was found (1000112)');
        }

        if (!validationUtils.isPositiveNumber(MILLISECONDS_TIMEOUT_SOURCE_REQUEST_COUNT)) {
            throw new Error('Invalid or no MILLISECONDS_TIMEOUT_SOURCE_REQUEST_COUNT parameter was found (1000113)');
        }

        if (!validationUtils.isPositiveNumber(MILLISECONDS_WAIT_LOAD_PAGE_COUNT)) {
            throw new Error('Invalid or no MILLISECONDS_WAIT_LOAD_PAGE_COUNT parameter was found (1000114)');
        }

        if (!SOURCES_PATH) {
            throw new Error('No SOURCES_PATH parameter was found (1000043)');
        }

        if (!DIST_PATH) {
            throw new Error('No DIST_PATH parameter was found (1000044)');
        }

        if (!DIST_SUMMARY_FILE_NAME) {
            throw new Error('No DIST_SUMMARY_FILE_NAME parameter was found (1000104)');
        }

        if (!MONGO_DATA_BASE_CONNECTION_STRING) {
            throw new Error('No MONGO_DATA_BASE_CONNECTION_STRING parameter was found (1000105)');
        }

        if (!validationUtils.isValidMongoConnectionString(MONGO_DATA_BASE_CONNECTION_STRING)) {
            throw new Error('Invalid or no MONGO_DATA_BASE_CONNECTION_STRING parameter was found (1000106)');
        }
    }

    async connectDatabase() {
        logUtils.logStatus('Connecting to Mongo database.');

        const { MONGO_DATA_BASE_CONNECTION_STRING } = this.searchEmailAddressesSettings;
        await mongoose.connect(MONGO_DATA_BASE_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}

module.exports = SearchEmailAddressesSetupService;