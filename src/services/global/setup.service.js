const { logUtils } = require('../../utils');

class SetupService {

    constructor() {
        // Handle any uncaughtException error.
        process.on('uncaughtException', (error) => {
            logUtils.logSpace();
            logUtils.log(error);
        });

        // Handle any unhandledRejection promise error.
        process.on('unhandledRejection', (reason, promise) => {
            logUtils.logSpace();
            logUtils.log(reason);
            logUtils.log(promise);
        });
    }
}

const setupService = new SetupService();
module.exports = setupService;