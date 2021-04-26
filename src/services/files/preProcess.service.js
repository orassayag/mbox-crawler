const { logUtils } = require('../../utils');

class PreProcessService {

    constructor(data) {
        const { file, currentFileProcessModelIndex, totalFilesProcessCount } = data;
        this.file = file;
        this.currentFileProcessModelIndex = currentFileProcessModelIndex;
        this.totalFilesProcessCount = totalFilesProcessCount;
    }

    async initiatePreProcess() {
        logUtils.logColorStatus({
            status: `FILE: ${this.file.sourceMBOXFile.fileNameDisplay} - PROCESS START (${this.currentFileProcessModelIndex + 1}/${this.totalFilesProcessCount})`,
            color: 'Yellow'
        });
        await this.file.startProcess();
        return this.file;
    }
}

module.exports = PreProcessService;