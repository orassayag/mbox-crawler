const path = require('path');
const textUtils = require('../files/text.utils');

class PathUtils {

    constructor() { }

    getRootPath() {
        return path.parse(__dirname).root;
    }

    // This method check if a given file is in a given extension.
    isTypeFile(data) {
        const { fileName, fileExtension } = data;

        // Check if the fileName parameter was received.
        if (!fileName) {
            throw new Error(`fileName not received: ${fileName} (1000005)`);
        }

        // Check if the fileExtension parameter was received.
        if (!fileExtension) {
            throw new Error(`fileExtension not received: ${fileExtension} (1000006)`);
        }

        const extension = path.extname(fileName);

        // Check if the extension parameter was received.
        if (!extension) {
            throw new Error(`extension not received: ${extension} (1000007)`);
        }

        return extension.toLowerCase() === `.${fileExtension.toLowerCase()}`;
    }

    // This method return the file name without the extension.
    getFileCleanName(fileName) {
        // Check if the fileName parameter was received.
        if (!fileName) {
            throw new Error(`fileName not received: ${fileName} (1000011)`);
        }

        return path.parse(fileName).name;
    }

    getJoinPath(data) {
        const { targetPath, targetName } = data;

        // Check if the targetPath parameter was received.
        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000012)`);
        }

        // Check if the fileName parameter was received.
        if (!targetName) {
            throw new Error(`targetName not received: ${targetName} (1000013)`);
        }

        return path.join(targetPath, targetName);
    }

    // This method creates a full path, given round number and index, file clean name and file key name.
    createTemporaryFilePath(data) {
        // Check if the targetPath parameter was received.
        const { roundNumber, index, targetPath, fileCleanName, fileKeyName } = data;

        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000008)`);
        }

        // Check if the fileCleanName parameter was received.
        if (!fileCleanName) {
            throw new Error(`fileCleanName not received: ${fileCleanName} (1000009)`);
        }

        // Check if the actionFileName parameter was received.
        if (!fileKeyName) {
            throw new Error(`actionFileName not received: ${fileKeyName} (1000010)`);
        }
        return path.join(targetPath, textUtils.createFileName({
            fileName: fileCleanName,
            fileKeyName: fileKeyName,
            fileTXTName: `${roundNumber}_${index}`,
            isMBOX: false
        }));
    }
}

const pathUtils = new PathUtils();
module.exports = pathUtils;