class FilterData {

    constructor() {
        // All links which are filtered according to the domain list.
        this.filteredLinksList = [];

        // All links which are exceeded the maximum links or page sources characters length.
        this.skippedLinksList = [];

        // All links which where found duplicated in the scope of the process.
        this.duplicateLinksList = [];

        // All links which are relevant and final to fetch from them email addresses.
        this.finalLinksList = [];
    }
}

module.exports = FilterData;