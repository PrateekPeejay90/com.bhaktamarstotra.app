# Android Release

## Output Format

Google Play requires an Android App Bundle (`.aab`) for new apps. This project is configured for `bundleRelease` rather than Expo APK builds.

## Versioning

- `applicationId`: `com.bhaktamarstotra.app`
- `targetSdkVersion`: `35`
- `compileSdkVersion`: `35`
- `versionCode`: `1`
- `versionName`: `1.0.0`

## Signing

Do not commit release credentials to the repository.

Provide these Gradle properties locally or in CI:

```properties
BHAKTAMAR_UPLOAD_STORE_FILE=/absolute/path/to/upload-keystore.jks
BHAKTAMAR_UPLOAD_STORE_PASSWORD=...
BHAKTAMAR_UPLOAD_KEY_ALIAS=...
BHAKTAMAR_UPLOAD_KEY_PASSWORD=...
```

You can place them in `~/.gradle/gradle.properties` or inject them through CI secrets.

## Build Commands

```bash
npm install
npm run typecheck
cd android
./gradlew bundleRelease
```

The release bundle is generated at:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

## Play App Signing

Before production release:

1. Enable Play App Signing in Play Console.
2. Upload the generated `app-release.aab`.
3. Keep the upload keystore outside the repository.

## Before Publishing

- Replace placeholder contact details in `public/privacy-policy.html`
- Replace the placeholder PNG assets in `assets/`
- Verify the final app on a physical Android phone
