// Convert to line-by-line:
// https://www.npmjs.com/package/line-by-line

/* var request = require('request'); // install via npm

const validate = (emailAddress) => {
    request({
        url: "https://www.emailitin.com/email_validator",
        method: "POST",
        form: { email: emailAddress },
        json: true
    }, function (err, res, body) {
        if (err) {
            console.log('error');
            process.exit(0);
        }

        console.log(body);
        if (body.valid) {
            console.log(emailAddress + ': email address is valid');
            process.exit(0);
        }
        else {
            process.exit(0);
        }
    });
}

const Mbox = require('node-mbox');
const mbox = new Mbox('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox', { streaming: true, decoding: 'utf-8' });

let counter = 0;
const emailReg = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
let emails1 = [];
mbox.on('message', function (msg) {
    counter++
    const mail = msg.toString();
    const result = mail.match(emailReg);
    if (result.length > 0) {
        if (counter < 2000) {
            emails1 = emails1.concat(result);
        }

        if (counter > 2000) {
            const set = [...new Set(emails1)];
            validate(set[2]);
        }
    }
});
 */
/* const emailExists = require('email-exists')

emailExists({
    sender: 'darthvader@gmail.com',
    recipient: 'lukeskywalker@gmail.com'
}).then(console.log) */

/* const Mbox = require('node-mbox');
const mbox = new Mbox('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox', { streaming: true, decoding: 'utf-8' });
const emailExists = require('email-exists');

let counter = 0;
const emailReg = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
let emails1 = [];
mbox.on('message', function (msg) {
    counter++
    const mail = msg.toString();
    const result = mail.match(emailReg);
    if (result.length > 0) {
        if (counter < 2000) {
            emails1 = emails1.concat(result);
        }

        if (counter > 2000) {
            const set = [...new Set(emails1)];
            const emailExists = require('email-exists')

            emailExists({
                sender: 'darthvader@gmail.com',
                recipient: set[0]
            })
                .then((data) => {
                    console.log(data)
                    process.exit(0);
                })
            /*             emailExistence.check(set[0], function(error, response){
                            console.log('res: '+response);
                            process.exit(0);
                        }); */
/*         }
    }
}); */

/* const Mbox = require('node-mbox');
const mbox = new Mbox('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox', { streaming: true, decoding: 'utf-8' });

let counter = 0;
const emailReg = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
let emails1 = [];
let emails2 = [];
mbox.on('message', function (msg) {
    counter++
    const mail = msg.toString();
    const result = mail.match(emailReg);
    if (result.length > 0) {
        emails1 = emails1.concat(result);
    }

    if (counter > 2000) {
        console.log([...new Set(emails)]);
        process.exit(0);
    }
}); */

/* var fs = require('fs');
var inspect = require('util').inspect;

var buffer = '';
var rs = fs.createReadStream('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox');
rs.on('data', function(chunk) {
  var lines = (buffer + chunk).split(/\r?\n/g);
  buffer = lines.pop();
  for (var i = 0; i < lines.length; ++i) {
    // do something with `lines[i]`
    console.log('found line: ' + inspect(lines[i]));
  }
});
rs.on('end', function() {
  // optionally process `buffer` here if you want to treat leftover data without
  // a newline as a "line"
  console.log('ended on non-empty buffer: ' + inspect(buffer));
}); */

/* var fs = require('fs');

var contents = fs.readFileSync('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox', 'utf8');
console.log(contents); */


/* ==============
7673
111146
 */
/* const Mbox = require('node-mbox');
const fs = require('fs');
const mbox = new Mbox('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox', { streaming: true, decoding: 'utf-8' });

let counter = 0;
let emails = [];
const emailReg = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

mbox.on('message', function (msg) {
    const mail = msg.toString();
    const result = mail.match(emailReg);
    emails = emails.concat(result);
    if (emails.length > 1000) {
        fs.appendFile(`emails${counter}.txt`, result, function (err) {
            if (err) throw err;
            counter++
            console.log(counter);
            emails = [];
        });
    }
});

mbox.on('error', function (err) {
});

mbox.on('end', function () {
    console.log('==============');
}); */

/* const Mbox = require('node-mbox');
const fs = require('fs');
const mbox = new Mbox('C:\\Users\\or.assayag\\Desktop\\Inbox-003.mbox', { streaming: true, decoding: 'utf-8' });

let counter = 0;
let emailsCounter = 0;
const emailReg = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

mbox.on('message', function (msg) {
    const mail = msg.toString();
    const result = mail.match(emailReg);
    if (result.length > 0) {
        const emails
        fs.appendFile(`emails${counter}.txt`, 'data to append', function (err) {
            if (err) throw err;
            console.log(`Saved Emails: ${emailsCounter}`);
            counter++;
            emailsCounter += result.length;
        });
    }
});

mbox.on('error', function (err) {
});

mbox.on('end', function () {
}); */


