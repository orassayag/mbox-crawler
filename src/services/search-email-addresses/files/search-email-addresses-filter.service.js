const { logUtils, textUtils } = require('../../../utils');
const { URLDomain } = require('../../../core/lists/filterKeys.list');

class SearchEmailAddressesFilterService {

    constructor(data) {
        const { searchProcess } = data;
        this.searchProcess = searchProcess;
    }

    async initiateFilter() {
        // Filter all the links.
        this.filterLinks();
        // Log the progress.
        this.logProgress();

        return {
            searchProcess: this.searchProcess
        };
    }

    filterLinks() {
        logUtils.logStatus('Filtering the engine page source links.');

        const searchEnginePageData = this.searchProcess.getOrCreateSearchEnginePageData();
        const allLinksList = searchEnginePageData.searchEngineData.allLinksList;
        const filteredLinksList = [];
        const duplicateLinksList = [];
        const finalLinksList = [];

        // Loop on all the links and filter.
        for (let i = 0, length = allLinksList.length; i < length; i++) {

            const originalLink = allLinksList[i];

            // Check if the domain is filtered within the domains list.
            if (URLDomain.findIndex(domain => domain === textUtils.getDomainFromURLAddress(originalLink)) > -1) {
                filteredLinksList.push(originalLink);
                continue;
            }

            // Check if it's an duplicate URL within this specific process.
            if (finalLinksList.findIndex(URL => URL === originalLink) > -1) {
                duplicateLinksList.push(originalLink);
                continue;
            }

            // Insert the link to the final URLs list.
            finalLinksList.push(originalLink);
        }

        // Set the engine page data.
        searchEnginePageData.filterData.filteredLinksList = filteredLinksList;
        searchEnginePageData.filterData.duplicateLinksList = duplicateLinksList;
        searchEnginePageData.filterData.finalLinksList = finalLinksList;
        this.searchProcess.updateSearchEnginePageData(searchEnginePageData);
    }

    logProgress() {
        const searchEnginePageData = this.searchProcess.getOrCreateSearchEnginePageData();
        logUtils.logProgress({
            progressData: {
                'Total filtered': textUtils.getNumberWithCommas(searchEnginePageData.filterData.filteredLinksList.length),
                'Total duplicates': textUtils.getNumberWithCommas(searchEnginePageData.filterData.duplicateLinksList.length),
                'Total final': textUtils.getNumberWithCommas(searchEnginePageData.filterData.finalLinksList.length)
            },
            percentage: null
        });
    }
}

module.exports = SearchEmailAddressesFilterService;