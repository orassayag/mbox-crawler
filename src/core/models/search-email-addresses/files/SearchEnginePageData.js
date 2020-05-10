const FilterData = require('./FilterData');
const ModifyData = require('./ModifyData');
const SearchEngineData = require('./SearchEngineData');
const SearchPageData = require('./SearchPageData');
const SyncData = require('./SyncData');

class SearchEnginePageData {

    constructor() {
        this.filterData = new FilterData();
        this.modifyData = new ModifyData();
        this.searchEngineData = new SearchEngineData();
        this.searchPageData = new SearchPageData();
        this.syncData = new SyncData();
    }
}

module.exports = SearchEnginePageData;