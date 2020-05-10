const { fileUtils, pathUtils, logUtils, textUtils, validationUtils } = require('../../../utils');
const FileProcess = require('../../../core/models/files/FileProcess');

class CrawlMBOXFilesInitiateService {

    constructor(data) {
        const { sourcesPath, distPath, distTemporaryFileName, distFinalMergeViewFileName,
            distFinalListViewFileName, distFinalValidFileName, distFinalInvalidFileName,
            distFinalSummaryFileName } = data;
        this.sourcesPath = sourcesPath;
        this.distPath = distPath;
        this.distTemporaryFileName = distTemporaryFileName;
        this.distFinalListViewFileName = distFinalListViewFileName;
        this.distFinalMergeViewFileName = distFinalMergeViewFileName;
        this.distFinalValidFileName = distFinalValidFileName;
        this.distFinalInvalidFileName = distFinalInvalidFileName;
        this.distFinalSummaryFileName = distFinalSummaryFileName;
    }

    async initiateProcess() {
        await this.validatePaths();
        return await this.getFiles();
    }

    async validatePaths() {
        // Verify that the dist and the sources paths exists.
        await fileUtils.isPathExists(this.sourcesPath);
        // Make sure that the dist directory exists, if not, create it.
        await fileUtils.createDirectory(this.distPath);
        // Verify that the dist and the sources paths accessible.
        await fileUtils.isPathAccessible(this.sourcesPath);
        await fileUtils.isPathAccessible(this.distPath);
        // Empty the dist directory (any previous results exists) before start.
        await fileUtils.emptyDirectory(this.distPath);
    }

    async getFiles() {
        // Get all the files.
        let files = await fileUtils.getDirectoryFiles(this.sourcesPath);

        // Validate that there is at least 1 file in the source directory.
        if (!validationUtils.isExists(files)) {
            throw new Error(`No any files exists in ${this.sourcesPath} (1000004)`);
        }

        // Validate that there is at least 1 MBOX file in the source directory.
        files = files.filter(f => {
            return pathUtils.isTypeFile({
                fileName: f,
                fileExtension: 'mbox'
            });
        });

        // Validate that there is at least 1 MBOX file in the source directory.
        if (!validationUtils.isExists(files)) {
            throw new Error(`No MBOX files exists in ${this.sourcesPath} (1000008)`);
        }

        files = await Promise.all(files.map(async f => {
            return new Promise(async resolve => {
                const temporaryFile = new FileProcess({
                    fileName: f,
                    sourcesPath: this.sourcesPath,
                    distPath: this.distPath,
                    distTemporaryFileName: this.distTemporaryFileName,
                    distFinalListViewFileName: this.distFinalListViewFileName,
                    distFinalMergeViewFileName: this.distFinalMergeViewFileName,
                    distFinalValidFileName: this.distFinalValidFileName,
                    distFinalInvalidFileName: this.distFinalInvalidFileName,
                    distFinalSummaryFileName: this.distFinalSummaryFileName
                });
                await temporaryFile.sourceMBOXFile.calculateFileSize();
                resolve(temporaryFile);
            });
        }));

        // Log all the MBOX files.
        this.logFiles(files);
        return files;
    }

    logFiles(files) {
        const data = [];
        let totalSize = 0;
        for (let i = 0, length = files.length; i < length; i++) {
            const file = files[i];
            const key = file.sourceMBOXFile.fileNameDisplay;
            const value = file.sourceMBOXFile.fileSizeDisplay;
            totalSize += file.sourceMBOXFile.fileSize;
            data.push([key, value ]);
        }
        data.push([`Files count: ${textUtils.getNumberWithCommas(files.length)}`, `Total size: ${textUtils.getFileSizeDisplay(totalSize)}`]);
        logUtils.log('MBOX files found:');
        logUtils.logTableData({
            titles: ['File Name', 'Size'],
            tableData: data
        });
    }
}

module.exports = CrawlMBOXFilesInitiateService;