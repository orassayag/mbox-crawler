# Instructions

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure settings in `src/settings/settings.js` (see Configuration section below)

## Configuration

Edit the settings in `src/settings/settings.js`:

### Count & Limit Settings
- `MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE`: Maximum email addresses per file (default: 5,000,000)
- `MAXIMUM_EMAIL_MESSAGES_COUNT_PER_MBOX_FILE`: Maximum email messages per file (default: 1,000,000)
- `MAXIMUM_LINES_COUNT_PER_MBOX_FILE`: Maximum lines per file (default: 100,000,000)
- `MINIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE`: Minimum MBOX file size (default: 1KB)
- `MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE`: Maximum MBOX file size (default: 10GB)
- `EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT`: Email addresses per TXT file during crawl (default: 100)
- `EMAIL_ADDRESSES_MERGE_LIMIT_COUNT`: Email addresses per TXT file during merge (default: 100)
- `MAXIMUM_MERGE_ROUNDS_COUNT`: Maximum merge rounds (default: 10)
- `SECONDS_DELAY_BETWEEN_VALIDATIONS`: Delay between validations (default: 1 second)
- `MAXIMUM_EMAIL_CHARACTERS_LENGTH`: Maximum email address length (default: 50)
- `ADVANCE_MERGE_MULTIPLY`: Merge rate multiplier (default: 2)

### Path Settings
- `OUTER_APPLICATION_PATH`: Path to the outer application directory
- `INNER_APPLICATION_PATH`: Path to the source code directory
- Dynamic paths (calculated at runtime): `BACKUPS_PATH`, `DIST_PATH`, `SOURCES_PATH`, etc.

### File Name Settings
- `DIST_TEMPORARY_FILE_NAME`: Temporary crawl file name
- `DIST_FINAL_LIST_VIEW_FILE_NAME`: Final list view output
- `DIST_FINAL_MERGE_VIEW_FILE_NAME`: Final merge view output
- `DIST_FINAL_VALID_FILE_NAME`: Valid email addresses output
- `DIST_FINAL_INVALID_FILE_NAME`: Invalid email addresses output
- `DIST_FINAL_SUMMARY_FILE_NAME`: Summary statistics output

### Backup Settings
- `IGNORE_DIRECTORIES`: Directories to skip during backup (e.g., `node_modules`, `dist`)
- `IGNORE_FILES`: Files to skip during backup
- `INCLUDE_FILES`: Files to force include (e.g., `.gitignore`)
- `BACKUP_MAXIMUM_DIRECTORY_VERSIONS_COUNT`: Maximum backup versions (default: 50)

## Running Scripts

### Crawl MBOX Files

Processes MBOX files and extracts email addresses:

```bash
npm start
```

**Prerequisites:**
- Place valid MBOX file(s) in the `sources/` directory
- Ensure sufficient disk space for output files
- Configure settings as needed

**Process Steps:**
1. **Setup**: Validates settings and configuration
2. **Initiate**: Scans sources directory and validates paths
3. **Scan**: Counts lines, email messages, and email addresses
4. **Confirm**: Validates file properties against settings
5. **Crawl**: Extracts email addresses to temporary TXT files
6. **Merge**: Recursively merges and deduplicates email addresses
7. **Validation**: Validates each email address
8. **Finalize**: Cleanup and preparation for summary
9. **Summary**: Generates comprehensive statistics

**Output Files** (in `dist/` directory):
- `{mbox_name}_final_list_view_{date}.txt` - All email addresses (one per line)
- `{mbox_name}_final_merge_view_{date}.txt` - All email addresses (comma-separated)
- `{mbox_name}_final_valid_{date}.txt` - Valid email addresses only
- `{mbox_name}_final_invalid_{date}.txt` - Invalid email addresses only
- `{mbox_name}_final_summary_{date}.txt` - Process summary and statistics

### Backup Application

Creates a backup of the application:

```bash
npm run backup
```

**What it backs up:**
- All source code files
- Configuration files
- Excludes: `node_modules`, `dist`, `.git`, `sources`

### Stop Process

On Windows, you can stop the running process:

```bash
npm run stop
```

## Expected Output

Successful running application should look like this:


```
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

This summary log can be found at C:\mbox-crawler\dist\crt_final_summary_20210311.txt
===FILE: crt.mbox - SUMMARY STEP - END===
===FILE: crt.mbox - PROCESS END (1/1)===
PS C:\Or\Web\mbox-crawler\mbox-crawler>
```

## Usage Notes

- The process handles large MBOX files efficiently using stream processing
- Memory usage is optimized by writing email addresses to files incrementally
- Duplicate email addresses are automatically removed during merge
- Invalid email addresses are filtered and reported separately
- Progress is displayed in real-time during processing
- All operations are logged with detailed statistics

## Workflow for Google Contacts

1. Place a valid MBOX file in the `sources/` directory
2. Run the crawl script: `npm start`
3. Wait for the process to complete
4. Open the final list view TXT file from `dist/`
5. Make a copy of the file
6. Add email addresses to Google Contacts one by one
7. Remove each added email from the copied list
8. Keep the final TXT file for future reference
9. For subsequent MBOX exports:
   - Run the script again with the new MBOX file
   - Compare the new file with the old file using a diff tool
   - Only add the new email addresses to Google Contacts
   - Replace the old reference file with the new one

## Error Codes

All errors include unique codes for easy troubleshooting:

- `(1000001)` - `(1000011)`: Various validation and process errors
- Format: Error message followed by `(1000XXX)` code
- Check error message and code for specific issue details

## Troubleshooting

### Common Issues

1. **Out of disk space**: Ensure sufficient free space (at least 2x MBOX file size)
2. **File too large**: Adjust `MAXIMUM_FILE_SIZE_BYTES_PER_MBOX_FILE` in settings
3. **Too many email addresses**: Adjust `MAXIMUM_EMAIL_ADDRESSES_COUNT_PER_MBOX_FILE`
4. **Process hangs**: Check system resources and file permissions
5. **Invalid MBOX format**: Ensure MBOX file is properly exported from Gmail

### Performance Tips

- Process one MBOX file at a time for best results
- Increase `EMAIL_ADDRESSES_CRAWL_LIMIT_COUNT` for faster processing of large files
- Ensure SSD storage for better I/O performance
- Close other applications to free up system resources

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverFlow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag