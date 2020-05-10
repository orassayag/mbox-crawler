const { logUtils, textUtils, fileUtils, systemUtils, emailUtils, validationUtils } = require('../../../utils');

class CrawlMBOXFilesValidateService {

    constructor(data) {
        const { file, secondsDelayBetweenValidations, maximumEmailCharactersLength } = data;
        this.file = file;
        this.secondsDelayBetweenValidations = secondsDelayBetweenValidations;
        this.maximumEmailCharactersLength = maximumEmailCharactersLength;
        this.validEmailAddressesList = [];
        this.invalidEmailAddressesList = [];
    }

    async initiateValidate() {
        await this.validateAllEmailAddresses();
        this.validEmailAddressesList = textUtils.sortAlphabetical(this.validEmailAddressesList);
        this.invalidEmailAddressesList = textUtils.sortAlphabetical(this.invalidEmailAddressesList);
        await this.appendFiles();
        logUtils.logNewLine();
        this.validateValidationResults();
        return this.file;
    }

    // ToDo: Check if this is working with appropriate internet connection.
    /*     async appendEmailAddress(data) {
            const { file, emailAddressesList } = data;
            await fileUtils.appendFile({
                targetPath: file.filePath,
                message: textUtils.breakLine(emailAddressesList)
            });
            await file.calculateFileSize();
            file.fileEmailAddressesCount = emailAddressesList.length;
        }
    
        async appendFiles() {
            // Valid email addresses.
            await this.appendEmailAddress({
                file: this.file.distFinalValidTXTFile,
                emailAddressesList: this.validEmailAddressesList
            });
    
            // Invalid email addresses.
            await this.appendEmailAddress({
                file: this.file.distFinalInvalidTXTFile,
                emailAddressesList: this.invalidEmailAddressesList
            });
        } */

    // ToDo: Find a way to merge into one method, this is duplicate logic (already built, check it).
    async appendFiles() {
        // Valid email addresses.
        await fileUtils.appendFile({
            targetPath: this.file.distFinalValidTXTFile.filePath,
            message: textUtils.breakLine(this.validEmailAddressesList)
        });
        await this.file.distFinalValidTXTFile.calculateFileSize();
        this.file.distFinalValidTXTFile.fileEmailAddressesCount = this.validEmailAddressesList.length;

        // Invalid email addresses.
        await fileUtils.appendFile({
            targetPath: this.file.distFinalInvalidTXTFile.filePath,
            message: textUtils.breakLine(this.invalidEmailAddressesList)
        });
        await this.file.distFinalInvalidTXTFile.calculateFileSize();
        this.file.distFinalInvalidTXTFile.fileEmailAddressesCount = this.invalidEmailAddressesList.length;
    }

    async validateAllEmailAddresses() {
        const emailAddressesList = await emailUtils.getEmailAddressesFromFile(this.file.distFinalMergeViewTXTFile.filePath);
        for (let i = 0, length = emailAddressesList.length; i < length; i++) {
            await systemUtils.sleep(this.secondsDelayBetweenValidations);
            await this.validateEmailAddress(i + 1, emailAddressesList[i], emailAddressesList.length);
        }
    }

    async validateEmailAddress(index, emailAddress, totalEmailAddressesCount) {
        let isValid = true;
        const emailAddresses = textUtils.getEmailAddresses(emailAddress);
        if (!validationUtils.isExists(emailAddresses)) {
            isValid = false;
        }

        if (isValid) {
            isValid = await emailUtils.validateServerEmailAddressFree(emailAddress);
        }

        if (isValid) {
            this.validEmailAddressesList.push(emailAddress);
        }
        else {
            this.invalidEmailAddressesList.push(emailAddress);
        }

        // Log the progress.
        logUtils.logSpace();
        logUtils.logProgress({
            progressData: {
                'Index': `${textUtils.getNumberWithCommas(index)}/${textUtils.getNumberWithCommas(totalEmailAddressesCount)}`,
                'Email': textUtils.verifyCharactersLength({
                    value: emailAddress,
                    maximumCharactersLength: this.maximumEmailCharactersLength
                }),
                'Valid': isValid ? 'Yes' : 'No',
                'Valid email addresses': this.validEmailAddressesList.length,
                'Invalid email addresses': this.invalidEmailAddressesList.length
            },
            percentage: textUtils.calculateParentageDisplay({
                partialValue: index,
                totalValue: totalEmailAddressesCount
            })
        });
    }

    validateValidationResults() {
        logUtils.logStatus('Validating validation results.');
        if (!validationUtils.isExists(this.validEmailAddressesList) && !validationUtils.isExists(this.invalidEmailAddressesList)) {
            const title = 'At least 1 valid / invalid email address required in the validation step (1000078)';
            logUtils.logStatus(`${title}:`, [...this.validEmailAddressesList, ...this.invalidEmailAddressesList]);
            throw new Error(title);
        }
    }
}

module.exports = CrawlMBOXFilesValidateService;