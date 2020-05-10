const { textUtils } = require('../../../../utils');

class ModifyData {

    constructor() {
        // All email addresses which filtered by specific domain.
        this.filteredEmailAddressesList = [];

        // All email addresses which invalid.
        this.invalidEmailAddressesList = [];

        // All email addresses which fixed by domain mistakes.
        this.fixedDomainEmailAddressesList = [];

        // All email addresses which fixed by other extra logic.
        this.fixedOtherMistakesEmailAddressesList = [];

        // All email addresses which where found duplicated in the scope of the process.
        this.duplicateEmailAddressesList = [];

        // All email addresses which are final and ready to the sync step.
        this.finalEmailAddressesList = [];
    }

    addFilteredEmailAddresses(filteredEmailAddressesList) {
        this.filteredEmailAddressesList = textUtils.getMergedLists({
            originalList: this.filteredEmailAddressesList,
            newList: filteredEmailAddressesList
        });
    }

    addInvalidEmailAddresses(invalidEmailAddressesList) {
        this.invalidEmailAddressesList = textUtils.getMergedLists({
            originalList: this.invalidEmailAddressesList,
            newList: invalidEmailAddressesList
        });
    }

    addFixedDomainEmailAddresses(fixedDomainEmailAddressesList) {
        this.fixedDomainEmailAddressesList = textUtils.getMergedLists({
            originalList: this.fixedDomainEmailAddressesList,
            newList: fixedDomainEmailAddressesList
        });
    }

    addFixedOtherMistakesEmailAddresses(fixedOtherMistakesEmailAddressesList) {
        this.fixedOtherMistakesEmailAddressesList = textUtils.getMergedLists({
            originalList: this.fixedOtherMistakesEmailAddressesList,
            newList: fixedOtherMistakesEmailAddressesList
        });
    }

    addDuplicateEmailAddresses(duplicateEmailAddressesList) {
        this.duplicateEmailAddressesList = textUtils.getMergedLists({
            originalList: this.duplicateEmailAddressesList,
            newList: duplicateEmailAddressesList
        });
    }

    addFinalEmailAddresses(finalEmailAddressesList) {
        this.finalEmailAddressesList = textUtils.getMergedLists({
            originalList: this.finalEmailAddressesList,
            newList: finalEmailAddressesList
        });
    }
}

module.exports = ModifyData;