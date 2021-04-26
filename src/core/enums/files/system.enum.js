const enumUtils = require('../enum.utils');

const PackageTypeEnum = enumUtils.createEnum([
    ['LINE_BY_LINE', 'line-by-line'],
    ['NODE_MBOX', 'node-mbox']
]);

const ScriptTypeEnum = enumUtils.createEnum([
    ['BACKUP', 'backup'],
    ['CRAWL', 'crawl']
]);

module.exports = { PackageTypeEnum, ScriptTypeEnum };