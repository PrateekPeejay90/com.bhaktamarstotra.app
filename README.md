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

- `src/screens/`: app screens for home, verse browsing, search, and Samputt reading
- `src/components/`: reusable UI for menus, search, and results
- `src/contexts/`: theme, language, and font-size state
- `assets/data.json`: local Bhaktamar Stotra data
- `android/`: native Android project used for emulator, device, and AAB builds
- `public/privacy-policy.html`: hostable privacy policy for web and Play Console use

## Local Testing

See [docs/LOCAL_TESTING.md](docs/LOCAL_TESTING.md) for emulator, USB device, Wi-Fi, and web instructions.

## Android Release

See [docs/ANDROID_RELEASE.md](docs/ANDROID_RELEASE.md) for bundle signing, Play App Signing, and production AAB creation.
See [docs/RELEASE_KEYSTORE.md](docs/RELEASE_KEYSTORE.md) for creating the local upload keystore.

## Google Play Compliance

See [docs/PLAY_STORE_CHECKLIST.md](docs/PLAY_STORE_CHECKLIST.md) for the store listing and policy checklist.
See [docs/STORE_LISTING.md](docs/STORE_LISTING.md) for suggested Play Console listing text and declaration answers.

## Theme Notes

The app now uses a shared Material 3-style color system centered on these pairings:

- `primary / onPrimary`: `#8B4513 / #FFFFFF`
- `primaryContainer / onPrimaryContainer`: `#F4DCC8 / #3A1F0B`
- `secondaryContainer / onSecondaryContainer`: `#F4E0C8 / #40220A`
- `surface / onSurface`: `#FFF8F1 / #2C2318`

## Remaining Manual Steps

- Host `public/privacy-policy.html` at a public URL and enter it in Play Console
- Export Play Store graphics, including a `512x512` icon, `1024x500` feature graphic, and phone screenshots
- Configure the Android release keystore outside the repository before shipping to Google Play
