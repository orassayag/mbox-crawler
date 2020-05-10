const { streamUtils, logUtils, fileUtils, textUtils, emailUtils, validationUtils } = require('../../../utils');
const { PackageType } = require('../../../core/enums/files/system.enum');

class CrawlMBOXFilesCrawlService {

    constructor(data) {
        const { file, emailAddressesCrawlLimitCount } = data;
        this.file = file;
        this.emailAddressesCrawlLimitCount = emailAddressesCrawlLimitCount;
    }

    async initiateCrawl() {
        const crawlMBOXResults = await this.crawlMBOXFile();
        await this.validateCrawlResults(crawlMBOXResults);
        const { linesCounter, emailAddressesCounter, createTXTFilesCounter } = crawlMBOXResults;
        this.file.createCrawlData({
            crawlLinesCount: linesCounter,
            crawlEmailAddressesCount: emailAddressesCounter,
            crawlTXTFilesCount: createTXTFilesCounter
        });
        return this.file;
    }

    async verifyEmailAddressesCount(createTXTFilesCounter) {
        let totalEmailAddressesCounter = 0;
        for (let i = 0; i < createTXTFilesCounter; i++) {
            totalEmailAddressesCounter += await this.getEmailAddressesCountFromTXTFile(i);
        }
        return totalEmailAddressesCounter;
    }

    async getEmailAddressesCountFromTXTFile(index) {
        const emailAddressesList = await emailUtils.getEmailAddressesFromFile(this.file.createTemporaryFilePath({
            roundNumber: 0,
            index: index
        }));
        return emailAddressesList.length;
    }

    async appendEmailAddressesToTXTFile(data) {
        const { emailAddressesList, createTXTFilesCounter } = data;
        await fileUtils.appendFile({
            targetPath: this.file.createTemporaryFilePath({
                roundNumber: 0,
                index: createTXTFilesCounter
            }),
            message: emailAddressesList
        });
    }

    async createTXTFile(data) {
        let { emailAddressesTemporaryList, createTXTFilesCounter } = data;
        await this.appendEmailAddressesToTXTFile({
            emailAddressesList: emailAddressesTemporaryList,
            createTXTFilesCounter: createTXTFilesCounter
        });
        emailAddressesTemporaryList.length = 0;
        createTXTFilesCounter++;
        return {
            emailAddressesTemporaryList: emailAddressesTemporaryList,
            createTXTFilesCounter: createTXTFilesCounter
        };
    }

    async crawlStreamHandler(data) {
        const { stream, line } = data;
        let { emailAddressesTemporaryList, linesCounter, totalEmailAddressesCounter, createTXTFilesCounter } = data;
        if (line) {
            const emailAddresses = textUtils.getEmailAddresses(line);
            if (validationUtils.isExists(emailAddresses)) {
                emailAddressesTemporaryList = emailAddressesTemporaryList.concat(emailAddresses);
                totalEmailAddressesCounter += emailAddresses.length;
                if (validationUtils.isExists(emailAddressesTemporaryList) && emailAddressesTemporaryList.length % this.emailAddressesCrawlLimitCount === 0) {
                    stream.pause();
                    const createTXTFileResults = await this.createTXTFile({
                        emailAddressesTemporaryList: emailAddressesTemporaryList,
                        createTXTFilesCounter: createTXTFilesCounter
                    });
                    emailAddressesTemporaryList = createTXTFileResults.emailAddressesTemporaryList;
                    createTXTFilesCounter = createTXTFileResults.createTXTFilesCounter;
                    stream.resume();
                }
            }
        }
        linesCounter++;
        // Log the progress.
        logUtils.logProgress({
            progressData: {
                'Lines': linesCounter,
                'Email addresses': totalEmailAddressesCounter,
                'TXT files': createTXTFilesCounter
            },
            percentage: textUtils.calculateParentageDisplay({
                partialValue: linesCounter,
                totalValue: this.file.scanData.scanRounds[0].scanRoundLinesCount
            })
        });

        return {
            linesCounter: linesCounter,
            totalEmailAddressesCounter: totalEmailAddressesCounter,
            createTXTFilesCounter: createTXTFilesCounter,
            emailAddressesTemporaryList: emailAddressesTemporaryList
        };
    }

