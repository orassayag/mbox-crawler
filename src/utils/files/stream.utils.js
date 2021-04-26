const Mbox = require('node-mbox');
const LineByLineReader = require('line-by-line');
const { PackageTypeEnum } = require('../../core/enums');
const fileUtils = require('./file.utils');

class StreamUtils {

    constructor() { }

    async createStream(data) {
        const { packageType, targetPath } = data;
        let stream = null;
        // Check if the file path exists.
        await fileUtils.isPathExists(targetPath);
        switch (packageType) {
            case PackageTypeEnum.LINE_BY_LINE: {
                stream = new LineByLineReader(targetPath);
                break;
            }
            case PackageTypeEnum.NODE_MBOX: {
                stream = new Mbox(targetPath, { streaming: true });
                break;
            }
            default: {
                throw new Error(`packageType not exists: ${packageType} (1000076)`);
            }
        }
        return stream;
    }
}

module.exports = new StreamUtils();