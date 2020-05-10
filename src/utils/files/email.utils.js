const request = require('request');
const crawlMBOXFilesSettings = require('../../settings/crawl-mbox-files.settings');
const fileUtils = require('../files/file.utils');
const validationUtils = require('../files/validation.utils');

class EmailUtils {

    constructor() { }

    async validateServerEmailAddressFree(emailAddress) {
        return new Promise(resolve => {
            if (!emailAddress) {
                resolve(false);
            }

            try {
                request({
                    url: crawlMBOXFilesSettings.EMAIL_VALIDATION_URL,
                    method: 'POST',
                    form: { email: emailAddress },
                    json: true
                }, (error, response, body) => {
                    if (response) { }
                    if (error) {
                        resolve(false);
                    }
                    else if (!body) {
                        resolve(false);
                    }
                    else if (!body.valid) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            catch (error) {
                resolve(false);
            }
        });
    }

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

const emailUtils = new EmailUtils();
module.exports = emailUtils;