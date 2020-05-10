const { textUtils, logUtils, validationUtils } = require('../../../utils');
const { want, profession, city, email } = require('../../../core/lists/searchKeys.list');
const SearchProcess = require('../../../core/models/search-email-addresses/files/SearchProcess');

class SearchEmailAddressesPreProcessService {

    constructor(data) {
        const { searchProcessIndex, searchProcessesCount, searchEngineType, searchKeys, maximumRetriesGenerateSearchKeyCount } = data;
        this.searchProcessIndex = searchProcessIndex;
        this.searchProcessesCount = searchProcessesCount;
        this.searchEngineType = searchEngineType;
        this.searchKeys = searchKeys;
        this.maximumRetriesGenerateSearchKeyCount = maximumRetriesGenerateSearchKeyCount;
    }

    async initiatePreProcess() {
        // Generate the search key.
        const { searchKey, searchKeyDisplay } = this.generateSearchKey();

        // Create the search process object.
        const searchProcess = new SearchProcess({
            searchProcessIndex: this.searchProcessIndex,
            searchProcessPageIndex: 0,
            searchEngineType: this.searchEngineType,
            searchKey: searchKey,
            searchKeyDisplay: searchKeyDisplay
        });

        this.logProgress(searchProcess);

        return {
            searchProcess: searchProcess,
            searchKeys: this.searchKeys
        };
    }

    generateSearchKey() {
        let searchKeyGenerateRetriesCount = 0;

        // Generate the search key.
        const generateKey = () => {
            let searchKey = '';
            [want, profession, city, email].map(l => {
                searchKey += `${textUtils.getRandomKeyFromArray(l)} `;
            });
            searchKey = textUtils.removeLastCharacters({
                value: searchKey,
                charactersCount: 1
            });
            return searchKey;
        };

        let resultSearchKey = '';

        // Check if the search key doesn't already exists in the previous search processes.
        while (searchKeyGenerateRetriesCount < this.maximumRetriesGenerateSearchKeyCount) {
            resultSearchKey = generateKey();
            searchKeyGenerateRetriesCount++;

            if (this.searchKeys.indexOf(resultSearchKey) === -1) {
                break;
            }
        }

        if (searchKeyGenerateRetriesCount >= this.maximumRetriesGenerateSearchKeyCount) {
            throw new Error('Maximum generated search keys exceeded the limit (1000115)');
        }

        // Generate the search key for display by reverse only the UTF-8 keys.
        const generateKeyDisplay = (searchKey) => {
            let searchKeyDisplay = '';
            const englishKeys = [];
            const hebrewKeys = [];
            searchKey.split(' ').map(key => {
                if (textUtils.isEnglishKey(key)) {
                    englishKeys.push(key);
                } else {
                    hebrewKeys.push(key.split('').reverse().join(''));
                }
            });
            searchKeyDisplay = `${validationUtils.isExists(englishKeys) ? `${englishKeys.join(' ')}` : ''} ${hebrewKeys.reverse().join(' ')}`.trim();
            return searchKeyDisplay;
        };

        let resultSearchKeyDisplay = generateKeyDisplay(resultSearchKey);

        return {
            searchKey: resultSearchKey,
            searchKeyDisplay: resultSearchKeyDisplay
        };
    }

    logProgress(searchProcess) {
        const { searchEngineType, searchKeyDisplay } = searchProcess;
        logUtils.logProgress({
            progressData: {
                'Search process': `${textUtils.getNumberWithCommas(this.searchProcessIndex + 1)}/${textUtils.getNumberWithCommas(this.searchProcessesCount)}`,
                'Search engine': searchEngineType,
                'Search key': searchKeyDisplay
            },
            percentage: null
        });
    }
}

module.exports = SearchEmailAddressesPreProcessService;