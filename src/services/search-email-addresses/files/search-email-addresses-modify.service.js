const { logUtils } = require('../../../utils');

class SearchEmailAddressesModifyService {

    constructor(data) {
        const { searchProcess } = data;
        this.searchProcess = searchProcess;
    }

    async initiateModify() {
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

module.exports = SearchEmailAddressesModifyService;