/* const Mbox = require('node-mbox');
const LineByLineReader = require('line-by-line');
const textUtils = require('../utils/text.utils');

class ScanService {

    constructor(filePath) {
        this.filePath = filePath;
        this.firstEmailsCounter = 0;
        this.firstEmailAddressesCounter = 0;
        this.secondEmailsCounter = 0;
        this.secondEmailAddressesCounter = 0;
    }

    async initiateScan() {
        await this.firstFileScan();
        await this.secondFileScan();
    }

    async firstFileScan() {
        return new Promise((resolve, reject) => {
            const lr = new LineByLineReader(this.filePath);
            lr.on('line', (line) => {
                if (line) {
                    const emailAddresses = textUtils.getEmailAddresses(line);

                    if (line.indexOf('X-Mailer') > -1) {
                        this.firstEmailsCounter++;
                    }

                    if (emailAddresses && emailAddresses.length > 0) {
                        this.firstEmailAddressesCounter += emailAddresses.length;
                    }
                }
                this.logStatus(this.firstEmailsCounter, this.firstEmailAddressesCounter);
            });

            lr.on('end', () => {
                process.stdout.write('\n\r');
                resolve();
            });

            lr.on('error', (err) => {
                console.log(err);
                reject();
            });
        });
    }

    secondFileScan() {
        return new Promise((resolve, reject) => {
            const mbox = new Mbox(this.filePath, { streaming: true });

            mbox.on('message', (message) => {
                if (message) {
                    this.secondEmailsCounter++;
                    const emailAddresses = textUtils.getEmailAddresses(message);
                    if (emailAddresses && emailAddresses.length > 0) {
                        this.secondEmailAddressesCounter += emailAddresses.length;
                    }
                }
                this.logStatus(this.secondEmailsCounter, this.secondEmailAddressesCounter);
            });

            mbox.on('end', () => {
                process.stdout.write('\n\r');
                resolve();
            });

            mbox.on('error', (err) => {
                console.log(err);
                reject();
            });
        });
    }

    scanFile(data) {
        const { stream, eventName } = data;

        return new Promise((resolve, reject) => {
            try {

                const

                const mbox = new Mbox(this.filePath, { streaming: true });

                mbox.on('message', (message) => {
                    if (message) {
                        this.secondEmailsCounter++;
                        const emailAddresses = textUtils.getEmailAddresses(message);
                        if (emailAddresses && emailAddresses.length > 0) {
                            this.secondEmailAddressesCounter += emailAddresses.length;
                        }
                    }
                    this.logStatus(this.secondEmailsCounter, this.secondEmailAddressesCounter);
                });

                mbox.on('end', () => {
                    process.stdout.write('\n\r');
                    resolve();
                });

                mbox.on('error', (err) => {
                    console.log(err);
                    reject();
                });
            }
            catch (error) {
                console.log(err);
                reject();
            }
        });
    }

    logStatus(emailsCount, emailAddressesCount) {
        process.stdout.write(`Emails: ${textUtils.getNumberWithCommas(emailsCount)} | Email addresses: ${textUtils.getNumberWithCommas(emailAddressesCount)}\r`);
    }
}

module.exports = ScanService; */

