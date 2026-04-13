# Google Play Checklist

## Required Before Submission

- Android App Bundle (`app-release.aab`)
- Play App Signing enabled
- Hosted privacy policy URL
- Data safety form completed
- Content rating completed
- App category selected
- Store listing text finalized
- Screenshots uploaded
- High-resolution icon uploaded

## Current App Data Position

The app currently stores only language and font-size preferences locally on-device with AsyncStorage.

If that remains true at release time, the expected Data safety posture is:

- No user data collected
- No user data shared
- No analytics
- No advertising
- No account creation

Reconfirm this after every dependency change before answering the Play form.

## Testing Requirement

If the Play Console account is a personal account created after November 13, 2023, expect the current Google Play closed-testing requirement before production access:

- At least 12 opted-in testers
- 14 continuous days of testing

## Asset Checklist

- `assets/icon.png`: real app icon export, not a placeholder
- `assets/adaptive-icon.png`: real Android icon export
- `assets/splash.png`: real splash export
- `assets/favicon.png`: real favicon export
- Phone screenshots for the listing

## Policy Checklist

- Privacy policy page publicly accessible
- In-app About and Privacy screen present
- No misleading permissions
- Package name matches Play Console app record
