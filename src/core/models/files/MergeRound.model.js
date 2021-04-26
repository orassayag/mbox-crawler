class MergeRoundModel {

    constructor(mergeRoundData) {
        const { mergeRoundNumber, mergeRoundTXTFilesCount, mergeRoundEmailAddressesCount,
            mergeRoundDuplicateEmailAddressesCount, mergeRoundEmailAddressesLimitCount } = mergeRoundData;
        this.mergeRoundNumber = mergeRoundNumber;
        this.mergeRoundTXTFilesCount = mergeRoundTXTFilesCount;
        this.mergeRoundEmailAddressesCount = mergeRoundEmailAddressesCount;
        this.mergeRoundDuplicateEmailAddressesCount = mergeRoundDuplicateEmailAddressesCount;
        this.mergeRoundEmailAddressesLimitCount = mergeRoundEmailAddressesLimitCount;
    }
}

module.exports = MergeRoundModel;