/*
const path = require('path');
const logUtils = require('./utils/log.utils');
const InitiateService = require('./services/initiate.service');
const ScanService = require('./services/scan.service');
const CrawlService = require('./services/crawl.service');
const MergeService = require('./services/merge.service');
const ValidateService = require('./services/validate.service');

// All global parameters.
const startTime = new Date();
let endTime = null;
let statisticsData = {};
const emailAddressesCountToCrawl = 100;
const emailAddressesCountToMerge = 100;
const sourcesPath = path.join(__dirname, '../sources/');
const distPath = path.join(__dirname, '../dist/');
const paths = {
    'distTemporaryFilePath': path.join(distPath, '#ORIGINAL#_#FILE_COUNT#_temporary.txt'),
    'distTemporaryMergedFilePath': path.join(distPath, '#ORIGINAL#_merged_temporary.txt'),
    'distFinalValidFilePath': path.join(distPath, '#ORIGINAL#_valid_final.txt'),
    'distFinalInvalidFilePath': path.join(distPath, '#ORIGINAL#_invalid_final.txt')
};

(async () => {
    statisticsData['StartTime'] = startTime;
    logUtils.logStatus('Start the initiate process.');
    const initiateResults = await new InitiateService({
        sourcesPath: sourcesPath,
        distPath: distPath
    }).initiateProcess();

    // For now, scan only the first file.
    const sourcesMboxFilePath = path.join(sourcesPath, initiateResults.files[0]);
    logUtils.logStatus('Finish the initiate process.');
    logUtils.logStatus('Start the scan process.');

    const scanResults = await new ScanService({
        sourcesMboxFilePath: sourcesMboxFilePath
    }).initiateScan();

    if (!scanResults || Object.keys(scanResults).length <= 0) {
        // ToDo: Error here.
    }

    // ToDo: Also validate here if error field exists in scanResults or -1 in any field.

    statisticsData = { ...statisticsData, ...scanResults };
    logUtils.logStatus('Finish the scan process.');
    logUtils.logStatus('Start the crawl process.');

    const distTextFilePath = path.join(distPath, textFileName);

    const crawlResults = await new CrawlService({
        sourcesMboxFilePath: sourcesMboxFilePath,
        distTextFilePath: distTextFilePath,
        emailAddressesCountToCrawl: emailAddressesCountToCrawl,
        originalLinesCount: statisticsData['ScanLinesCounter1'],
        originalEmailAddressesCount: statisticsData['ScanEmailAddressesCounter1']
    }).initiateCrawl();

    if (!crawlResults || Object.keys(crawlResults).length <= 0) {
        // ToDo: Error here.
    }

    // ToDo: Also validate here if error field exists in crawlResults or -1 in any field.

    statisticsData = { ...statisticsData, ...crawlResults };
    logUtils.logStatus('Finish the crawl process.');
    logUtils.logStatus('Start the merge process.');

    const mergeResults = await new MergeService({
        distTextFilePath: distTextFilePath,
        crawlTextFilesCounter: statisticsData['CrawlTextFilesCounter'],
        emailAddressesCountToMerge: emailAddressesCountToMerge
    }).initiateMerge();

    if (!mergeResults || Object.keys(mergeResults).length <= 0) {
        // ToDo: Error here.
    }

    // ToDo: Also validate here if error field exists in mergeResults or -1 in any field.

    statisticsData = { ...statisticsData, ...mergeResults };
    logUtils.logStatus('Finish the merge process.');
    logUtils.logStatus('Start the validation process.');

    const validateResults = await new ValidateService({
        distTextFilePath: distTextFilePath,
        finalMergeTextFileName: statisticsData['MergedFinalFileName']
    }).initiateValidate();

    if (!validateResults || Object.keys(validateResults).length <= 0) {
        // ToDo: Error here.
    }

    // ToDo: Also validate here if error field exists in validateResults or -1 in any field.

    endTime = new Date();
    statisticsData['EndTime'] = endTime;
    console.log(statisticsData);
})(); */

        /*         this.fileName = fileName;
        this.fileSize = null;
        this.fileEmailAddressesCount = 0;
        this.fileCleanName = pathUtils.getFileCleanName(fileName);
        this.originalFilePath = pathUtils.getFilePath(sourcesPath, fileName); */

        //this.distTemporaryFilePath = pathUtils.createActionPath(distPath, this.fileCleanName,  distTemporaryFileName);
        //this.distTemporaryMergedFile

        //this.originalFilePath = pathUtils.getFilePath(sourcesPath, fileName);

        /*         this.distTemporaryMergedFilePath = pathUtils.createActionPath(distPath, this.fileCleanName,  distTemporaryMergedFileName);
                this.distFinalValidFilePath = pathUtils.createActionPath(distPath, this.fileCleanName,  distFinalValidFileName);
                this.distFinalInvalidFilePath = pathUtils.createActionPath(distPath, this.fileCleanName,  distFinalInvalidFileName); */

        /*      'distTemporaryFilePath': path.join(distPath, '#ORIGINAL#_#FILE_COUNT#_temporary.txt'),
                'distTemporaryMergedFilePath': path.join(distPath, '#ORIGINAL#_merged_temporary.txt'),
                'distFinalValidFilePath': path.join(distPath, '#ORIGINAL#_valid_final.txt'),
                'distFinalInvalidFilePath': path.join(distPath, '#ORIGINAL#_invalid_final.txt')

                this.sourcesPath = path.join(__dirname, '../../sources/');
                this.distPath = path.join(__dirname, '../../dist/');
                this.textFileName = 'temp_#FILE_COUNT#.txt';
                '#FILE_COUNT#_temporary'
                'merged_temporary'
                'valid_final'
                'invalid_final' */

/* const FileProcess = require('./files/FileProcess'); */
/* const MboxFileData = require('./files/_MboxFileData');
const TextFileData = require('./files/_TextFileData'); */
/* const ScanData = require('./files/ScanData');
const ScanRound = require('./files/ScanRound');
const CrawlData = require('./files/CrawlData');
const MergeData = require('./files/MergeData');
const SummaryData = require('./files/SummaryData'); */

/* module.exports = {
    FileProcess, MboxFileData, TextFileData, ScanData, ScanRound, CrawlData, MergeData, SummaryData
}; */

