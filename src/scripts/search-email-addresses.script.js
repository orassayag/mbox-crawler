require('../services/global/setup.service');
const SearchEmailAddressesLogic = require('../logics/search-email-addresses.logic');

(async () => {
    await new SearchEmailAddressesLogic().run();
})();