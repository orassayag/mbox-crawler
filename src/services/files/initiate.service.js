const settings = require('../../settings/settings');
const { ScriptType } = require('../../core/enums');
const globalUtils = require('../../utils/files/global.utils');
const { fileUtils, pathUtils, validationUtils } = require('../../utils');

class InitiateService {

	constructor() {
		this.scriptType = null;
	}

	initiate(scriptType) {
		// First, setup handle errors and promises.
		this.setup();
		// Validate the script type.
		this.scriptType = scriptType;
		this.validateScriptType();
		// The second important thing to to it to validate all the parameters of the settings.js file.
		this.validateSettings();
		// The next thing is to calculate paths and inject back to the settings.js file.
		this.calculateSettings();
		// Make sure that the dist directory exists. If not, create it.
		this.validateDirectories();
		// Validate that certain directories exists, and if not, create them.
		this.createDirectories();
	}

	setup() {
		// Handle any uncaughtException error.
		process.on('uncaughtException', (error) => {
			process.stdout.write('\n\r');
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(error);
		});
		// Handle any unhandledRejection promise error.
		process.on('unhandledRejection', (reason, promise) => {
			process.stdout.write('\n\r');
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			console.log(reason);
			console.log(promise);
		});
		// Handle ctrl+v keys.
		process.on('SIGINT', () => {
			process.stdout.write('\n\r');
			process.exit(0);
		});
	}

	validateScriptType() {
		if (!this.scriptType || !validationUtils.isValidEnum({
			enum: ScriptType,
			value: this.scriptType
		})) {
			throw new Error('Invalid or no ScriptType parameter was found (1000036)');
		}
	}

	validateSettings() {
		// Validate the settings object existence.
		if (!settings) {
			throw new Error('Invalid or no settings object was found (1000037)');
		}
		this.validatePositiveNumbers();
		this.validateStrings();
		this.validateArrays();
	}

	calculateSettings() {
		const { OUTER_APPLICATION_PATH, INNER_APPLICATION_PATH, APPLICATION_PATH,
			BACKUPS_PATH, DIST_PATH, SOURCES_PATH, NODE_MODULES_PATH, PACKAGE_JSON_PATH,
			PACKAGE_LOCK_JSON_PATH } = settings;
		// ===DYNAMIC PATH=== //
		settings.APPLICATION_PATH = pathUtils.getJoinPath({ targetPath: OUTER_APPLICATION_PATH, targetName: APPLICATION_PATH });
		if (this.scriptType === ScriptType.BACKUP) {
			settings.BACKUPS_PATH = pathUtils.getJoinPath({ targetPath: OUTER_APPLICATION_PATH, targetName: BACKUPS_PATH });
			settings.SOURCES_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: SOURCES_PATH });
		}
		settings.DIST_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: DIST_PATH });
		settings.NODE_MODULES_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: NODE_MODULES_PATH });
		settings.PACKAGE_JSON_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: PACKAGE_JSON_PATH });
		settings.PACKAGE_LOCK_JSON_PATH = pathUtils.getJoinPath({ targetPath: INNER_APPLICATION_PATH, targetName: PACKAGE_LOCK_JSON_PATH });
	}

	validatePositiveNumbers() {
		[
			// ===COUNT & LIMIT=== //
			'MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE', 'MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE', 'MAXIMUM_LINES_COUNT_PER_MBOX_FILE',
			'MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE', 'MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE', 'EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT',
			'EMAIL_ADDRESSES_MERGE_LIMIT_COUNT', 'MAXIMUM_MERGE_ROUNDS_COUNT', 'SECONDS_DELAY_BETWEEN_VALIDATIONS', 'MAXIMUM_EMAIL_CHARACTERS_LENGTH',
			'ADVANCE_MERGE_MULTIPLY',
			// ===BACKUP=== //
			'MILLISECONDS_DELAY_VERIFY_BACKUP_COUNT', 'BACKUP_MAXIMUM_DIRECTORY_VERSIONS_COUNT'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isPositiveNumber(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Excpected a number but received: ${value} (1000038)`);
			}
		});
	}

	validateStrings() {
		const keys = this.scriptType === ScriptType.BACKUP ? ['BACKUPS_PATH', 'SOURCES_PATH'] : [];
		[
			...keys,
			// ===FILE NAME=== //
			'DIST_TEMPORARY_FILE_NAME', 'DIST_FINAL_LIST_VIEW_FILE_NAME', 'DIST_FINAL_MERGE_VIEW_FILE_NAME',
			'DIST_FINAL_VALID_FILE_NAME', 'DIST_FINAL_INVALID_FILE_NAME', 'DIST_FINAL_SUMMARY_FILE_NAME',
			// ===ROOT PATH=== //
			'APPLICATION_NAME', 'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH',
			// ===DYNAMIC PATH=== //
			'APPLICATION_PATH', 'DIST_PATH', 'NODE_MODULES_PATH', 'PACKAGE_JSON_PATH',
			'PACKAGE_LOCK_JSON_PATH'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isExists(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Excpected a string but received: ${value} (1000039)`);
			}
		});
	}

	validateArrays() {
		[
			// ===BACKUP=== //
			'IGNORE_DIRECTORIES', 'IGNORE_FILES', 'INCLUDE_FILES'
		].map(key => {
			const value = settings[key];
			if (!validationUtils.isValidArray(value)) {
				throw new Error(`Invalid or no ${key} parameter was found: Excpected a array but received: ${value} (1000040)`);
			}
		});
	}

	validateDirectories() {
		const keys = this.scriptType === ScriptType.BACKUP ? ['BACKUPS_PATH', 'SOURCES_PATH'] : [];
		[
			...keys,
			// ===ROOT PATH=== //
			'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH',
			// ===DYNAMIC PATH===
			'APPLICATION_PATH', 'PACKAGE_JSON_PATH'
		].map(key => {
			const value = settings[key];
			// Verify that the paths exists.
			globalUtils.isPathExistsError(value);
			// Verify that the paths accessible.
			globalUtils.isPathAccessible(value);
		});
		[
			...keys,
			// ===ROOT PATH=== //
			'OUTER_APPLICATION_PATH', 'INNER_APPLICATION_PATH'
		].map(key => {
			const value = settings[key];
			// Verify that the paths are of directory and not a file.
			if (!fileUtils.isDirectoryPath(value)) {
				throw new Error(`The parameter path ${key} marked as directory but it's a path of a file: ${value} (1000041)`);
			}
		});
	}

	createDirectories() {
		[
			// ===DYNAMIC PATH=== //
			'DIST_PATH', 'NODE_MODULES_PATH'
		].map(async (key) => {
			const value = settings[key];
			// Make sure that the dist directory exists, if not, create it.
			await fileUtils.createDirectory(value);
		});
	}
}

module.exports = new InitiateService();