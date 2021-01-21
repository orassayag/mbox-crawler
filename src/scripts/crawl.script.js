require('../services/files/initiate.service').initiate('crawl');
const CrawlLogic = require('../logics/crawl.logic');

(async () => {
    await new CrawlLogic().run();
})();