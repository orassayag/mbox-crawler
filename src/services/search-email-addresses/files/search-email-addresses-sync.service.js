const { logUtils } = require('../../../utils');

class SearchEmailAddressesSyncService {

    constructor(data) {
        const { searchProcess } = data;
        this.searchProcess = searchProcess;
    }

    async initiateSync() {
        return this.searchProcess;
    }

    logProgress(data) {
        const { d } = data;
        if (d) {}
        // Log the progress.
        logUtils.logProgress({
            progressData: {
                'Process': '',
                'Search Engine': '',
                'Search Key': '',
                'Page': ''
            },
            percentage: null
        });
    }
}

module.exports = SearchEmailAddressesSyncService;