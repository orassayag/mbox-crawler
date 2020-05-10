const checkDiskSpace = require('check-disk-space');
const pathUtils = require('../files/path.utils');
const validationUtils = require('../files/validation.utils');

class SystemUtils {

    constructor() { }

    async sleep(secondsCount) {
        if (!validationUtils.isValidNumber(secondsCount)) {
            return;
        }
        return new Promise(resolve => setTimeout(resolve, secondsCount * 1000));
    }

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
            throw new Error('Not enough space to preform the process (1000045)');
        }
    }
}

const systemUtils = new SystemUtils();
module.exports = systemUtils;