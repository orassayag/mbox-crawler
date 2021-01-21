const { logUtils } = require('../../utils');

class PostProcessService {

    constructor(data) {
        const { file, currentFileProcessIndex, totalFilesProcessCount } = data;
        this.file = file;
        this.currentFileProcessIndex = currentFileProcessIndex;
        this.totalFilesProcessCount = totalFilesProcessCount;
    }

    initiatePostProcess() {
        logUtils.logColorStatus({
            status: `FILE: ${this.file.sourceMBOXFile.fileNameDisplay} - PROCESS END (${this.currentFileProcessIndex + 1}/${this.totalFilesProcessCount})`,
            color: 'Yellow'
        });
        return this.file;
    }
}

module.exports = PostProcessService;