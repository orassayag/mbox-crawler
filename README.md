# MBOX Crawler

Built in January 2019. A Node.js application to scan the Gmail MBOX files (that contains all the inbox/sent email messages). The process will contain verification of the email messages count, and all email addresses count, validate each email address, and in the end, export all email addresses to a TXT file. Doing all of this, without any traditional database involved. Also, to build a script that merges a couple of merged TXT files, and pulls out their diff.

## Getting Started

Clone the application to your computer.
Steps to view the solution:
1. Open server application on IDE (I use VSCode).
2. In the terminal run: 'npm i'
3. In the terminal run: 'npm start'.

### Crawl MBOX Files Script:

In the terminal run: 'npm run crawl'.
-Instructions & How to use:
1. Place a valid MBOX file in the '/sources/' directory.
2. Wait for the process to end.
3. Get the final TXT file with all the email addresses.
   For Google Contacts:
4. Make a copy of the final TXT file, and add all email addresses to Google Contacts.
   Each email address you add to Google Contacts, remove it from the list.
5. Keep the final TXT file.
6. Once a new MBOX file is created, run the script again.
7. With the new final TXT file, make a copy of it.
8. Compare the new file with the old file with the compare script.
9. Once the diff file is created, make a copy of it.
10. Once again, Each email address you add to Google Contacts, remove it from the list.
11. After done, replace the new final TXT file with the old one.

Happy testing! :).

### Prerequisites

You'll need to install VSCode, Node, and clone the application, and in the terminal run: 'npm i'.

## Built With

* [Node.js](https://nodejs.org/en) - The web framework used - Server side.
* [Git](https://git-scm.com) - Source management.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverFlow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

## License

This application has an UNLICENSED license.