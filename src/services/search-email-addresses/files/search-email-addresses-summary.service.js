const { logUtils } = require('../../../utils');
/*
-SHORT MODE:
-The format name of the file {DIST_SUMMARY_FILE_NAME}_{process_number}_{today_date}_{milliseconds}.txt
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

-NORMAL MODE:
-The format name of the file {DIST_SUMMARY_FILE_NAME}_{process_number}_{today_date}_{milliseconds}.txt
-The summary TXT file structure (example):
Process: 01/02
Search Key: "Test"
Search Engine: Bing
PagesCount: 3
Start Time: 11/01/2020 09:30:02
End Time: 11/01/2020 09:35:54
Is Test Mode: True
Is Complete Process: True

Final Email Addresses List: (45)
===========================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

Invalid Email Addresses List: (4)
=============================
or1@gmail.com,
or1@gmail.com,
or1@gmail.com,
or1@gmail.com,
or1@gmail.com,
or1@gmail.com,
or1@gmail.com,
or1@gmail.com,

Fixed Domain Email Addresses List: (45)
==================================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

Fixed Other Mistakes Email Addresses List: (45)
==========================================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

Duplicate Email Addresses List: (45)
===============================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

New In DataBase Email Addresses List: (45)
=====================================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

Exists Email Addresses List: (45)
============================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,

All Email Addresses List: (45)
=========================
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com,
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com
or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com, or1@gmail.com

Final Links List: (120)
=================
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd

All Links List: (120)
===============
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd

Filtered Links List: (120)
====================
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd

Skipped Links List: (1):
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd

Duplicate Links List (1):
https://www.bing.com/sdfsdfsd/sdf/sd/fs/df/sd
*/

class SearchEmailAddressesSummaryService {

    constructor(data) {
        const { searchProcess } = data;
        this.searchProcess = searchProcess;
    }

    async initiateSummary() {
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

module.exports = SearchEmailAddressesSummaryService;