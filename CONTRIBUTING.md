# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/mbox-crawler/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error codes (if applicable)
   - Your environment details (OS, Node version)
   - Sample MBOX file size and characteristics (if relevant)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (ES6+)** with Node.js
- **ESLint** for code quality
- Consistent naming conventions and code structure

Before submitting:
```bash
# Install dependencies
npm install

# Run the application
npm start

# Test with sample MBOX file in sources/ directory
```

### Coding Standards

1. **Modular design**: Use service-oriented architecture (services, models, utils)
2. **Error handling**: All errors must include unique error codes (format: `(1000XXX)`)
3. **Clear naming**: Use descriptive names for classes, methods, and variables
4. **Comments**: Add comments for complex logic and business rules
5. **Validation**: Validate all inputs and intermediate results
6. **Logging**: Use the logging utilities consistently throughout the codebase

### Project Structure

The project follows a layered architecture:
- **scripts/**: Entry points for different operations (crawl, backup)
- **logics/**: Orchestrates the process flow
- **services/**: Business logic for each step (scan, crawl, merge, validate)
- **models/**: Data models representing entities
- **utils/**: Utility functions (file, email, text, validation)
- **enums/**: Enumeration constants
- **settings/**: Application configuration

### Adding New Features

When adding new features:
1. Follow the existing architecture patterns
2. Create appropriate models in `src/core/models/`
3. Add service logic in `src/services/`
4. Update settings in `src/settings/settings.js` if needed
5. Add validation and error handling with unique error codes
6. Test with various MBOX file sizes and formats
7. Update documentation

### Error Code Management

When adding new errors:
1. Use sequential error codes starting from 1000012 (next available)
2. Format: `(1000XXX)` at the end of the error message
3. Be descriptive in error messages
4. Include relevant context data in logs

### Testing Guidelines

1. Test with various MBOX file sizes (small, medium, large)
2. Test edge cases: empty files, malformed emails, special characters
3. Verify memory usage with large files
4. Check that all output TXT files are generated correctly
5. Validate the summary statistics match actual results

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
