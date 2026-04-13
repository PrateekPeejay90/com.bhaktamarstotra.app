# Dependency Audit Notes

## Before Expo Removal

The last pre-migration audit reported only transitive vulnerabilities, mainly through Expo CLI and related tooling.

## After Expo Removal

Re-run:

```bash
npm audit --omit=dev
```

Then document:

- remaining vulnerabilities
- whether they are production or tooling-only
- which package upgrades resolve them

## Expected Goal

The Expo CLI-related transitive findings should disappear once the repository is fully aligned to the new React Native CLI dependency set.