/* const { pathUtils, textUtils, fileUtils } = require('../../../utils');
const mboxFilesCrawlerSettings = require('../../../settings/mbox-files-crawler.settings');

class MboxFileData {

    constructor(mboxFileData) {
        const { mboxFileName, mboxFileKeyName, mboxFileTargetPath } = mboxFileData;
        this.mboxFileName = textUtils.createFileName({
            fileName: mboxFileName,
            fileKeyName: mboxFileKeyName,
            textFileName: null,
            isMbox: true
        });
        this.mboxFileNameDisplay = textUtils.verifyCharactersLength({
            value: mboxFileName,
            maximumCharactersLength: mboxFilesCrawlerSettings.MAXIMUM_EMAIL_CHARACTERS_LENGTH
        });
        this.mboxFileCleanName = pathUtils.getFileCleanName(mboxFileName);
        this.mboxFilePath = pathUtils.getJoinPath({
            targetPath: mboxFileTargetPath,
            targetName: mboxFileName
        });
        this.mboxFileSize = 0;
        this.mboxFileSizeDisplay = null;
    }

    async calculateFileSize() {
        this.mboxFileSize = await fileUtils.getFileSize(this.mboxFilePath);
        this.mboxFileSizeDisplay = textUtils.getFileSizeDisplay(this.mboxFileSize);
    }
}

module.exports = MboxFileData; */

/* const { pathUtils, textUtils, fileUtils } = require('../../../utils');
const mboxFilesCrawlerSettings = require('../../../settings/mbox-files-crawler.settings');

class TextFileData {

    constructor(textFileData) {
        const { textFileName, textFileKeyName, textFileTargetPath } = textFileData;
        this.textFileName = textUtils.createFileName({
            fileName: textFileName,
            fileKeyName: textFileKeyName,
            textFileName: null,
            isMbox: false
        });
        this.textFileNameDisplay = textUtils.verifyCharactersLength({
            value: textFileName,
            maximumCharactersLength: mboxFilesCrawlerSettings.MAXIMUM_EMAIL_CHARACTERS_LENGTH
        });
        this.textFileCleanName = pathUtils.getFileCleanName(textFileName);
        this.textFilePath = pathUtils.getJoinPath({
            targetPath: textFileTargetPath,
            targetName: this.textFileName
        });
        this.textFileSize = 0;
        this.textFileSizeDisplay = null;
        this.textFileEmailAddressesCount = 0;
    }

    async calculateFileSize() {
        this.textFileSize = await fileUtils.getFileSize(this.textFilePath);
        this.textFileSizeDisplay = textUtils.getFileSizeDisplay(this.textFileSize);
    }
}

module.exports = TextFileData;



/* const { pathUtils, textUtils, fileUtils } = require('../../../utils');
const mboxFilesCrawlerSettings = require('../../../settings/mbox-files-crawler.settings');

class MboxFileData {

    constructor(mboxFileData) {
        const { mboxFileName, mboxFileKeyName, mboxFileTargetPath } = mboxFileData;
        this.mboxFileName = textUtils.createFileName({
            fileName: mboxFileName,
            fileKeyName: mboxFileKeyName,
            textFileName: null,
            isMbox: true
        });
        this.mboxFileNameDisplay = textUtils.verifyCharactersLength({
            value: mboxFileName,
            maximumCharactersLength: mboxFilesCrawlerSettings.MAXIMUM_EMAIL_CHARACTERS_LENGTH
        });
        this.mboxFileCleanName = pathUtils.getFileCleanName(mboxFileName);
        this.mboxFilePath = pathUtils.getJoinPath({
            targetPath: mboxFileTargetPath,
            targetName: mboxFileName
        });
        this.mboxFileSize = 0;
        this.mboxFileSizeDisplay = null;
    }

    async calculateFileSize() {
        this.mboxFileSize = await fileUtils.getFileSize(this.mboxFilePath);
        this.mboxFileSizeDisplay = textUtils.getFileSizeDisplay(this.mboxFileSize);
    }
}

module.exports = MboxFileData; */


