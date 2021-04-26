const { logUtils } = require('../../utils');

class PostProcessService {

    constructor(data) {
        const { file, currentFileProcessModelIndex, totalFilesProcessCount } = data;
        this.file = file;
        this.currentFileProcessModelIndex = currentFileProcessModelIndex;
        this.totalFilesProcessCount = totalFilesProcessCount;
    }

    initiatePostProcess() {
        logUtils.logColorStatus({
            status: `FILE: ${this.file.sourceMBOXFile.fileNameDisplay} - PROCESS END (${this.currentFileProcessModelIndex + 1}/${this.totalFilesProcessCount})`,
            color: 'Yellow'
        });
        return this.file;
    }
}

module.exports = PostProcessService;