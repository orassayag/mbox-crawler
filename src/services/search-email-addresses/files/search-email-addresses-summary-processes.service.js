const { logUtils } = require('../../../utils');

/*
-The format name of the file {DIST_SUMMARY_FILE_NAME}_{process_number}_{today_date}_{milliseconds}.txt
Total Processes Count:
Total Pages Count:
Start Time: 11/01/2020 09:30:02
End Time: 11/01/2020 09:35:54

Total Final Email Addresses List 45
Total Invalid Email Addresses Count: 4
Total Fixed Domain Email Addresses Count: 45
Total Fixed Other Mistakes Email Addresses Count: 45
Total Duplicate Email Addresses Count: 45
Total New Email Addresses Count: 45
Total Exists Email Addresses Count: 45
Total All Email Addresses Count: 45
Total Final Links Count: 120
Total All Links Count: 120
Total Filtered Links Count: 120
Total Skipped Links Count: 2
Total Duplicates Links Count: 4
*/

class SearchEmailAddressesSummaryProcessesService {

    constructor(data) {
        const { searchProcess } = data;
        this.searchProcess = searchProcess;
    }

    async initiateSummaryProcesses() {
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

module.exports = SearchEmailAddressesSummaryProcessesService;