/* const { pathUtils, textUtils, timeUtils } = require('../../../utils');
const { SummaryData, MboxFileData, TextFileData, ScanData, ScanRound, CrawlData, MergeData } = require('..');

class FileProcess {

    constructor(mboxFileData) {
        const { fileName, sourcesPath, distPath, distTemporaryFileName, distFinalAllEmailsMergedFileName,
            distFinalAllEmailsListFileName, distFinalValidFileName, distFinalInvalidFileName,
            distFinalSummaryFileName } = mboxFileData;
        this.distPath = distPath;
        this.distTemporaryFileName = distTemporaryFileName;
        this.summaryData = null;
        this.scanData = null;
        this.crawlData = null;
        this.mergeData = [];
        this.originalMboxFile = this.createMboxFileData(fileName, sourcesPath);
        this.distFinalAllEmailsMergedTextFile = this.createTextFileData(distFinalAllEmailsMergedFileName);
        this.distFinalAllEmailsListTextFile = this.createTextFileData(distFinalAllEmailsListFileName);
        this.distFinalValidTextFile = this.createTextFileData(distFinalValidFileName);
        this.distFinalInvalidTextFile = this.createTextFileData(distFinalInvalidFileName);
        this.distFinalSummaryTextFile = this.createTextFileData(distFinalSummaryFileName);
    }

    setStartSummaryData() {
        this.summaryData = new SummaryData();
    }

    calculateSummaryData() {
        this.summaryData.calculateTimes();
        this.summaryData.totalTotalMBOXEmailsCount = textUtils.getNumberWithCommas(this.scanData.scanRounds[0].scanRoundEmailAddressesCount);
        this.summaryData.totalRemovedEmailsCount =
        textUtils.getNumberWithCommas(textUtils.getPositiveNumber(this.scanData.scanRounds[0].scanRoundEmailAddressesCount - this.distFinalAllEmailsMergedTextFile.textFileEmailAddressesCount));
        this.summaryData.totalFinalEmailsCount = textUtils.getNumberWithCommas(this.distFinalAllEmailsMergedTextFile.textFileEmailAddressesCount);
        this.summaryData.mboxFileSize = this.originalMboxFile.mboxFileSizeDisplay;
        this.summaryData.finalTextFileSize = this.distFinalAllEmailsMergedTextFile.textFileSizeDisplay;
    }

    createScanData(scanRoundData) {
        if (!this.scanData) {
            this.scanData = new ScanData();
        }
        if (scanRoundData) {
            this.scanData.scanRounds.push(new ScanRound(scanRoundData));
        }
    }

    createTemporaryFilePath(data) {
        return pathUtils.createTemporaryFilePath({
            ...data,
            targetPath: this.distPath,
            fileCleanName: this.originalMboxFile.mboxFileCleanName,
            fileKeyName: this.distTemporaryFileName
        });
    }

    createCrawlData(crawlData) {
        this.crawlData = new CrawlData(crawlData);
    }

    createMergeRound(mergeData) {
        this.mergeData.push(new MergeData(mergeData));
    }

    createTextFileData(textFileKeyName) {
        textFileKeyName = `${textFileKeyName}_${timeUtils.getCurrentDateNoSpaces()}`;
        return new TextFileData({
            textFileName: this.originalMboxFile.mboxFileCleanName,
            textFileKeyName: textFileKeyName,
            textFileTargetPath: this.distPath
        });
    }

    createMboxFileData(fileName, sourcesPath) {
        return new MboxFileData({
            mboxFileName: fileName,
            mboxFileKeyName: null,
            mboxFileTargetPath: sourcesPath
        });
    }
}

module.exports = FileProcess; */

/*     logFiles(files) {
        const data = [];
        let totalSize = 0;
        for (let i = 0, length = files.length; i < length; i++) {
            const file = files[i];
            const key = file.originalMboxFile.mboxFileNameDisplay;
            const value = file.originalMboxFile.mboxFileSizeDisplay;
            totalSize += file.originalMboxFile.mboxFileSize;
            data.push({ key: key, value: value });
        }
        data.push({
            key: `Files count: ${textUtils.getNumberWithCommas(files.length)}`,
            value: `Total size: ${textUtils.getFileSizeDisplay(totalSize)}`
        });
        logUtils.log('MBOX Files found:');
        logUtils.logTableData({
            titles: ['File Name', 'Size'],
            tableData: data
        });
    } */

    /* {
    "distFinalAllEmailsMergedTextFile": {
      "textFileName": "ansol-imprensa_final_all_emails_merged_20191208.txt",
      "textFileNameDisplay": "ansol-imprensa",
      "textFileCleanName": "ansol-imprensa",
      "textFilePath": "C:\\Or\\Web\\EmailsManager\\EmailsManager\\dist\\mbox-files-crawler\\ansol-imprensa_final_all_emails_merged_20191208.txt",
      "textFileSize": 6282,
      "textFileSizeDisplay": "6.13KB (6,282 Bytes)",
      "textFileEmailAddressesCount": 213
    },
    "distFinalAllEmailsListTextFile": {
      "textFileName": "ansol-imprensa_final_all_emails_list_20191208.txt",
      "textFileNameDisplay": "ansol-imprensa",
      "textFileCleanName": "ansol-imprensa",
      "textFilePath": "C:\\Or\\Web\\EmailsManager\\EmailsManager\\dist\\mbox-files-crawler\\ansol-imprensa_final_all_emails_list_20191208.txt",
      "textFileSize": 6494,
      "textFileSizeDisplay": "6.34KB (6,494 Bytes)",
      "textFileEmailAddressesCount": 213
    },
    "distFinalValidTextFile": {
      "textFileName": "ansol-imprensa_final_valid_20191208.txt",
      "textFileNameDisplay": "ansol-imprensa",
      "textFileCleanName": "ansol-imprensa",
      "textFilePath": "C:\\Or\\Web\\EmailsManager\\EmailsManager\\dist\\mbox-files-crawler\\ansol-imprensa_final_valid_20191208.txt",
      "textFileSize": 4982,
      "textFileSizeDisplay": "4.87KB (4,982 Bytes)",
      "textFileEmailAddressesCount": 177
    },
    "distFinalInvalidTextFile": {
      "textFileName": "ansol-imprensa_final_invalid_20191208.txt",
      "textFileNameDisplay": "ansol-imprensa",
      "textFileCleanName": "ansol-imprensa",
      "textFilePath": "C:\\Or\\Web\\EmailsManager\\EmailsManager\\dist\\mbox-files-crawler\\ansol-imprensa_final_invalid_20191208.txt",
      "textFileSize": 1510,
      "textFileSizeDisplay": "1.47KB (1,510 Bytes)",
      "textFileEmailAddressesCount": 36
    },
    "distFinalSummaryTextFile": {
      "textFileName": "ansol-imprensa_final_summary_20191208.txt",
      "textFileNameDisplay": "ansol-imprensa",
      "textFileCleanName": "ansol-imprensa",
      "textFilePath": "C:\\Or\\Web\\EmailsManager\\EmailsManager\\dist\\mbox-files-crawler\\ansol-imprensa_final_summary_20191208.txt",
      "textFileSize": 0,
      "textFileSizeDisplay": null,
      "textFileEmailAddressesCount": 0
    }
  } */

  /*         this.totalProcessTime = null; */

  /*         this.startDateTime = new Date();
        this.endDateTime = null; */

