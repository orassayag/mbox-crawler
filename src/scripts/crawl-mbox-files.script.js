require('../services/global/setup.service');
const CrawlMBOXFilesLogic = require('../logics/crawl-mbox-files.logic');

(async () => {
    await new CrawlMBOXFilesLogic().run();
})();