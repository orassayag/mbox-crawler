const pathUtils = require('../utils/files/path.utils');
const { ScriptName } = require('../core/enums/files/system.enum');

const searchEmailAddressesSettings = {
    // ===FLAGS=== //
    // Determine if to load local sources (engine and pages) or to do real requests for
    // sources with puppeteer.js NPM packages.
    IS_TEST_MODE: true,
    // Determine if to log the entire details about the process, or to log only relevant
    // email addresses in the summary log and no summary processes lo
    IS_SHORT_SUMMARY_MODE: false,

    // ===TYPES=== //
    // Determine which search engine to crawl on. For now, only 'bing' is available.
    SEARCH_ENGINE_TYPE: 'bing',

    // ===COUNTS & LIMITS=== //
    // Determine how many processes to run during a single life time of the application.
    SEARCH_PROCESSES_COUNT: 1,
    // Determine how many pages to pager with the search engine during a single process.
    SEARCH_ENGINE_PAGES_COUNT_PER_PROCESS: 1,
    // Determine how many times to retry to generate search key, if it already exists
    // within the process list. Once exceeded the number, will break the application.
    MAXIMUM_RETRIES_GENERATE_SEARCH_KEY_COUNT: 100,
    // Determine the maximum characters count from a single source to be allowed to fetch
    // (engine or page). If engine and exceeded - Move to the next process. If page
    // and exceeded - Move to the next page.
    MAXIMUM_SOURCE_LENGTH: 2000000,
    // Determine the maximum links count from a single engine source to be allowed to fetch.
    // If exceeded - Move to the next process.
    MAXIMUM_CRAWL_LINKS_PER_PAGE_COUNT: 50000,
    // Determine the maximum email addresses count from a single page source to be allowed to fetch.
    // If exceeded - Move to the next page.
    MAXIMUM_CRAWL_EMAIL_ADDRESSES_PER_PAGE_COUNT: 50000,
    // Determine the maximum links count from a the entire process be allowed to fetch.
    // If exceeded - End the process and end the application.
    MAXIMUM_SEARCH_PROCESS_LINKS_COUNT: 500000,
    // Determine the maximum email addresses count from a the entire process be allowed to fetch.
    // If exceeded - End the process and end the application.
    MAXIMUM_SEARCH_PROCESS_EMAIL_ADDRESSES_COUNT: 500000,
    // Determine the minimum links count from a single engine source needed to fetch.
    // If less than the minimum - Move to the next process.
    MINIMUM_CRAWL_LINKS_PER_PAGE_COUNT: 1,
    // Determine the minimum email addresses count from a single engine (with all it's
    // links) source needed to fetch.
    // If less than the minimum - Move to the next process.
    MINIMUM_CRAWL_EMAIL_ADDRESSES_PER_ENGINE_PAGE_COUNT: 1,
    // Determine the milliseconds count between each action (check if exists and insert)
    // within the database.
    MILLISECONDS_DELAY_DATABASE_SYNC_COUNT: 1000,
    // Determine the milliseconds count between each page crawl action to reduce the CPU hit.
    MILLISECONDS_DELAY_BETWEEN_CRAWL_COUNT: 1000,
    // Determine the milliseconds count timeout to wait for answer to get the page or engine source.
    MILLISECONDS_TIMEOUT_SOURCE_REQUEST_COUNT: 30000,
    // Determine the milliseconds count to wait to load a single page source.
    MILLISECONDS_WAIT_LOAD_PAGE_COUNT: 5000,

    // ===PATHS=== //
    // Determine the path of all the local sources (engine and page) for the test mode.
    SOURCES_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: `../../sources/${ScriptName.SEARCH_EMAIL_ADDRESSES}/`
    }),
    // Determine tha page to log all the summary logs.
    DIST_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: `../../dist/${ScriptName.SEARCH_EMAIL_ADDRESSES}/`
    }),

    // ===FILE NAMES=== //
    // Determine the name of the file of the summary.
    DIST_SUMMARY_FILE_NAME: 'summary_process_',

    // ===DATA BASE=== //
    // Determine the connection string path of the mongo database.
    MONGO_DATA_BASE_CONNECTION_STRING: 'mongodb://localhost:27017/searchEmailAddresses'
};

module.exports = searchEmailAddressesSettings;