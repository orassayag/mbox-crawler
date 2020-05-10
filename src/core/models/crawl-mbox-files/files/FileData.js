const { pathUtils, textUtils, fileUtils } = require('../../../../utils');
const crawlMBOXFilesSettings = require('../../../../settings/crawl-mbox-files.settings');

class FileData {

    constructor(fileData) {
        const { fileName, fileKeyName, fileTargetPath, isMBOX } = fileData;
        this.fileName = textUtils.createFileName({
            fileName: fileName,
            fileKeyName: fileKeyName,
            fileTXTName: null,
            isMBOX: isMBOX
        });
        this.fileNameDisplay = textUtils.verifyCharactersLength({
            value: fileName,
            maximumCharactersLength: crawlMBOXFilesSettings.MAXIMUM_EMAIL_CHARACTERS_LENGTH
        });
        this.fileCleanName = pathUtils.getFileCleanName(fileName);
        this.filePath = pathUtils.getJoinPath({
            targetPath: fileTargetPath,
            targetName: this.fileName
        });
        this.fileSize = 0;
        this.fileSizeDisplay = null;
        this.fileEmailAddressesCount = 0;
    }

    async calculateFileSize() {
        this.fileSize = await fileUtils.getFileSize(this.filePath);
        this.fileSizeDisplay = textUtils.getFileSizeDisplay(this.fileSize);
    }
}

module.exports = FileData;