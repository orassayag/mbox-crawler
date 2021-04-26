const globalUtils = require('../../utils/files/global.utils');
const { emailUtils, fileUtils, logUtils, textUtils, validationUtils } = require('../../utils');

class ValidateService {

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

    async appendFiles() {
        // Valid email addresses.
        await fileUtils.appendFile({
            targetPath: this.file.distFinalValidTXTFile.filePath,
            message: validationUtils.isExists(this.validEmailAddressesList) ? textUtils.breakLine(this.validEmailAddressesList) : ' '
        });
        await this.file.distFinalValidTXTFile.calculateFileSize();
        this.file.distFinalValidTXTFile.fileEmailAddressesCount = this.validEmailAddressesList.length;
        // Invalid email addresses.
        await fileUtils.appendFile({
            targetPath: this.file.distFinalInvalidTXTFile.filePath,
            message: validationUtils.isExists(this.invalidEmailAddressesList) ? textUtils.breakLine(this.invalidEmailAddressesList) : ' '
        });
        await this.file.distFinalInvalidTXTFile.calculateFileSize();
        this.file.distFinalInvalidTXTFile.fileEmailAddressesCount = this.invalidEmailAddressesList.length;
    }

    async validateAllEmailAddresses() {
        const emailAddressesList = await emailUtils.getEmailAddressesFromFile(this.file.distFinalMergeViewTXTFile.filePath);
        for (let i = 0, length = emailAddressesList.length; i < length; i++) {
            await globalUtils.sleep(this.secondsDelayBetweenValidations);
            this.validateEmailAddress(i + 1, emailAddressesList[i], emailAddressesList.length);
        }
    }

    validateEmailAddress(index, emailAddress, totalEmailAddressesCount) {
        let isValid = true;
        const emailAddresses = textUtils.getEmailAddresses(emailAddress);
        if (!validationUtils.isExists(emailAddresses)) {
            isValid = false;
        }
        if (isValid) {
            isValid = textUtils.validateEmailAddress(emailAddress);
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
            percentage: textUtils.calculatePercentageDisplay({
                partialValue: index,
                totalValue: totalEmailAddressesCount
            })
        });
    }

    validateValidationResults() {
        logUtils.logStatus('Validating validation results.');
        if (!validationUtils.isExists(this.validEmailAddressesList) && !validationUtils.isExists(this.invalidEmailAddressesList)) {
            const title = 'At least 1 valid / invalid email address required in the validation step (1000057)';
            logUtils.logStatus(`${title}:`, [...this.validEmailAddressesList, ...this.invalidEmailAddressesList]);
            throw new Error(title);
        }
    }
}

module.exports = ValidateService;