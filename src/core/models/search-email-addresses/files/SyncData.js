class SearchEngineData {

    constructor() {
        // All the email addresses which added to the database during the process.
        this.newEmailAddressesList = [];

        // All the email addresses which already exists in the database and not added to the database during the process.
        this.existsEmailAddressesList = [];
    }
}

module.exports = SearchEngineData;