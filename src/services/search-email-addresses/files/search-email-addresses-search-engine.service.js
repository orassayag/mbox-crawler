const { logUtils, sourceUtils, textUtils } = require('../../../utils');

class SearchEmailAddressesSearchEngineService {

    constructor(data) {
        const {
            searchProcess,
            maximumSourceLength,
            maximumCrawlLinksPerPageCount,
            minimumCrawlLinksPerPageCount,
            maximumSearchProcessLinksCount
        } = data;
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

        if (!breakProcessReason) {
            const searchEnginePageData = this.searchProcess.getOrCreateSearchEnginePageData();
            searchEnginePageData.searchEngineData.allLinksList = URLsList;
            this.searchProcess.updateSearchEnginePageData(searchEnginePageData);

            // Validate maximum links per process count.
            if (searchEnginePageData.searchEngineData.allLinksList.length > this.maximumSearchProcessLinksCount) {
                breakProcessReason = 'MAXIMUM_SEARCH_PROCESS_LINKS_COUNT';
            }
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

module.exports = SearchEmailAddressesSearchEngineService;