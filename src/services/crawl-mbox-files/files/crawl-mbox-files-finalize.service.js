const { fileUtils, pathUtils, logUtils, validationUtils } = require('../../../utils');

class CrawlMBOXFilesFinalizeService {

    constructor(data) {
        const { file, distPath, distTemporaryFileName } = data;
        this.file = file;
        this.distPath = distPath;
        this.distTemporaryFileName = distTemporaryFileName;
    }

    async initiateFinalize() {
        await this.validatePaths();
        await this.removeCrawlFiles();
        logUtils.logStatus('Calculating summary data.');
        this.file.calculateSummaryData();
        this.validateFinalizeResults();
        return this.file;
    }

    // Validate that paths of all the main files exists.
    async validatePaths() {
        logUtils.logStatus('Validating main paths.');
        const paths = [
            this.file.distFinalMergeViewTXTFile.filePath,
            this.file.distFinalListViewTXTFile.filePath//,
            // ToDo: Return this only with appropriate internet connection.
            /* this.file.distFinalValidTXTFile.filePath,
               this.file.distFinalInvalidTXTFile.filePath */
        ];
        for (let i = 0, length = paths.length; i < length; i++) {
            await fileUtils.isPathExists(paths[i]);
        }
    }

    // Remove all files from the crawl step.
    async removeCrawlFiles() {
        logUtils.logStatus('Removing crawl files.');

        // Get all the files.
        let files = await fileUtils.getDirectoryFiles(this.distPath);
        if (!validationUtils.isExists(files)) {
            return;
        }

        // Filter only the relevant files.
        files = files.filter(f => {
            return f.indexOf(this.distTemporaryFileName) > -1 &&
                pathUtils.isTypeFile({
                    fileName: f,
                    fileExtension: 'txt'
                });
        }).map(f => {
            return pathUtils.getJoinPath({
                targetPath: this.distPath,
                targetName: f
            });
        });

        // Remove the files.
        for (let i = 0, length = files.length; i < length; i++) {
            await fileUtils.removeFile(files[i]);
        }
    }

    validateProcessData() {
        logUtils.logStatus('Validating finalize results.');
        const { scanData, crawlData, mergeData, summaryData, sourceMBOXFile, distFinalMergeViewTXTFile,
            distFinalListViewTXTFile, distFinalValidTXTFile, distFinalInvalidTXTFile } = this.file;

        if (!scanData) {
            throw new Error(`Invalid or no scanData was found: ${scanData} (1000093)`);
        }

        if (!crawlData) {
            throw new Error(`Invalid or no crawlData was found: ${crawlData} (1000094)`);
        }

        if (!mergeData) {
            throw new Error(`Invalid or no mergeData was found: ${mergeData} (1000095)`);
        }

        if (!summaryData) {
            throw new Error(`Invalid or no summaryData was found: ${summaryData} (1000096)`);
        }

        if (!sourceMBOXFile) {
            throw new Error(`Invalid or no sourceMBOXFile was found: ${sourceMBOXFile} (1000097)`);
        }

        if (!distFinalMergeViewTXTFile) {
            throw new Error(`Invalid or no distFinalMergeViewTXTFile was found: ${distFinalMergeViewTXTFile} (1000098)`);
        }

        if (!distFinalListViewTXTFile) {
            throw new Error(`Invalid or no distFinalListViewTXTFile was found: ${distFinalListViewTXTFile} (1000099)`);
        }

        if (!distFinalValidTXTFile) {
            throw new Error(`Invalid or no distFinalValidTXTFile was found: ${distFinalValidTXTFile} (1000100)`);
        }

        if (!distFinalInvalidTXTFile) {
            throw new Error(`Invalid or no distFinalInvalidTXTFile was found: ${distFinalInvalidTXTFile} (1000101)`);
        }
    }

