const { logUtils, sourceUtils, textUtils } = require('../../../utils');

/* -On the searchPage process decide if to skip or not, on this page, according to the characters length.
-Add delay between each crawl of pages.
-Set timeout time in milliseconds for the request.
-Set maximum fetched email addresses count limit and check it.
-Set maximum list email addresses count limit and check it.
-Verify that the result characters not exceeded the maximum limit.
-Use the built method to concat string arrays.
-On test mode: Just load random data from all the page source TXT file exists.
-Off test mode: Build logic with Puppeteer.js to scan page for email addresses.
-Log: Process number / index processes, search engine type, search key, page number / page indexes, the total email addresses count fetched.
-In both cases, return a list of email addresses.
-Try catch on all. */


/*     // ===COUNTS & LIMITS=== //
    MAXIMUM_SOURCE_LENGTH: 2000000,
    MAXIMUM_CRAWL_EMAIL_ADDRESSES_PER_PAGE_COUNT: 50000,
    MAXIMUM_SEARCH_PROCESS_EMAIL_ADDRESSES_COUNT: 500000, */

class SearchEmailAddressesSearchPageService {

    constructor(data) {
        const { pageURL, maximumSourceLength, maximumCrawlEmailAddressesPerPageCount } = data;
        this.pageURL = pageURL;
        this.maximumSourceLength = maximumSourceLength;
        this.maximumCrawlEmailAddressesPerPageCount = maximumCrawlEmailAddressesPerPageCount;
/*         this.maximumCrawlLinksPerPageCount = maximumCrawlLinksPerPageCount;
        this.minimumCrawlLinksPerPageCount = minimumCrawlLinksPerPageCount;
        this.maximumSearchProcessLinksCount = maximumSearchProcessLinksCount; */
    }

    async initiateSearchPage() {
        // Get the page source.
        const pageSource = await sourceUtils.getPageSource(this.pageURL);
        // Validate the page source.
        const skipPageReason = this.validateEngineSource(pageSource);

        return {
            skipPageReason: skipPageReason
        };
    }

    validateEngineSource(pageSource) {
        logUtils.logStatus('Validating page source.');
        let skipPageReason = null;

        // Validate number of characters length.
        if (pageSource.length > this.maximumSourceLength) {
            skipPageReason = 'MAXIMUM_SOURCE_LENGTH';
        }

        let emailAddressesList = [];
        if (!skipPageReason) {
            emailAddressesList = textUtils.getEmailAddresses(pageSource);
            if (emailAddressesList.length > this.maximumCrawlEmailAddressesPerPageCount) {
                skipPageReason = 'MAXIMUM_CRAWL_EMAIL_ADDRESSES_PER_PAGE_COUNT';
            }
        }

        if (!skipPageReason) {
            const searchEnginePageData = this.searchProcess.getOrCreateSearchEnginePageData();
            searchEnginePageData.searchEngineData.allLinksList = emailAddressesList;
            this.searchProcess.updateSearchEnginePageData(searchEnginePageData);

            // Validate maximum links per process count.
            if (searchEnginePageData.searchEngineData.allLinksList.length > this.maximumSearchProcessLinksCount) {
                skipPageReason = 'MAXIMUM_SEARCH_PROCESS_LINKS_COUNT';
            }
        }
        return skipPageReason;
    }
}

module.exports = SearchEmailAddressesSearchPageService;

/* const { logUtils, sourceUtils, textUtils } = require('../../../utils');

class SearchEmailAddressesSearchEngineService {

    constructor(data) {
        const { searchProcess, maximumSourceLength, maximumCrawlLinksPerPageCount,
                minimumCrawlLinksPerPageCount, maximumSearchProcessLinksCount } = data;
        this.searchProcess = searchProcess;
        this.maximumSourceLength = maximumSourceLength;
        this.maximumCrawlLinksPerPageCount = maximumCrawlLinksPerPageCount;
        this.minimumCrawlLinksPerPageCount = minimumCrawlLinksPerPageCount;
        this.maximumSearchProcessLinksCount = maximumSearchProcessLinksCount;
    }

    async initiateSearchEngine() {
        // Get the search engine page source.
        const searchEngineSource = await sourceUtils.getSearchEnginePageSource(this.searchProcess);
        // Validate the search engine page source.
        const breakProcessReason = this.validateEngineSource(searchEngineSource);
        // Log the progress.
        this.logProgress();

        return {
            breakProcessReason: breakProcessReason,
            searchProcess: this.searchProcess
        };
    }

    validateEngineSource(searchEngineSource) {
        logUtils.logStatus('Validating engine page source.');
        let breakProcessReason = null;

        // Validate number of characters length.
        if (searchEngineSource.length > this.maximumSourceLength) {
            breakProcessReason = 'MAXIMUM_SOURCE_LENGTH';
        }

        let URLsList = [];
        if (!breakProcessReason) {
            URLsList = textUtils.getURLAddresses(searchEngineSource);
            // Validate minimum links count fetched.
            if (URLsList.length < this.minimumCrawlLinksPerPageCount) {
                breakProcessReason = 'MINIMUM_CRAWL_LINKS_PER_PAGE_COUNT';
            }
        }

        // Validate maximum links count fetched.
        if (!breakProcessReason) {
            if (URLsList.length > this.maximumCrawlLinksPerPageCount) {
                breakProcessReason = 'MAXIMUM_CRAWL_LINKS_PER_PAGE_COUNT';
            }
        }

        const searchEnginePageData = this.searchProcess.getOrCreateSearchEnginePageData();
        searchEnginePageData.searchEngineData.allLinksList = URLsList;
        this.searchProcess.updateSearchEnginePageData(searchEnginePageData);

        // Validate maximum links per process count.
        if (searchEnginePageData.searchEngineData.allLinksList.length > this.maximumSearchProcessLinksCount) {
            breakProcessReason = 'MAXIMUM_SEARCH_PROCESS_LINKS_COUNT';
        }
        return breakProcessReason;
    }

    logProgress() {
        const searchEnginePageData = this.searchProcess.getOrCreateSearchEnginePageData();
        logUtils.logProgress({
            progressData: {
                'Total links': textUtils.getNumberWithCommas(searchEnginePageData.searchEngineData.allLinksList.length)
            },
            percentage: null
        });
    }
}

module.exports = SearchEmailAddressesSearchEngineService; */