/*     calculateTimes() {
        this.endDateTime = new Date();
        this.totalProcessTime = timeUtils.getDifferenceDisplayTimeBetweenDates({
            startDateTime: this.startDateTime,
            endDateTime: this.endDateTime
        });
        this.startDateTime = timeUtils.getDisplayDateTime(this.startDateTime);
        this.endDateTime = timeUtils.getDisplayDateTime(this.endDateTime);
    } */

        /*         this.startDateTime = new Date();
        this.endDateTime = null; */
/*     calculateTimes() {
        this.endDateTime = new Date();
        this.totalProcessTime = timeUtils.getDifferenceDisplayTimeBetweenDates({
            startDateTime: this.startDateTime,
            endDateTime: this.endDateTime
        });
        this.startDateTime = timeUtils.getDisplayDateTime(this.startDateTime);
        this.endDateTime = timeUtils.getDisplayDateTime(this.endDateTime);
    } */

    /* statisticsData: StatisticsData {
    totalMBOXFileLinesCount: '101,062',
    totalEstimatedEmailMessagesCount: null,
    totalCrawlCreateTextFilesCount: null,
    totalMergeRoundsCount: null,
    totalMergeCreateTextFilesCount: null,
    totalMBOXFileEmailAddressesCount: null,
    totalRemovedEmailAddressesCount: null,
    totalFinalEmailAddressesCount: null,
    totalValidEmailAddressesCount: null,
    totalInvalidEmailAddressesCount: null
  },
  timesData: TimesData {
    startDateTime: 2019-12-09T12:22:45.587Z,
    endDateTime: 2019-12-09T12:28:13.342Z,
    totalProcessTime: 327755,
    startDateTimeDisplay: '2019-12-09 12:22:45',
    endDateTimeDisplay: '2019-12-09 12:28:13',
    totalProcessTimeDisplay: '00 day(s) 00 hour(s) 05 minute(s) 27 second(s) | 00.00:05:27'
  },
  totalEstimatedEmailMessagesCount: '127 / 124',
  totalCrawlCreateTextFilesCount: '20',
  totalMergeRoundsCount: '2',
  totalMergeCreateTextFilesCount: '3',
  totalMBOXFileEmailAddressesCount: '',
  totalRemovedEmailAddressesCount: '1,743',
  totalFinalEmailAddressesCount: '213',
  totalValidEmailAddressesCount: '177',
  totalInvalidEmailAddressesCount: '36'
}, */

        /*         this.summaryData.calculateTimes();
                this.summaryData.totalTotalMBOXEmailsCount = textUtils.getNumberWithCommas(this.scanData.scanRounds[0].scanRoundEmailAddressesCount);
                this.summaryData.totalRemovedEmailsCount =
                    textUtils.getNumberWithCommas(textUtils.getPositiveNumber(this.scanData.scanRounds[0].scanRoundEmailAddressesCount - this.distFinalAllEmailsMergedTextFile.fileEmailAddressesCount));
                this.summaryData.totalFinalEmailsCount = textUtils.getNumberWithCommas(this.distFinalAllEmailsMergedTextFile.fileEmailAddressesCount);
                this.summaryData.fileSize = this.mboxFile.fileSizeDisplay;
                this.summaryData.finalTextFileSize = this.distFinalAllEmailsMergedTextFile.fileSizeDisplay; */

                        /*      scanData
                crawlData
                mergeData
                summaryData
                mboxFile
                distFinalAllEmailsMergedTextFile
                distFinalAllEmailsListTextFile
                distFinalValidTextFile
                distFinalInvalidTextFile
                distFinalSummaryTextFile */

