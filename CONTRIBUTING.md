## Git Commit & Testing Discipline

To ensure the repository history remains clean, mineable, and traceable, all contributions must adhere to the following strict rules:

### 1. Atomic Commit Principle

* **One Feature/Fix Per Commit:** Every commit must represent a single, logically complete feature, fix, or chore.
* **No Bulk/Mixed Commits:** Never combine code formatting, architectural refactoring, and feature changes in a single commit. Separate refactorings into a pre-requisite commit before adding new features.

### 2. Mandatory Test Pairing

* **Tests and Code Land Together:** Every feature addition, logic fix, or component modification in `src/` must include its corresponding unit/integration test (`*.test.jsx` or `*.test.js`) in the **EXACT same commit**.
* **No Follow-up Test Commits:** PRs containing implementation changes without matching test assertions in the same commit will be rejected.

#### Standard Commit Example:

```bash
git commit -m "feat(academics): extract grade calculation helper with unit test coverage"
```
