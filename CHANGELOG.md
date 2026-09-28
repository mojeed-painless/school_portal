# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-09-28

### Added
- Bank account validation helper for bills and supporting component tests.
- Spreadsheet score calculation helpers and centralized percentage logic.
- Student search and debounce utilities for filtered lookups.
- Approval workflow state transitions for result approval handling.

### Changed
- Improved validation boundaries around UI and result-processing helpers.
- Standardized score and approval logic into reusable helpers for more predictable behavior.

### Fixed
- Prevented invalid bank data from being treated as valid account information.
- Hardened handling of invalid or incomplete score values.
