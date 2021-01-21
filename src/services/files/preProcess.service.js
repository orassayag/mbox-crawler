const { logUtils } = require('../../utils');

class PreProcessService {

    constructor(data) {
        const { file, currentFileProcessIndex, totalFilesProcessCount } = data;
        this.file = file;
        this.currentFileProcessIndex = currentFileProcessIndex;
        this.totalFilesProcessCount = totalFilesProcessCount;
    }

    async initiatePreProcess() {
        logUtils.logColorStatus({
            status: `FILE: ${this.file.sourceMBOXFile.fileNameDisplay} - PROCESS START (${this.currentFileProcessIndex + 1}/${this.totalFilesProcessCount})`,
            color: 'Yellow'
        });
        await this.file.startProcess();
        return this.file;
    }
}

module.exports = PreProcessService;