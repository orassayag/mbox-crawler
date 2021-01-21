const checkDiskSpace = require('check-disk-space');
const pathUtils = require('../files/path.utils');
const validationUtils = require('../files/validation.utils');

class SystemUtils {

    constructor() { }

    async validateFreeSpace(fileSize) {
        if (!validationUtils.isValidNumber(fileSize)) {
            return;
        }
        const fileOSRoot = pathUtils.getRootPath();
        const diskSizes = await new Promise(resolve => {
            checkDiskSpace(fileOSRoot).then((diskSpace) => {
                resolve(diskSpace);
            });
        });
        if ((diskSizes.free + (fileSize % 0.01)) > diskSizes.size) {
            throw new Error('Not enough space to preform the process (1000077)');
        }
    }
}

module.exports = new SystemUtils();