const Mbox = require('node-mbox');
const LineByLineReader = require('line-by-line');
const fileUtils = require('../files/file.utils');
const { PackageType } = require('../../core/enums/files/system.enum');

class StreamUtils {

    constructor() { }

    async createStream(data) {
        const { packageType, targetPath } = data;
        let stream = null;

        // Check if file path exists.
        await fileUtils.isPathExists(targetPath);

        switch (packageType) {
            case PackageType.LINE_BY_LINE:
                {
                    stream = new LineByLineReader(targetPath);
                    break;
                }
            case PackageType.NODE_MBOX:
                {
                    stream = new Mbox(targetPath, { streaming: true });
                    break;
                }
            default:
                throw new Error(`packageType not exists: ${packageType} (1000017)`);
        }
        return stream;
    }
}

const streamUtils = new StreamUtils();
module.exports = streamUtils;