    async crawlStreamEnd(data) {
        const { resolve, linesCounter, totalEmailAddressesCounter } = data;
        let { emailAddressesTemporaryList, createTXTFilesCounter } = data;
        logUtils.logNewLine();
        if (validationUtils.isExists(emailAddressesTemporaryList)) {
            const createTXTFileResults = await this.createTXTFile({
                emailAddressesTemporaryList: emailAddressesTemporaryList,
                createTXTFilesCounter: createTXTFilesCounter
            });
            emailAddressesTemporaryList = createTXTFileResults.emailAddressesTemporaryList;
            createTXTFilesCounter = createTXTFileResults.createTXTFilesCounter;
        }

        resolve({
            linesCounter: linesCounter,
            emailAddressesCounter: totalEmailAddressesCounter,
            createTXTFilesCounter: createTXTFilesCounter
        });
    }

    async crawlMBOXFile() {
        logUtils.logStatus(`Crawling with the "${PackageType.LINE_BY_LINE}" NPM package.`);
        const stream = await streamUtils.createStream({
            packageType: PackageType.LINE_BY_LINE,
            targetPath: this.file.sourceMBOXFile.filePath
        });
        return new Promise((resolve, reject) => {
            try {
                // Counters.
                let linesCounter = 0;
                let totalEmailAddressesCounter = 0;
                let createTXTFilesCounter = 0;
                let emailAddressesTemporaryList = [];

                stream.on('line', async (line) => {
                    try {
                        const crawlStreamHandlerResults = await this.crawlStreamHandler({
                            stream: stream,
                            line: line,
                            emailAddressesTemporaryList: emailAddressesTemporaryList,
                            linesCounter: linesCounter,
                            totalEmailAddressesCounter: totalEmailAddressesCounter,
                            createTXTFilesCounter: createTXTFilesCounter
                        });
                        linesCounter = crawlStreamHandlerResults.linesCounter;
                        totalEmailAddressesCounter = crawlStreamHandlerResults.totalEmailAddressesCounter;
                        emailAddressesTemporaryList = crawlStreamHandlerResults.emailAddressesTemporaryList;
                        createTXTFilesCounter = crawlStreamHandlerResults.createTXTFilesCounter;
                    }
                    catch (error) { }
                });

                stream.on('end', async () => {
                    await this.crawlStreamEnd({
                        resolve: resolve,
                        linesCounter: linesCounter,
                        totalEmailAddressesCounter: totalEmailAddressesCounter,
                        emailAddressesTemporaryList: emailAddressesTemporaryList,
                        createTXTFilesCounter: createTXTFilesCounter
                    });
                });

                stream.on('error', (error) => {
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }

    async validateCrawlResults(crawlMBOXResults) {
        logUtils.logStatus('Validating crawl results.');
        const { linesCounter, emailAddressesCounter, createTXTFilesCounter } = crawlMBOXResults;
        if (!validationUtils.isPositiveNumber(linesCounter)) {
            throw new Error(`Invalid or no linesCounter was found: ${linesCounter} (1000070)`);
        }

        if (!validationUtils.isPositiveNumber(emailAddressesCounter)) {
            throw new Error(`Invalid or no emailAddressesCounter was found: ${emailAddressesCounter} (1000072)`);
        }

        if (!validationUtils.isPositiveNumber(createTXTFilesCounter)) {
            throw new Error(`Invalid or no createTXTFilesCounter was found: ${createTXTFilesCounter} (1000073)`);
        }

        logUtils.logStatus('Verifying email addresses count.');
        const scanRound1 = this.file.scanData.scanRounds[0];

        // Verify that the number of email addresses from the scan step equals to the total email addresses pulled out.
        const totalEmailAddressesCounter = await this.verifyEmailAddressesCount(createTXTFilesCounter);
        if (totalEmailAddressesCounter !== scanRound1.scanRoundEmailAddressesCount || emailAddressesCounter !== scanRound1.scanRoundEmailAddressesCount ||
            emailAddressesCounter !== totalEmailAddressesCounter || linesCounter !== scanRound1.scanRoundLinesCount) {
            const title = 'Unmatch scan results (1000074)';
            logUtils.logStatus(`${title}:`, { totalEmailAddressesCounter, crawlMBOXResults, ...scanRound1 });
            throw new Error(title);
        }
    }
}

module.exports = CrawlMBOXFilesCrawlService;