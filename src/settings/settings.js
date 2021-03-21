const pathUtils = require('../utils/files/path.utils');

const settings = {
    // ===COUNT & LIMIT=== //
    // Determine the maximum count of email addresses per MBOX file to scan.
    MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE: 5000000,
    // Determine the maximum count of messages per MBOX file to scan.
    MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE: 1000000,
    // Determine the maximum counts of lines per MBOX file to scan.
    MAXIMUM_LINES_COUNT_PER_MBOX_FILE: 100000000,
    // Determine the minimum size of MBOX file to scan in bytes.
    MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE: 1024,
    // Determine the maximum size of MBOX file to scan in bytes.
    MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE: 10737418240,
    // Determine the maximum number of email addresses per TXT file in the crawl service.
    EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT: 100,
    // Determine the maximum number of email addresses per TXT file in the merge service.
    EMAIL_ADDRESSES_MERGE_LIMIT_COUNT: 100,
    // Determine the maximum number of merge rounds in the merge service.
    MAXIMUM_MERGE_ROUNDS_COUNT: 10,
    // Determine the number of seconds to delay between the validations in the validate service.
    SECONDS_DELAY_BETWEEN_VALIDATIONS: 1,
    // Determine the maximum characters count of email addresses.
    MAXIMUM_EMAIL_CHARACTERS_LENGTH: 50,
    // Determine the rate of the merge in the merge service.
    ADVANCE_MERGE_MULTIPLY: 2,

    // ===FILE NAME=== //
    // Determine the temporary name of the TXT file in the crawl service.
    DIST_TEMPORARY_FILE_NAME: 'temporary_crawl',
    // Determine the final name of the TXT file of all the email addresses in a list view (separated each line).
    DIST_FINAL_LIST_VIEW_FILE_NAME: 'final_list_view',
    // Determine the final name of the TXT file of all the email addresses in a merge view (separated commas).
    DIST_FINAL_MERGE_VIEW_FILE_NAME: 'final_merge_view',
    // Determine the final name of the TXT file of all the valid email addresses stored in.
    DIST_FINAL_VALID_FILE_NAME: 'final_valid',
    // Determine the final name of the TXT file of all the invalid email addresses stored in.
    DIST_FINAL_INVALID_FILE_NAME: 'final_invalid',
    // Determine the final name of the TXT file of all the summary details about the process stored in.
    DIST_FINAL_SUMMARY_FILE_NAME: 'final_summary',

    // ===ROOT PATH=== //
    // Determine the application name used for some of the calculated paths.
    APPLICATION_NAME: 'mbox-crawler',
    // Determine the path for the outer application, where other directories located, such as backups, sources, etc...
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\').
    OUTER_APPLICATION_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../../'
    }),
    // Determine the inner application path where all the source of the application is located.
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler\\').
    INNER_APPLICATION_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../'
    }),

    // ===DYNAMIC PATH=== //
    // All these paths will be calculated during runtime in the initial service.
    // DON'T REMOVE THE KEYS, THEY WILL BE CALCULATED TO PATHS DURING RUNTIME.
    // Determine the application path where all the source of the application is located.
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler').
    APPLICATION_PATH: 'mbox-crawler',
    // Determine the backups directory which all the local backup will be created to.
    // (Working example: 'C:\\Or\\Web\\Crawler\\backups').
    BACKUPS_PATH: 'backups',
    // Determine the dist directory path which there, all the outcome of the logs will be created.
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler\\dist').
    DIST_PATH: 'dist',
    // Determine the sources directory path.
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler\\sources').
    SOURCES_PATH: 'sources',
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler\\node_modules').
    NODE_MODULES_PATH: 'node_modules',
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler\\package.json').
    PACKAGE_JSON_PATH: 'package.json',
    // (Working example: 'C:\\Or\\Web\\mbox-crawler\\mbox-crawler\\package-lock.json').
    PACKAGE_LOCK_JSON_PATH: 'package-lock.json',

    // ===BACKUP=== //
    // Determine the directories to ignore when a backup copy is taking place.
    // For example: 'dist'.
    IGNORE_DIRECTORIES: ['dist', 'node_modules', 'sources'],
    // Determine the files to ignore when the back copy is taking place.
    // For example: 'back_sources_tasks.txt'.
    IGNORE_FILES: ['back_sources_tasks.txt'],
    // Determine the files to force include when the back copy is taking place.
    // For example: '.gitignore'.
    INCLUDE_FILES: ['.gitignore'],
    // Determine the period of time in milliseconds to
    // check that files were created / moved to the target path.
    MILLISECONDS_DELAY_VERIFY_BACKUP_COUNT: 1000,
    // Determine the number of times in loop to check for version of a backup.
    // For example, if a backup name 'test-test-test-1' exists, it will check for 'test-test-test-2',
    // and so on, until the current maximum number.
    BACKUP_MAXIMUM_DIRECTORY_VERSIONS_COUNT: 50
};

module.exports = settings;