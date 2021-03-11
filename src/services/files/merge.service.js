const { emailUtils, fileUtils, logUtils, textUtils, validationUtils } = require('../../utils');

class MergeService {

    constructor(data) {
        const { file, emailAddressesMergeLimitCount, maximumMergeRoundsCount, advanceMergeMultiply } = data;
        this.file = file;
        this.emailAddressesMergeLimitCount = emailAddressesMergeLimitCount;
        this.maximumMergeRoundsCount = maximumMergeRoundsCount;
        this.advanceMergeMultiply = advanceMergeMultiply;
        this.finalRoundNumber = 0;
        this.finalTXTFilesCount = 0;
    }

    async initiateMerge() {
        let currentTXTFilesCount = this.file.crawlData.crawlTXTFilesCount;
        let currentRoundNumber = 0;
        while (currentRoundNumber === 0 || (currentTXTFilesCount !== 1 && currentRoundNumber <= this.maximumMergeRoundsCount)) {
            const roundMergeResults = await this.mergeTXTFiles({
                currentRoundNumber: currentRoundNumber,
                currentTXTFilesCount: currentTXTFilesCount
            });
            currentTXTFilesCount = roundMergeResults.newTXTFilesCount;
            this.emailAddressesMergeLimitCount *= this.advanceMergeMultiply;
            currentRoundNumber++;
            this.setMergeResults({
                roundMergeResults: roundMergeResults,
                currentRoundNumber: currentRoundNumber
            });
        }
        await this.finishMerge();
        this.validateMergeResults();
        return this.file;
    }

    async finishMerge() {
        logUtils.logStatus('Verifying merged email addresses.');
        const lastFilePath = this.file.createTemporaryFilePath({
            roundNumber: this.finalRoundNumber,
            index: this.finalTXTFilesCount
        });
        const emailAddressesList = await emailUtils.getEmailAddressesFromFile(lastFilePath);
        // Rename the last merged TXT file to its target name.
        await fileUtils.renameFile({
            basePath: lastFilePath,
            targetPath: this.file.distFinalMergeViewTXTFile.filePath
        });
        await this.file.distFinalMergeViewTXTFile.calculateFileSize();
        this.file.distFinalMergeViewTXTFile.fileEmailAddressesCount = emailAddressesList.length;
        // Create a file with all email addresses with a break line.
        await fileUtils.appendFile({
            targetPath: this.file.distFinalListViewTXTFile.filePath,
            message: textUtils.breakLine(textUtils.sortAlphabetical(emailAddressesList))
        });
        await this.file.distFinalListViewTXTFile.calculateFileSize();
        this.file.distFinalListViewTXTFile.fileEmailAddressesCount = emailAddressesList.length;
    }

    setMergeResults(data) {
        const { roundMergeResults, currentRoundNumber } = data;
        const { newTXTFilesCount, emailAddressesCount, duplicateEmailAddressesCount, emailAddressesCountLimit } = roundMergeResults;
        this.file.createMergeData({
            mergeRoundNumber: currentRoundNumber,
            mergeRoundTXTFilesCount: newTXTFilesCount,
            mergeRoundEmailAddressesCount: emailAddressesCount,
            mergeRoundDuplicateEmailAddressesCount: duplicateEmailAddressesCount,
            mergeRoundEmailAddressesLimitCount: emailAddressesCountLimit
        });
    }

