## Instructions

===================
FAST & BASIC START.
===================
1. Open the project in IDE (Current to 03/11/2021 I'm using VSCode).
2. Place the MBOX file in the src/sources directory.
3. Open the following file in the src/settings/settings.js file.
4. Next - Time to install the NPM packages. On the terminal run 'npm run i'.
5. You are ready to start to crawl.
6. On terminal run 'npm start'. If everything goes well, you will start to see the console status line appear.
7. If you see any error - Need to check what's changed. Current to 03/11/2021, It works fine.
8. If no errors and the progress works OK, make sure to check on dist/ that all TXT files created successfully.
9. Successful running application on production/development should look like this:

/* cSpell:disable */
===SETUP STEP - START===
===SETUP STEP - END===
===INITIATE STEP - START===
MBOX files found:
╔════════════════╤═════════════════════════════════════════╗
║ File Name      │ Size                                    ║
╟────────────────┼─────────────────────────────────────────╢
║ crt.mbox       │ 217.3MB (227,857,922 Bytes)             ║
╟────────────────┼─────────────────────────────────────────╢
║ Files count: 1 │ Total size: 217.3MB (227,857,922 Bytes) ║
╚════════════════╧═════════════════════════════════════════╝

===INITIATE STEP - END===
===FILE: crt.mbox - PROCESS START (1/1)===
===FILE: crt.mbox - SCAN STEP - START===
===Preparing to scan the MBOX file.===
===Scan number 1: Streaming with the "line-by-line" NPM package.===
===100.00% | Lines: 2,969,945 | Email addresses: 1,561===
===Scan number 2: Streaming with the "node-mbox" NPM package.===
===100.00% | Email messages: 115 | Email addresses: 1,561===
===Validating scan results.===
===Verifying email addresses scans.===
===FILE: crt.mbox - SCAN STEP - END===
===FILE: crt.mbox - CONFIRM STEP - START===
===Verifying MBOX file limits.===
===Verifying required free space.===
===FILE: crt.mbox - CONFIRM STEP - END===
===FILE: crt.mbox - CRAWL STEP - START===
===Crawling with the "line-by-line" NPM package.===
===100.00% | Lines: 2,969,945 | Email addresses: 1,561 | TXT files: 15===
===Validating crawl results.===
===Verifying email addresses count.===
===FILE: crt.mbox - CRAWL STEP - END===
===FILE: crt.mbox - MERGE STEP - START===
===Round: 1 | TXT files: 16 | Email addresses: 25 | Duplicate email addresses: 1,373 | Email addresses limit: 100====
===Round: 2 | TXT files: 2 | Email addresses: 123 | Duplicate email addresses: 0 | Email addresses limit: 200===
===Verifying merged email addresses.===
===Validating merge results.===
===FILE: crt.mbox - MERGE STEP - END===
===FILE: crt.mbox - VALIDATION STEP - START===
===100.00% | Index: 123/123 | Email: vph@rtecexpress.net | Valid: Yes | Valid email addresses: 120 | Invalid email addresses: 3===
===Validating validation results.===
===FILE: crt.mbox - VALIDATION STEP - END===
===FILE: crt.mbox - FINALIZE STEP - START===
===Validating main paths.===
===Removing crawl files.===
===Calculating summary data.===
===Validating finalize results.===
===FILE: crt.mbox - FINALIZE STEP - END===
===FILE: crt.mbox - SUMMARY STEP - START===
╔═══════════════════════════════════════╤══════════════════════════════════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════╗
║ Key Name                              │ Value                                                        │ Comment                                                                     ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ MBOX File                             │ crt.mbox - 217.3MB (227,857,922 Bytes)                       │ The original MBOX file name and size.                                       ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total MBOX File Email Addresses Count │ 1,561                                                        │ The total number of email addresses.                                        ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Final Email Addresses Count     │ 123                                                          │ The total final unique email addresses count.                               ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Start Process Date Time               │ 2021-03-11 12:04:04                                          │ The start date time of the file process.                                    ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ End Process Date Time                 │ 2021-03-11 12:15:19                                          │ The end date time of the file process.                                      ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Process Time Display            │ 00 day(s) 00 hour(s) 11 minute(s) 14 second(s) | 00.00:11:14 │ The total time took the file process to run.                                ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Removed Email Addresses Count   │ 1,438                                                        │ The total email addresses count that removed (duplicates).                  ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Valid Email Addresses Count     │ 120                                                          │ The total final valid email addresses count.                                ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Invalid Email Addresses Count   │ 3                                                            │ The total final invalid email addresses count.                              ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Final List View TXT File              │ crt_final_list_view_20210311.txt - 5KB (5,119 Bytes)         │ The name and the size of the final email addresses TXT file in list view.   ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Final Merge View TXT File             │ crt_final_merge_view_20210311.txt - 4.88KB (4,997 Bytes)     │ The name and the size of the final email addresses TXT file in merge view.  ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Valid Email Addresses TXT File        │ crt_final_valid_20210311.txt - 4.92KB (5,033 Bytes)          │ The name and the size of the valid email addresses TXT file in list view.   ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Invalid Email Addresses TXT File      │ crt_final_invalid_20210311.txt - 84Bytes (84 Bytes)          │ The name and the size of the invalid email addresses TXT file in list view. ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Final Summary TXT File                │ crt_final_summary_20210311.txt - 2.12KB (2,175 Bytes)        │ The name and the size of the final summary TXT file.                        ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total MBOX Lines Count                │ 2,969,945                                                    │ The total number of lines the original MBOX file contain.                   ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Email Items Count               │ 115                                                          │ The total number of email messages the original MBOX file contain.          ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Crawl Create TXT Files Count    │ 16                                                           │ The total number of TXT files created on the crawl step.                    ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Merge Rounds Count              │ 2                                                            │ The total number of merge rounds in the merge step.                         ║
╟───────────────────────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Total Merge Create TXT Files Count    │ 3                                                            │ The total number of TXT files created on the merge step.                    ║
╚═══════════════════════════════════════╧══════════════════════════════════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════╝

This summary log can be found at C:\Or\Web\mbox-crawler\mbox-crawler\dist\crt_final_summary_20210311.txt
===FILE: crt.mbox - SUMMARY STEP - END===
===FILE: crt.mbox - PROCESS END (1/1)===
PS C:\Or\Web\mbox-crawler\mbox-crawler>


## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverFlow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://il.linkedin.com/in/orassayag