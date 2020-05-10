class CrawlData {

    constructor(crawlData) {
        const { crawlLinesCount, crawlEmailAddressesCount, crawlTXTFilesCount } = crawlData;
        this.crawlLinesCount = crawlLinesCount;
        this.crawlEmailAddressesCount = crawlEmailAddressesCount;
        this.crawlTXTFilesCount = crawlTXTFilesCount;
    }
}

module.exports = CrawlData;