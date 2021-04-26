class ScanRoundModel {

    constructor(scanRoundData) {
        const { scanRoundNumber, scanRoundPackageName, scanRoundLinesCount, scanRoundEmailMessagesCount, scanRoundEmailAddressesCount } = scanRoundData;
        this.scanRoundNumber = scanRoundNumber;
        this.scanRoundPackageName = scanRoundPackageName;
        this.scanRoundLinesCount = scanRoundLinesCount;
        this.scanRoundEmailMessagesCount = scanRoundEmailMessagesCount;
        this.scanRoundEmailAddressesCount = scanRoundEmailAddressesCount;
    }
}

module.exports = ScanRoundModel;