    validateMBOXResults(summaryData) {
        const { sourceMBOXFile, finalListViewTXTFile, finalMergeViewTXTFile, validEmailAddressesTXTFile, invalidEmailAddressesTXTFile } = summaryData;
        if (!sourceMBOXFile) {
            throw new Error(`Invalid or no sourceMBOXFile was found: ${sourceMBOXFile} (1000079)`);
        }

        if (!finalListViewTXTFile) {
            throw new Error(`Invalid or no finalListViewTXTFile was found: ${finalListViewTXTFile} (1000080)`);
        }

        if (!finalMergeViewTXTFile) {
            throw new Error(`Invalid or no finalMergeViewTXTFile was found: ${finalMergeViewTXTFile} (1000081)`);
        }

        if (!validEmailAddressesTXTFile) {
            throw new Error(`Invalid or no validEmailAddressesTXTFile was found: ${validEmailAddressesTXTFile} (1000082)`);
        }

        if (!invalidEmailAddressesTXTFile) {
            throw new Error(`Invalid or no invalidEmailAddressesTXTFile was found: ${invalidEmailAddressesTXTFile} (1000083)`);
        }
    }

    validateStatisticsResults(statisticsData) {
        const { totalMBOXFileEmailAddressesCount, totalFinalEmailAddressesCount, totalMBOXFileLinesCount,
            totalEmailMessagesCount, totalCrawlCreateTXTFilesCount, totalMergeRoundsCount,
            totalMergeCreateTXTFilesCount } = statisticsData;

        if (!totalMBOXFileEmailAddressesCount) {
            throw new Error(`Invalid or no totalMBOXFileEmailAddressesCount was found: ${totalMBOXFileEmailAddressesCount} (1000084)`);
        }

        if (!totalFinalEmailAddressesCount) {
            throw new Error(`Invalid or no totalFinalEmailAddressesCount was found: ${totalFinalEmailAddressesCount} (1000085)`);
        }

        if (!totalMBOXFileLinesCount) {
            throw new Error(`Invalid or no totalMBOXFileLinesCount was found: ${totalMBOXFileLinesCount} (1000086)`);
        }

        if (!totalEmailMessagesCount) {
            throw new Error(`Invalid or no totalEmailMessagesCount was found: ${totalEmailMessagesCount} (1000087)`);
        }

        if (!totalCrawlCreateTXTFilesCount) {
            throw new Error(`Invalid or no totalCrawlCreateTXTFilesCount was found: ${totalCrawlCreateTXTFilesCount} (1000088)`);
        }

        if (!totalMergeRoundsCount) {
            throw new Error(`Invalid or no totalMergeRoundsCount was found: ${totalMergeRoundsCount} (1000089)`);
        }

        if (!totalMergeCreateTXTFilesCount) {
            throw new Error(`Invalid or no totalMergeCreateTXTFilesCount was found: ${totalMergeCreateTXTFilesCount} (1000090)`);
        }
    }

    validateTimesResults(timesData) {
        const { startProcessDateTimeDisplay, endProcessDateTimeDisplay, totalProcessTimeDisplay } = timesData;
        if (!startProcessDateTimeDisplay) {
            throw new Error(`Invalid or no startProcessDateTimeDisplay was found: ${startProcessDateTimeDisplay} (1000091)`);
        }

        if (!endProcessDateTimeDisplay) {
            throw new Error(`Invalid or no endProcessDateTimeDisplay was found: ${endProcessDateTimeDisplay} (1000092)`);
        }

        if (!totalProcessTimeDisplay) {
            throw new Error(`Invalid or no totalProcessTimeDisplay was found: ${totalProcessTimeDisplay} (1000092)`);
        }
    }

    validateFinalizeResults() {
        const { summaryData } = this.file;
        const { statisticsData, timesData } = summaryData;

        // Validate that all process data exists.
        this.validateProcessData();
        // Validate all summary data.
        this.validateMBOXResults(summaryData);
        this.validateStatisticsResults(statisticsData);
        this.validateTimesResults(timesData);
    }
}

module.exports = CrawlMBOXFilesFinalizeService;