/*                 const logUtils = require('../files/log.utils');

class ErrorUtils {

    constructor() { }

    throwError(data) {
        const { title, information } = data;
        if (!title) {
            return;
        }

        logUtils.logStatus(`${title}:`, information);
        throw new Error(title);
    }
}

const errorUtils = new ErrorUtils();
module.exports = errorUtils; */

        /*         validationUtils.isExistsValidNumber({
            name: 'MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE',
            number: MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE,
            errorNumbers: [1000050, 1000051]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE',
            number: MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE,
            errorNumbers: [1000052, 1000053]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'MAXIMUM_LINES_COUNT_PER_MBOX_FILE',
            number: MAXIMUM_LINES_COUNT_PER_MBOX_FILE,
            errorNumbers: [1000054, 1000055]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE',
            number: MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE,
            errorNumbers: [1000067, 1000068]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE',
            number: MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE,
            errorNumbers: [1000056, 1000057]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT',
            number: EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT,
            errorNumbers: [1000021, 1000022]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'EMAIL_ADDRESSES_MERGE_LIMIT_COUNT',
            number: EMAIL_ADDRESSES_MERGE_LIMIT_COUNT,
            errorNumbers: [1000023, 1000024]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'MAXIMUM_MERGE_ROUNDS_COUNT',
            number: MAXIMUM_MERGE_ROUNDS_COUNT,
            errorNumbers: [1000025, 1000026]
        }); */

/*         validationUtils.isExistsValidNumber({
            name: 'MAXIMUM_EMAIL_CHARACTERS_LENGTH',
            number: MAXIMUM_EMAIL_CHARACTERS_LENGTH,
            errorNumbers: [1000041, 1000042]
        }); */

        /*
        validationUtils.isExistsValidNumber({
            name: 'ADVANCE_MERGE_MULTIPLY',
            number: ADVANCE_MERGE_MULTIPLY,
            errorNumbers: [1000043, 1000044]
        }); */

        /*         validationUtils.isExistsValidNumber({
            name: 'SECONDS_DELAY_BETWEEN_VALIDATIONS',
            number: SECONDS_DELAY_BETWEEN_VALIDATIONS,
            errorNumbers: [1000039, 1000040]
        }); */

        /*     isExistsValidString(data) {
        const { key, value, errorNumber } = data;
        if (!value) {
            throw new Error(`Invalid or no ${key} parameter was found (${errorNumber})`);
        }
    }

    isExistsValidNumber(data) {
        const { key, value, errorNumbers } = data;
        if (!value) {
            throw new Error(`Invalid or no ${key} parameter was found (${errorNumbers[0]})`);
        }

        if (!this.isPositiveNumber(value)) {
            throw new Error(`Invalid or no ${key} parameter was found (${errorNumbers[1]})`);
        }
    }

    isExistsValidNumbers(numbersData) {
        for (let i = 0, length = numbersData.length; i < length; i++) {
            this.isExistsValidNumber(numbersData[i]);
        }
    }

    isExistsValidStrings(stringsData) {
        for (let i = 0, length = stringsData.length; i < length; i++) {
            this.isExistsValidString(stringsData[i]);
        }
    } */

    /* const textUtils = require('../utils/files/text.utils');
const duplicates = textUtils.countDuplicateStrings(['mike', 'or', 'mike']);
console.log(duplicates); */

/* let strArray = [ "q", "w", "w", "w", "e", "i", "u", "r"];
let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
console.log(findDuplicates(strArray)); // All duplicates
console.log([...new Set(findDuplicates(['mike', 'or']))]); // Unique duplicates */

/* const textUtils = require('../utils/files/text.utils');
console.log(textUtils.countDuplicateStrings(['mike', 'or', 'or'])); */

    /*
        countDuplicateStrings(list) {
            let count = 0;
            if (!validationUtils.isExists(list)) {
                return count;
            }
            list.forEach((i) => { count = count + (count[i] || 0) + 1; });
            return count;
        } */

/*         console.log(this.mergeData.mergeRounds);
        console.log(this.mergeData.mergeRounds.reduce(m => m.mergeRoundTXTFilesCount));
        console.log(this.mergeData.mergeRounds.reduce((a, b) => a + (b.mergeRoundTXTFilesCount || 0), 0)); */
        /*         this.summaryData.statisticsData.totalMergeCreateTXTFilesCount = textUtils.getNumberWithCommas(this.mergeData.mergeRounds.reduce(m => m.mergeRoundTXTFilesCount)); */

        /* EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT: 100,
EMAIL_ADDRESSES_MERGE_LIMIT_COUNT: 100, */

