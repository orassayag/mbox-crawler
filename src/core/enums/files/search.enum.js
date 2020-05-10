const enumUtils = require('../enum.utils');

// ToDo: Insert place holders here.
const SearchEngineType = enumUtils.createEnum([
    ['bing', 'https://www.bing.com/']
]);

const SourceType = enumUtils.createEnum([
    ['ENGINE', 'engine'],
    ['PAGE', 'page']
]);

module.exports = { SearchEngineType, SourceType };