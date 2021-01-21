const regexUtils = require('../files/regex.utils');
const validationUtils = require('../files/validation.utils');

class TextUtils {

    constructor() {
        this.bytes = 1024;
        this.sizesList = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    }

    // This method fetch for all email addresses within given text data.
    getEmailAddresses(data) {
        if (!validationUtils.isExists(data)) {
            return [];
        }
        return data.toString().match(regexUtils.emailAddressesRegex);
    }

    // This method convert a given number to display comma number.
    getNumberWithCommas(number) {
        if (!validationUtils.isValidNumber(number)) {
            return '';
        }
        return number.toString().replace(regexUtils.numberCommasRegex, ',');
    }

    // This method convert bytes number to megabyte display number.
    getFileSizeDisplay(bytes) {
        if (!validationUtils.isValidNumber(bytes)) {
            return null;
        }
        if (bytes === 0) {
            return '0 Bytes';
        }
        const i = Math.floor(Math.log(bytes) / Math.log(this.bytes));
        const result = `${parseFloat((bytes / Math.pow(this.bytes, i)).toFixed(2))}${this.sizesList[i]}`;
        return `${result} (${this.getNumberWithCommas(bytes)} Bytes)`;
    }

    // This method creates a file name.
    createFileName(data) {
        const { fileName, fileKeyName, fileTXTName, isMBOX } = data;
        if (!fileName) {
            return '';
        }
        return `${fileName}${fileKeyName ? `_${fileKeyName}` : ''}${fileTXTName !== null ? `_${fileTXTName}` : ''}${isMBOX ? '' : '.txt'}`;
    }

    removeLastCharacters(data) {
        const { value, charactersCount } = data;
        if (!value || !validationUtils.isValidNumber(charactersCount)) {
            return '';
        }
        return value.substring(0, value.length - charactersCount);
    }

    // This method add leading 0 if needed.
    addLeadingZero(number) {
        if (!validationUtils.isValidNumber(number)) {
            return '';
        }
        return number < 10 ? `0${number}` : number;
    }

    verifyCharactersLength(data) {
        const { value, maximumCharactersLength } = data;
        if (!value || !validationUtils.isValidNumber(maximumCharactersLength)) {
            return '';
        }
        return value.length > maximumCharactersLength ? value.substring(0, maximumCharactersLength) : value;
    }

    setLogStatus(status) {
        if (!status) {
            return '';
        }
        return `===${status}===`;
    }

    countDuplicateStrings(list) {
        if (!validationUtils.isExists(list)) {
            return 0;
        }
        return list.filter((item, index) => list.indexOf(item) != index).length;
    }

    calculateParentageDisplay(data) {
        const { partialValue, totalValue } = data;
        if (!validationUtils.isValidNumber(partialValue) || !validationUtils.isValidNumber(totalValue)) {
            return '';
        }
        return `${this.addLeadingZero(((100 * partialValue) / totalValue).toFixed(2))}%`;
    }

    sortAlphabetical(list) {
        if (!validationUtils.isExists(list)) {
            return [];
        }
        return list.sort((a, b) => {
            const nameA = a.toLowerCase(),
                nameB = b.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    breakLine(message) {
        if (!message) {
            return null;
        }
        return message.join(',\n');
    }

    getPositiveNumber(number) {
        if (!validationUtils.isValidNumber(number)) {
            return -1;
        }
        return Math.abs(number);
    }

    getFloorNumber(number) {
        if (!validationUtils.isValidNumber(number)) {
            return -1;
        }
        return Math.floor(number);
    }

    getFloorPositiveNumber(number) {
        return this.addLeadingZero(this.getFloorNumber(number));
    }

    getSumProperty(data) {
        const { key, list } = data;
        if (!key || !validationUtils.isExists(list)) {
            return 0;
        }
        return list.reduce((a, b) => a + (b[key] || 0), 0);
    }

    toLowerCase(text) {
        if (!text) {
            return '';
        }
        return text.toLowerCase();
    }

    removeAllCharacters(text, target) {
        if (!text) {
            return '';
        }
        return text.split(target).join('');
    }

    addBackslash(text) {
        if (!text) {
            return '';
        }
        return `${text}/`;
    }

    getBackupName(data) {
        const { applicationName, date, title, index } = data;
        return `${applicationName}_${date}-${(index + 1)}${title ? `-${title}` : ''}`;
    }

    validateEmailAddress(emailAddress) {
        return regexUtils.validateEmailAddressRegex.test(emailAddress);
    }
}

module.exports = new TextUtils();