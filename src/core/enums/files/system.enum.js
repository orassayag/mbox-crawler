const enumUtils = require('../enum.utils');

const PackageType = enumUtils.createEnum([
    ['LINE_BY_LINE', 'line-by-line'],
    ['NODE_MBOX', 'node-mbox']
]);

const ScriptType = enumUtils.createEnum([
    ['BACKUP', 'backup'],
    ['CRAWL', 'crawl']
]);

module.exports = { PackageType, ScriptType };