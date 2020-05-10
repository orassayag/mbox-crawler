const { fileUtils, logUtils, sourceUtils } = require('../../../utils');

class SearchEmailAddressesInitiateService {

    constructor(data) {
        const { isTestMode, sourcesPath, distPath } = data;
        this.isTestMode = isTestMode;
        this.sourcesPath = sourcesPath;
        this.distPath = distPath;
    }

    async initiateProcess() {
        // Validate dist and sources paths.
        await this.validatePaths();

        if (!this.isTestMode) {
            // ToDo: Build logic.
            // Validate that there the PC connected to the internet.
            await this.validateInternetConnection();
        }

        // ToDo: Validate the mongo db connection is working (add row, check that exists, and delete it).
        // await this.validateMongoDatabase();

        // Set the test mode sources.
        await this.setTestMode();
    }

    async validatePaths() {
        logUtils.logStatus('Validate sources paths.');

        // Verify that the dist and the sources paths exists.
        await fileUtils.isPathExists(this.sourcesPath);
        // Make sure that the dist directory exists, if not, create it.
        await fileUtils.createDirectory(this.distPath);
        // Verify that the dist and the sources paths accessible.
        await fileUtils.isPathAccessible(this.sourcesPath);
        await fileUtils.isPathAccessible(this.distPath);
    }

    async validateInternetConnection() {
        logUtils.logStatus('Validate internet connection.');
        //=> true
        /*         const isGoogleActive = () => {
                    return new Promise(resolve => {
                        dns.lookup('https://www.google.com/', (error) => {
                            resolve(error ? false : true);
                        });
                    });
                };

                let isConnected = true;
                try {
                    isConnected = await isGoogleActive();
                } catch (err) {
                    isConnected = false;
                }
                if (!isConnected) {
                    //throw new Error('Internet connections is not available (1000042)')
                 } */
    }

    async setTestMode() {
        logUtils.logStatus('Set test mode parameters.');

        sourceUtils.setParameters({
            isTestMode: this.isTestMode,
            sourcesPath: this.sourcesPath
        });

        if (this.isTestMode) {
            await sourceUtils.loadAllTestModeSources();
        }
    }
}

module.exports = SearchEmailAddressesInitiateService;