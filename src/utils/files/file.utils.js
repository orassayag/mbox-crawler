const fs = require('fs-extra');

class FileUtils {

    constructor() { }

    async read(targetPath) {
        return await fs.readFile(targetPath, 'utf-8');
    }

    // This method check if a receive target path is exist.
    async isPathExists(targetPath) {
        // Check if the path parameter was received.
        if (!targetPath) {
            throw new Error(`targetPath not received: ${targetPath} (1000000)`);
        }

        // Check if the path parameter exists.
        if (!await fs.exists(targetPath)) {
            throw new Error(`targetPath not exists: ${targetPath} (1000001)`);
        }
    }

    // This method check if a receive target path is accessible.
    async isPathAccessible(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

        // Check if the path is readable.
        const errorRead = await fs.access(targetPath, fs.constants.R_OK);
        if (errorRead) {
            throw new Error(`targetPath not readable: ${targetPath} (1000002)`);
        }

        // Check if the path is writable.
        const errorWrite = await fs.access(targetPath, fs.constants.W_OK);
        if (errorWrite) {
            throw new Error(`targetPath not writable: ${targetPath} (1000003)`);
        }
    }

    // This method remove all files from a given target path.
    async emptyDirectory(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

        // Empty the directory.
        await fs.emptyDir(targetPath);
    }

    // This method return all the files in a given target path.
    async getDirectoryFiles(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

        // Get all the files.
        return await fs.readdir(targetPath);
    }

    // This method return the file size.
    async getFileSize(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

        // Return file size.
        return (await fs.stat(targetPath)).size;
    }

    async readFile(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

        // Return the file content.
        return await this.read(targetPath);
    }

    async readFileIfExists(targetPath) {
        // Check if the path exists. Only if so, return the data.
        if (await fs.exists(targetPath)) {
            // Return the file content.
            return await this.read(targetPath);
        }
        return null;
    }

    async createDirectory(targetPath) {
        if (!targetPath) {
            return;
        }

        if (!await fs.exists(targetPath)) {
            await fs.mkdir(targetPath, { recursive: true });
        }
    }

    async appendFile(data) {
        const { targetPath, message } = data;

        if (!targetPath) {
            throw new Error(`targetPath not found: ${targetPath} (1000058)`);
        }

        if (!message) {
            throw new Error(`message not found: ${message} (1000018)`);
        }

        // Append the message to the file.
        await fs.appendFile(targetPath, message);
    }

    async renameFile(data) {
        const { basePath, targetPath } = data;

        if (!basePath) {
            throw new Error(`basePath not found: ${basePath} (1000059)`);
        }

        if (!targetPath) {
            throw new Error(`targetPath not found: ${targetPath} (1000019)`);
        }

        // Verify that the base path exists.
        await this.isPathExists(basePath);

        // Rename the path.
        await fs.rename(basePath, targetPath);
    }

    async getFileLinesCount(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

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

    async removeFile(targetPath) {
        // Verify that the path exists.
        await this.isPathExists(targetPath);

        // Remove the file.
        await fs.unlink(targetPath);
    }
}

const fileUtils = new FileUtils();
module.exports = fileUtils;