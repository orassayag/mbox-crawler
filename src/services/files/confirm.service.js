const { logUtils, systemUtils } = require('../../utils');

class ConfirmService {

    constructor(data) {
        const { file, settings } = data;
        this.file = file;
        this.settings = settings;
    }

    async initiateConfirm() {
        await this.validateMBOXFile();
        return this.file;
    }

    async validateMBOXFile() {
        const { MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE, MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE,
            MAXIMUM_LINES_COUNT_PER_MBOX_FILE, MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE,
            MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE } = this.settings;
        // Validate all parameters.
        logUtils.logStatus('Verifying MBOX file limits.');
        const { scanRoundEmailMessagesCount, scanRoundEmailAddressesCount, scanRoundLinesCount } = this.file.scanData.scanRounds[0];
        const fileSize = this.file.sourceMBOXFile.fileSize;
        if (fileSize < MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE) {
            throw new Error(`File size (${fileSize}) less than the minimum size (${MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE}) (1000003)`);
        }
        if (fileSize > MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE) {
            throw new Error(`File size (${fileSize}) exceeds the limit (${MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE}) (1000004)`);
        }
        if (scanRoundEmailMessagesCount > MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE) {
            throw new Error(`Email messages count (${scanRoundEmailMessagesCount}) exceeds the limit (${MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE}) (1000005)`);
        }
        if (scanRoundEmailAddressesCount > MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE) {
            throw new Error(`Email addresses count (${scanRoundEmailAddressesCount}) exceeds the limit (${MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE}) (1000006)`);
        }
        if (scanRoundLinesCount > MAXIMUM_LINES_COUNT_PER_MBOX_FILE) {
            throw new Error(`Lines count (${scanRoundLinesCount}) exceeds the limit (${MAXIMUM_LINES_COUNT_PER_MBOX_FILE}) (1000007)`);
        }
        // ToDo: Add support for multi MBOX files.
        // Validate the required space on drive.
        logUtils.logStatus('Verifying required free space.');
        await systemUtils.validateFreeSpace(fileSize);
    }
}

module.exports = ConfirmService;