//1956
                // Build logic to support more than one file.
                // Before each work on file, log the name and the size of the file.
                // For now, work on the first file only.

/* const CrawlMBOXFilesSetupService = require('./files/crawl-mbox-files-setup.service');
const CrawlMBOXFilesInitiateService = require('./files/crawl-mbox-files-initiate.service');
const CrawlMBOXFilesPreProcessService = require('./files/crawl-mbox-files-pre-process.service');
const CrawlMBOXFilesScanService = require('./files/crawl-mbox-files-scan.service');
const CrawlMBOXFilesConfirmService = require('./files/crawl-mbox-files-confirm.service');
const CrawlMBOXFilesCrawlService = require('./files/crawl-mbox-files-crawl.service');
const CrawlMBOXFilesMergeService = require('./files/crawl-mbox-files-merge.service');
const CrawlMBOXFilesValidateService = require('./files/crawl-mbox-files-validate.service');
const CrawlMBOXFilesFinalizeService = require('./files/crawl-mbox-files-finalize.service');
const CrawlMBOXFilesSummaryService = require('./files/crawl-mbox-files-summary.service');
const CrawlMBOXFilesPostProcessService = require('./files/crawl-mbox-files-post-process.service');

module.exports = {
    CrawlMBOXFilesSetupService, CrawlMBOXFilesInitiateService, CrawlMBOXFilesPreProcessService, CrawlMBOXFilesScanService,
    CrawlMBOXFilesConfirmService, CrawlMBOXFilesCrawlService, CrawlMBOXFilesMergeService, CrawlMBOXFilesValidateService,
    CrawlMBOXFilesFinalizeService, CrawlMBOXFilesSummaryService, CrawlMBOXFilesPostProcessService
}; */

/*         this.summaryData.statisticsData.totalMBOXFileLinesCount = textUtils.getNumberWithCommas(this.scanData.initiateScanLinesCount);
        this.summaryData.statisticsData.totalEmailMessagesCount = textUtils.getNumberWithCommas(scan2.scanRoundEmailMessagesCount);
        this.summaryData.statisticsData.totalCrawlCreateTXTFilesCount = textUtils.getNumberWithCommas(this.crawlData.crawlTXTFilesCount);
        this.summaryData.statisticsData.totalMergeRoundsCount = textUtils.getNumberWithCommas(this.mergeData.mergeRounds.length);
        this.summaryData.statisticsData.totalMergeCreateTXTFilesCount = textUtils.getSumProperty({
            key: 'mergeRoundTXTFilesCount',
            list: this.mergeData.mergeRounds
        });
        this.summaryData.statisticsData.totalMBOXFileEmailAddressesCount = textUtils.getNumberWithCommas(scan1.scanRoundEmailAddressesCount);
        this.summaryData.statisticsData.totalRemoveEmailAddressesCount = textUtils.getNumberWithCommas(textUtils.getPositiveNumber(scan1.scanRoundEmailAddressesCount - this.distFinalMergeViewTXTFile.fileEmailAddressesCount));
        this.summaryData.statisticsData.totalFinalEmailAddressesCount = textUtils.getNumberWithCommas(this.distFinalMergeViewTXTFile.fileEmailAddressesCount);
        this.summaryData.statisticsData.totalValidEmailAddressesCount = textUtils.getNumberWithCommas(this.distFinalValidTXTFile.fileEmailAddressesCount);
        this.summaryData.statisticsData.totalInvalidEmailAddressesCount = textUtils.getNumberWithCommas(this.distFinalInvalidTXTFile.fileEmailAddressesCount); */

/*                // Original fields.
               this.totalMBOXFileLinesCount = 0;
               this.totalEstimateEmailMessagesCount = 0;
               this.totalCrawlCreateTXTFilesCount = 0;
               this.totalMergeRoundsCount = 0;
               this.totalMergeCreateTXTFilesCount = 0;
               this.totalMBOXFileEmailAddressesCount = 0;
               this.totalRemoveEmailAddressesCount = 0;
               this.totalFinalEmailAddressesCount = 0;
               this.totalValidEmailAddressesCount = 0;
               this.totalInvalidEmailAddressesCount = 0;
       
               // Display fields.
               this.totalMBOXFileLinesCountDisplay = null;
               this.totalEstimateEmailMessagesCountDisplay = null;
               this.totalCrawlCreateTXTFilesCountDisplay = null;
               this.totalMergeRoundsCountDisplay = null;
               this.totalMergeCreateTXTFilesCountDisplay = null;
               this.totalMBOXFileEmailAddressesCountDisplay = null;
               this.totalRemoveEmailAddressesCountDisplay = null;
               this.totalFinalEmailAddressesCountDisplay = null;
               this.totalValidEmailAddressesCountDisplay = null;
               this.totalInvalidEmailAddressesCountDisplay = null; */