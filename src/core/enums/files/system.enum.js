const enumUtils = require('../enum.utils');

const ScriptName = enumUtils.createEnum([
    ['CRAWL_MBOX_FILES', 'crawl-mbox-files'],
    ['SEARCH_EMAIL_ADDRESSES', 'search-email-addresses']
]);

// This enum define the possible packages types.
const PackageType = enumUtils.createEnum([
    ['LINE_BY_LINE', 'line-by-line'],
    ['NODE_MBOX', 'node-mbox']
]);

module.exports = { ScriptName, PackageType };