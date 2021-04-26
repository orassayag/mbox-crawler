const fs = require('fs-extra');
const globalUtils = require('./global.utils');
const pathUtils = require('./path.utils');

class FileUtils {

    constructor() { }

    async read(targetPath) {
        return await fs.readFile(targetPath, 'utf-8');
    }

    async isPathExists(targetPath) {
        // Check if the path parameter was received.
        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000058)`);
        }
        // Check if the path parameter exists.
        try {
            return await fs.stat(targetPath);
        }
        catch (error) {
            return false;
        }
    }

    // This method removes all files from a given target path.
    async emptyDirectory(targetPath) {
        // Verify that the path exists.
        globalUtils.isPathExistsError(targetPath);
        // Empty the directory.
        await fs.emptyDir(targetPath);
    }

    // This method returns all the files in a given target path.
    async getDirectoryFiles(targetPath) {
        // Verify that the path exists.
        globalUtils.isPathExistsError(targetPath);
        // Get all the files.
        return await fs.readdir(targetPath);
    }

    async readFile(targetPath) {
        // Verify that the path exists.
        globalUtils.isPathExistsError(targetPath);
        // Return the file content.
        return await this.read(targetPath);
    }

    async readFileIfExists(targetPath) {
        // Check if the file exists.
        if (await this.isPathExists(targetPath)) {
            return await this.read(targetPath);
        }
    }

    createDirectory(targetPath) {
        if (!targetPath) {
            return;
        }
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
        }
    }

    async appendFile(data) {
        const { targetPath, message } = data;
        if (!targetPath) {
            throw new Error(`targetPath not found: ${targetPath} (1000059)`);
        }
        if (!message) {
            throw new Error(`message not found: ${message} (1000060)`);
        }
        if (!await this.isPathExists(targetPath)) {
            await fs.promises.mkdir(pathUtils.getDirName(targetPath), { recursive: true }).catch();
        }
        // Append the message to the file.
        await fs.appendFile(targetPath, message);
    }

    async removeFile(targetPath) {
        // Verify that the path exists.
        globalUtils.isPathExistsError(targetPath);
        // Remove the file.
        await fs.unlink(targetPath);
    }

    async removeDirectoryIfExists(targetPath) {
        if (!await this.isPathExists(targetPath)) {
            await fs.remove(targetPath);
        }
    }

    async createDirectoryIfNotExists(targetPath) {
        if (!await this.isPathExists(targetPath)) {
            await fs.mkdir(targetPath);
        }
    }

    async copyDirectory(sourcePath, targetPath, filterFunction) {
        await fs.copy(sourcePath, targetPath, { filter: filterFunction });
    }

    isDirectoryPath(path) {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    }

    async getFileSize(targetPath) {
        // Verify that the path exists.
        globalUtils.isPathExistsError(targetPath);
        // Return file size.
        return (await fs.stat(targetPath)).size;
    }

    getFileLinesCount(targetPath) {
        // Verify that the path exists.
        globalUtils.isPathExistsError(targetPath);
        return new Promise(resolve => {
            let i;
            let count = 0;
            fs.createReadStream(targetPath)
                .on('data', (chunk) => {
                    for (i = 0; i < chunk.length; ++i) {
                        if (chunk[i] === 10) {
                            count++;
                        }
                    }
                })
                .on('end', () => {
                    resolve(count);
                });
        });
    }

    async renameFile(data) {
        const { basePath, targetPath } = data;
        if (!basePath) {
            throw new Error(`basePath not found: ${basePath} (1000061)`);
        }
        if (!targetPath) {
            throw new Error(`targetPath not found: ${targetPath} (1000062)`);
        }
        // Verify that the base path exists.
        globalUtils.isPathExistsError(basePath);
        // Rename the path.
        await fs.rename(basePath, targetPath);
    }
}

module.exports = new FileUtils();