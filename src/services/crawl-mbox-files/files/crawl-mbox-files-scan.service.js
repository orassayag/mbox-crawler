const { textUtils, logUtils, streamUtils, validationUtils } = require('../../../utils');
const { PackageType } = require('../../../core/enums/files/system.enum');

class CrawlMBOXFilesScanService {

    constructor(data) {
        const { file } = data;
        this.file = file;
    }

    async initiateScan() {
        logUtils.logStatus('Preparing to scan the MBOX file.');
        await this.file.startProcess();
        this.validatePreScan();
        await this.scanFirstPackage();
        await this.scanSecondPackage();
        this.validateScanResults();
        return this.file;
    }

    logScan(data) {
        const { scanNumber, scanPackageName } = data;
        logUtils.logStatus(`Scan number ${scanNumber}: Streaming with the "${scanPackageName}" NPM package.`);
    }

    async scanFirstPackage() {
        this.logScan({
            scanNumber: 1,
            scanPackageName: PackageType.LINE_BY_LINE
        });
        let scanResults = null;

        try {
            scanResults = await this.scanMBOXFile({
                scanNumber: 1,
                stream: await streamUtils.createStream({
                    packageType: PackageType.LINE_BY_LINE,
                    targetPath: this.file.sourceMBOXFile.filePath
                }),
                eventName: 'line',
                scanLinesCounter: (line) => { return ++line; },
                scanEmailMessagesCounter: () => { return 1; }, // Fake number.
                getPercentage: (linesCounter) => {
                    return textUtils.calculateParentageDisplay({
                        partialValue: linesCounter,
                        totalValue: this.file.scanData.initiateScanLinesCount
                    });
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
        this.setScanResults({
            scanNumber: 1,
            scanPackageName: PackageType.LINE_BY_LINE,
            scanResults: scanResults
        });
    }

    async scanSecondPackage() {
        this.logScan({
            scanNumber: 2,
            scanPackageName: PackageType.NODE_MBOX
        });
        let scanResults = null;

        try {
            scanResults = await this.scanMBOXFile({
                scanNumber: 2,
                stream: await streamUtils.createStream({
                    packageType: PackageType.NODE_MBOX,
                    targetPath: this.file.sourceMBOXFile.filePath
                }),
                eventName: 'message',
                scanLinesCounter: () => { return 1; }, // Fake number.
                scanEmailMessagesCounter: (data) => {
                    let { emailMessagesCounter } = data;
                    return ++emailMessagesCounter;
                },
                getPercentage: (emailAddressesCounter) => {
                    return textUtils.calculateParentageDisplay({
                        partialValue: emailAddressesCounter,
                        totalValue: this.file.scanData.scanRounds[0].scanRoundEmailAddressesCount
                    });
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
        this.setScanResults({
            scanNumber: 2,
            scanPackageName: PackageType.NODE_MBOX,
            scanResults: scanResults
        });
    }

    setScanResults(data) {
        const { scanNumber, scanPackageName, scanResults } = data;
        const { linesCounter, emailMessagesCounter, emailAddressesCounter } = scanResults;
        this.file.createScanData({
            scanRoundNumber: scanNumber,
            scanRoundPackageName: scanPackageName,
            scanRoundLinesCount: linesCounter,
            scanRoundEmailMessagesCount: emailMessagesCounter,
            scanRoundEmailAddressesCount: emailAddressesCounter
        });
    }

    scanStreamHandler(data) {
        const { scanNumber, emailMessage, scanLinesCounter, scanEmailMessagesCounter, getPercentage } = data;
        let { linesCounter, emailMessagesCounter, emailAddressesCounter } = data;
        linesCounter = scanLinesCounter(linesCounter);
        if (emailMessage) {
            emailMessagesCounter = scanEmailMessagesCounter({
                emailMessagesCounter: emailMessagesCounter,
                emailMessage: emailMessage
            });
            const emailAddresses = textUtils.getEmailAddresses(emailMessage);
            if (validationUtils.isExists(emailAddresses)) {
                emailAddressesCounter += emailAddresses.length;
            }
        }

        let progressData = null;
        if (scanNumber == 1) {
            progressData = {
                'Lines': linesCounter,
                'Email addresses': emailAddressesCounter
            };
        }
        else {
            progressData = {
                'Email messages': emailMessagesCounter,
                'Email addresses': emailAddressesCounter
            };
        }

        // Log the progress.
        logUtils.logProgress({
            progressData: progressData,
            percentage: getPercentage(scanNumber === 1 ? linesCounter : emailAddressesCounter)
        });

        return {
            linesCounter: linesCounter,
            emailMessagesCounter: emailMessagesCounter,
            emailAddressesCounter: emailAddressesCounter
        };
    }

    scanStreamEnd(data) {
        const { resolve, linesCounter, emailMessagesCounter, emailAddressesCounter } = data;
        logUtils.logNewLine();
        resolve({
            linesCounter: linesCounter,
            emailMessagesCounter: emailMessagesCounter,
            emailAddressesCounter: emailAddressesCounter
        });
    }

    async scanMBOXFile(data) {
        const { scanNumber, stream, eventName, scanLinesCounter, scanEmailMessagesCounter, getPercentage } = data;
        return new Promise((resolve, reject) => {
            try {
                // Counters.
                let linesCounter = 0;
                let emailMessagesCounter = 0;
                let emailAddressesCounter = 0;

                stream.on(eventName, (emailMessage) => {
                    try {
                        const scanStreamHandlerResults = this.scanStreamHandler({
                            scanNumber: scanNumber,
                            emailMessage: emailMessage,
                            scanLinesCounter: scanLinesCounter,
                            scanEmailMessagesCounter: scanEmailMessagesCounter,
                            getPercentage: getPercentage,
                            linesCounter: linesCounter,
                            emailMessagesCounter: emailMessagesCounter,
                            emailAddressesCounter: emailAddressesCounter
                        });
                        linesCounter = scanStreamHandlerResults.linesCounter;
                        emailMessagesCounter = scanStreamHandlerResults.emailMessagesCounter;
                        emailAddressesCounter = scanStreamHandlerResults.emailAddressesCounter;
                    }
                    catch (error) { }
                });

                stream.on('end', () => {
                    this.scanStreamEnd({
                        resolve: resolve,
                        linesCounter: linesCounter,
                        emailMessagesCounter: emailMessagesCounter,
                        emailAddressesCounter: emailAddressesCounter
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

    validatePreScan() {
        if (!validationUtils.isPositiveNumber(this.file.scanData.initiateScanLinesCount)) {
            throw new Error(`Invalid or no initiateScanLinesCount was found: ${this.file.scanData.initiateScanLinesCount} (1000066)`);
        }
    }

    validateScanRoundResults(scanRound) {
        // Validate all scan rounds parameters.
        const { scanRoundNumber, scanRoundPackageName, scanRoundLinesCount, scanRoundEmailMessagesCount, scanRoundEmailAddressesCount } = scanRound;
        if (!validationUtils.isPositiveNumber(scanRoundNumber)) {
            throw new Error(`Invalid or no scanRoundNumber was found: ${scanRoundNumber} (1000060)`);
        }

        if (!scanRoundPackageName) {
            throw new Error(`Invalid or no scanRoundPackageName was found: ${scanRoundPackageName} (1000061)`);
        }

        if (!validationUtils.isPositiveNumber(scanRoundLinesCount)) {
            throw new Error(`Invalid or no scanRoundLinesCount was found: ${scanRoundLinesCount} (1000062)`);
        }

        if (!validationUtils.isPositiveNumber(scanRoundEmailMessagesCount)) {
            throw new Error(`Invalid or no scanRoundEmailMessagesCount was found: ${scanRoundEmailMessagesCount} (1000063)`);
        }

        if (!validationUtils.isPositiveNumber(scanRoundEmailAddressesCount)) {
            throw new Error(`Invalid or no scanRoundEmailAddressesCount was found: ${scanRoundEmailAddressesCount} (1000064)`);
        }
    }

    validateScanResults() {
        // Validate basic parameters.
        logUtils.logStatus('Validating scan results.');
        const { scanRounds } = this.file.scanData;

        // Validate at least 1 scan round item.
        if (!validationUtils.isExists(scanRounds)) {
            throw new Error(`Invalid or no scanRounds was found: ${scanRounds} (1000104)`);
        }

        if (scanRounds.length !== 2) {
            throw new Error('Scan rounds is not equal to 2 (1000102)');
        }
        this.validateScanRoundResults(scanRounds[0]);
        this.validateScanRoundResults(scanRounds[1]);

        // Compare the two scans results.
        logUtils.logStatus('Verifying email addresses scans.');
        if (scanRounds[0].scanRoundEmailAddressesCount !== scanRounds[1].scanRoundEmailAddressesCount ||
            this.file.scanData.initiateScanLinesCount !== scanRounds[0].scanRoundLinesCount) {
            const title = 'Unmatch scan results (1000065)';
            logUtils.logStatus(`${title}:`, this.file.scanData);
            throw new Error(title);
        }
    }
}

module.exports = CrawlMBOXFilesScanService;