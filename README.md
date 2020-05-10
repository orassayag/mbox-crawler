# Server

Start to be built in January 2019.

## Getting Started

Clone the application to your computer.
Steps to view the solution:
1. Open server application on IDE (I use VSCode).
2. Terminal: npm i

Crawl MBOX Files Script:
========================
In terminal: npm run crawl

-Goal:
The goal of this script is to crawl an MBOX file (or several MBOX files), pulling out all
email addresses (to, from, cc, bcc, and in the body of the email), remove duplicates,
and sort into a final list (with additional lists of valid and invalids lists).

-Instructions & How to use:
1. Place a valid MBOX file in the /sources/crawl-mbox-files directory.
2. Wait for the process to end.
3. Get the final TXT file with all the email addresses.
   For Google Contacts:
4. Make a copy of the final TXT file, and add all email addresses to Google Contacts.
   Each email address you add to Google Contacts, remove it from the list.
5. Keep the final TXT file.
6. Once a new MBOX file created, run the script again.
7. With the new final TXT file, make a copy of it.
8. Compare the new file with the old file with the compare script.
9. Once the diff file created, make a copy of it.
10. Once a again, Each email address you add to Google Contacts, remove it from the list.
11. After done, replace the new final TXT file with old one.

Happy testing! :)

### Prerequisites

You'll need to install VSCode, Node, and clone the application, run npm i.

## Built With

* [Node.JS](https://nodejs.org/en/) - The web framework used - Server side.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
Or Assayag <orassayag@gmail.com>
## License

This application has UNLICENSED License.