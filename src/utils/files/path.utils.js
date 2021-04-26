const path = require('path');
const textUtils = require('./text.utils');

class PathUtils {

    constructor() { }

    getRootPath() {
        return path.parse(__dirname).root;
    }

    // This method validates if a given file is in a given extension.
    isTypeFile(data) {
        const { fileName, fileExtension } = data;
        // Check if the fileName parameter was received.
        if (!fileName) {
            throw new Error(`fileName not received: ${fileName} (1000067)`);
        }
        // Check if the fileExtension parameter was received.
        if (!fileExtension) {
            throw new Error(`fileExtension not received: ${fileExtension} (1000068)`);
        }
        const extension = path.extname(fileName);
        // Check if the extension parameter was received.
        if (!extension) {
            throw new Error(`extension not received: ${extension} (1000069)`);
        }
        return extension.toLowerCase() === `.${fileExtension.toLowerCase()}`;
    }

    // This method returns the file name without the extension.
    getFileCleanName(fileName) {
        // Check if the fileName parameter was received.
        if (!fileName) {
            throw new Error(`fileName not received: ${fileName} (1000070)`);
        }
        return path.parse(fileName).name;
    }

    getJoinPath(data) {
        const { targetPath, targetName } = data;
        // Check if the targetPath parameter was received.
        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000071)`);
        }
        // Check if the fileName parameter was received.
        if (!targetName) {
            throw new Error(`targetName not received: ${targetName} (1000072)`);
        }
        return path.join(targetPath, targetName);
    }

    // This method creates a full path, given round number and index, file clean name and file key name.
    createTemporaryFilePath(data) {
        // Check if the targetPath parameter was received.
        const { roundNumber, index, targetPath, fileCleanName, fileKeyName } = data;
        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000073)`);
        }
        // Check if the fileCleanName parameter was received.
        if (!fileCleanName) {
            throw new Error(`fileCleanName not received: ${fileCleanName} (1000074)`);
        }
        // Check if the actionFileName parameter was received.
        if (!fileKeyName) {
            throw new Error(`actionFileName not received: ${fileKeyName} (1000075)`);
        }
        return path.join(targetPath, textUtils.createFileName({
            fileName: fileCleanName,
            fileKeyName: fileKeyName,
            fileTXTName: `${roundNumber}_${index}`,
            isMBOX: false
        }));
    }

    getDirName(targetPath) {
        return path.dirname(targetPath);
    }

    getBasename(source) {
        return path.basename(source);
    }
}

module.exports = new PathUtils();