const fileUtils = require('./file.utils');
const validationUtils = require('./validation.utils');

class EmailUtils {

    constructor() { }

    async getEmailAddressesFromFile(targetPath) {
        if (!targetPath) {
            return [];
        }
        let emailAddressesList = [];
        const fileEmailAddressesList = await fileUtils.readFileIfExists(targetPath);
        if (validationUtils.isExists(fileEmailAddressesList)) {
            emailAddressesList = fileEmailAddressesList.split(',');
        }
        return emailAddressesList;
    }
}

module.exports = new EmailUtils();