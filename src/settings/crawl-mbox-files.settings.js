const pathUtils = require('../utils/files/path.utils');
const { ScriptName } = require('../core/enums/files/system.enum');

const crawlMBOXFilesSettings = {
        // ===LIMITS=== //
        MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE: 5000000,
        MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE: 1000000,
        MAXIMUM_LINES_COUNT_PER_MBOX_FILE: 100000000,
        MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE: 1024,
        MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE: 10737418240,
        EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT: 100,
        EMAIL_ADDRESSES_MERGE_LIMIT_COUNT: 100,
        MAXIMUM_MERGE_ROUNDS_COUNT: 10,
        SECONDS_DELAY_BETWEEN_VALIDATIONS: 1,
        MAXIMUM_EMAIL_CHARACTERS_LENGTH: 50,
        ADVANCE_MERGE_MULTIPLY: 2,

        // ===PATHS=== //
        SOURCES_PATH: pathUtils.getJoinPath({
                targetPath: __dirname,
                targetName: `../../sources/${ScriptName.CRAWL_MBOX_FILES}/`
        }),
        DIST_PATH: pathUtils.getJoinPath({
                targetPath: __dirname,
                targetName: `../../dist/${ScriptName.CRAWL_MBOX_FILES}/`
        }),

        // ===FILE NAMES=== //
        DIST_TEMPORARY_FILE_NAME: 'temporary_crawl',
        DIST_FINAL_LIST_VIEW_FILE_NAME: 'final_list_view',
        DIST_FINAL_MERGE_VIEW_FILE_NAME: 'final_merge_view',
        DIST_FINAL_VALID_FILE_NAME: 'final_valid',
        DIST_FINAL_INVALID_FILE_NAME: 'final_invalid',
        DIST_FINAL_SUMMARY_FILE_NAME: 'final_summary',

        // ===URLS=== //
        EMAIL_VALIDATION_URL: 'https://www.emailitin.com/email_validator'
};

module.exports = crawlMBOXFilesSettings;