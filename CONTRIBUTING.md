# Contributing to CampusFix

Thank you for your interest in contributing to CampusFix!

CampusFix is a campus issue reporting and tracking application built with HTML, CSS, JavaScript, Python, Flask, and SQLite.

We welcome bug reports, feature suggestions, documentation improvements, and code contributions.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork to your computer.
3. Create a Python virtual environment.
4. Install the dependencies listed in `backend/requirements.txt`.
5. Run the Flask backend and open the frontend using a local development server.
6. Run the existing tests before making changes.

## Development Guidelines

- Keep changes focused and easy to review.
- Follow the existing project structure and coding style.
- Use clear and descriptive variable and function names.
- Do not commit passwords, secret keys, or other sensitive information.
- Do not commit local databases, virtual environments, or Python cache files.
- Update the documentation when changing application behavior.
- Avoid unrelated changes to existing functionality.

## Reporting Bugs

Before reporting a bug:

1. Check whether the issue has already been reported.
2. Explain the problem clearly.
3. Include steps to reproduce it.
4. Provide relevant error messages or screenshots when available.

Use the GitHub bug report template when creating an issue.

## Suggesting Features

When suggesting a feature, describe:

- The problem it solves.
- The proposed solution.
- How it would benefit students or administrators.

Use the GitHub feature request template.

## Branching and Commits

Create a separate branch for each change.

Example branch names:

- `feature/issue-search`
- `fix/dashboard-filter`
- `docs/update-readme`

Use clear commit messages, such as:

- `Add issue search functionality`
- `Fix dashboard status filter`
- `Update project documentation`

## Testing

Run the existing test suite from the project root:

```bash
python -m unittest discover -s tests -v
```

Make sure the tests pass before submitting your changes. Add or update tests when appropriate.

## Pull Requests

Before submitting a pull request:

1. Review your changes.
2. Run the tests.
3. Update relevant documentation.
4. Push your branch to your fork.
5. Open a pull request against the original repository's `main` branch.
6. Explain what changed and reference the related issue, if applicable.

Use the pull request template provided in the repository.

## Code of Conduct

Be respectful, constructive, and welcoming to other contributors.

Harassment, personal attacks, and disrespectful behavior are not acceptable.

## Questions

For bugs, feature requests, or project-related questions, open an appropriate GitHub issue.

Thank you for helping improve CampusFix!