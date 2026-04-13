# Bhaktamar Stotra

Bhaktamar Stotra is a React Native application for reading the 48 verses of the Bhaktamar Stotra with Sanskrit text, transliteration, Hindi and English meanings, Samputt reading, search, and adjustable reading preferences.

## Stack

- React Native CLI for Android
- React Native Web for browser testing and static hosting
- React Native Paper for Material 3-inspired theming
- AsyncStorage for local-only reading preferences

## Scripts

```bash
npm install
npm run start
npm run android
npm run web
npm run build:web
npm run bundle:android
npm run typecheck
```

## Project Structure

- `src/screens/`: app screens including the new About and Privacy screen
- `src/components/`: reusable UI for menus, search, and results
- `src/contexts/`: theme, language, and font-size state
- `assets/data.json`: local Bhaktamar Stotra data
- `android/`: native Android project used for emulator, device, and AAB builds
- `public/privacy-policy.html`: hostable privacy policy for web and Play Console use

## Local Testing

See [docs/LOCAL_TESTING.md](docs/LOCAL_TESTING.md) for emulator, USB device, Wi-Fi, and web instructions.

## Android Release

See [docs/ANDROID_RELEASE.md](docs/ANDROID_RELEASE.md) for bundle signing, Play App Signing, and production AAB creation.

## Google Play Compliance

See [docs/PLAY_STORE_CHECKLIST.md](docs/PLAY_STORE_CHECKLIST.md) for the store listing and policy checklist.

## Theme Notes

The app now uses a shared Material 3-style color system centered on these pairings:

- `primary / onPrimary`: `#8B4513 / #FFFFFF`
- `primaryContainer / onPrimaryContainer`: `#F4DCC8 / #3A1F0B`
- `secondaryContainer / onSecondaryContainer`: `#F4E0C8 / #40220A`
- `surface / onSurface`: `#FFF8F1 / #2C2318`

## Remaining Manual Steps

- Replace the placeholder contact details inside `public/privacy-policy.html`
- Export real high-resolution store assets for `assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash.png`, and `assets/favicon.png`
- Configure the Android release keystore outside the repository before shipping to Google Play