    async mergeTXTFiles(data) {
        const { currentRoundNumber, currentTXTFilesCount } = data;
        let emailAddressesList = new Set();
        let newTXTFilesCount = 0;
        let duplicateEmailAddressesCount = 0;
        let emailAddressesCount = 0;
        for (let i = 0; i < currentTXTFilesCount + 1; i++) {
            let currentEmailAddressesList = await emailUtils.getEmailAddressesFromFile(this.file.createTemporaryFilePath({
                roundNumber: currentRoundNumber,
                index: i
            }));
            duplicateEmailAddressesCount += textUtils.countDuplicateStrings(currentEmailAddressesList);
            emailAddressesList = new Set([...emailAddressesList, ...currentEmailAddressesList]);
            currentEmailAddressesList.length = 0;
            emailAddressesCount = emailAddressesList.size;
            if (emailAddressesList.size >= this.emailAddressesMergeLimitCount) {
                const createMergeFileResults = await this.createMergeFile({
                    emailAddressesList: emailAddressesList,
                    currentRoundNumber: currentRoundNumber,
                    newTXTFilesCount: newTXTFilesCount
                });
                emailAddressesList = createMergeFileResults.emailAddressesList;
                newTXTFilesCount = createMergeFileResults.newTXTFilesCount;
            }
            this.logProgress({
                currentRoundNumber: currentRoundNumber,
                currentTXTFilesCount: currentTXTFilesCount,
                emailAddressesCount: emailAddressesCount,
                duplicateEmailAddressesCount: duplicateEmailAddressesCount
            });
        }
        if (emailAddressesList.size > 0) {
            emailAddressesCount = emailAddressesList.size;
            const createMergeFileResults = await this.createMergeFile({
                emailAddressesList: emailAddressesList,
                currentRoundNumber: currentRoundNumber,
                newTXTFilesCount: newTXTFilesCount
            });
            emailAddressesList = createMergeFileResults.emailAddressesList;
            newTXTFilesCount = createMergeFileResults.newTXTFilesCount;
            this.logProgress({
                currentRoundNumber: currentRoundNumber,
                currentTXTFilesCount: currentTXTFilesCount,
                emailAddressesCount: emailAddressesCount,
                duplicateEmailAddressesCount: duplicateEmailAddressesCount
            });
        }
        logUtils.logNewLine();
        return {
            newTXTFilesCount: newTXTFilesCount,
            emailAddressesCount: emailAddressesCount,
            duplicateEmailAddressesCount: duplicateEmailAddressesCount,
            emailAddressesCountLimit: this.emailAddressesMergeLimitCount
        };
    }

    async createMergeFile(data) {
        const { emailAddressesList, currentRoundNumber } = data;
        let { newTXTFilesCount } = data;
        await this.appendEmailAddressesToTXTFile({
            emailAddressesList: [...emailAddressesList],
            currentRoundNumber: currentRoundNumber + 1,
            newTXTFilesCount: newTXTFilesCount + 1
        });
        emailAddressesList.clear();
        newTXTFilesCount++;
        return {
            newTXTFilesCount: newTXTFilesCount,
            emailAddressesList: emailAddressesList
        };
    }

    async appendEmailAddressesToTXTFile(data) {
        const { emailAddressesList, currentRoundNumber, newTXTFilesCount } = data;
        this.finalRoundNumber = currentRoundNumber;
        this.finalTXTFilesCount = newTXTFilesCount;
        await fileUtils.appendFile({
            targetPath: this.file.createTemporaryFilePath({
                roundNumber: currentRoundNumber,
                index: newTXTFilesCount
            }),
            message: textUtils.sortAlphabetical(emailAddressesList).join(',')
        });
    }

    logProgress(data) {
        const { currentRoundNumber, currentTXTFilesCount, emailAddressesCount, duplicateEmailAddressesCount } = data;
        // Log the progress.
        logUtils.logProgress({
            progressData: {
                'Round': currentRoundNumber + 1,
                'TXT files': currentTXTFilesCount,
                'Email addresses': emailAddressesCount,
                'Duplicate email addresses': duplicateEmailAddressesCount,
                'Email addresses limit': this.emailAddressesMergeLimitCount
            },
            percentage: null
        });
    }

    validateMergeRoundResults(mergeRound) {
        // Validate all merge rounds parameters.
        const { mergeRoundNumber, mergeRoundEmailAddressesLimitCount } = mergeRound;
        if (!validationUtils.isPositiveNumber(mergeRoundNumber)) {
            throw new Error(`Invalid or no mergeRoundNumber was found: ${mergeRoundNumber} (1000044)`);
        }
        if (!validationUtils.isPositiveNumber(mergeRoundEmailAddressesLimitCount)) {
            throw new Error(`Invalid or no mergeRoundEmailAddressesLimitCount was found: ${mergeRoundEmailAddressesLimitCount} (1000045)`);
        }
    }

    validateMergeResults() {
        logUtils.logStatus('Validating merge results.');
        const { mergeRounds } = this.file.mergeData;
        // Validate at least 1 merge round item.
        if (!validationUtils.isExists(mergeRounds)) {
            throw new Error(`Invalid or no mergeRounds was found: ${mergeRounds} (1000046)`);
        }
        if (!validationUtils.isPositiveNumber(mergeRounds.length)) {
            throw new Error('At least 1 merge round required (1000047)');
        }
        for (let i = 0, length = mergeRounds.length; i < length; i++) {
            this.validateMergeRoundResults(mergeRounds[i]);
        }
    }
}

module.exports = MergeService;