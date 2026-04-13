# Local Testing

## Android Emulator

1. Install Android Studio and create an emulator.
2. Run `npm install`.
3. Start Metro with `npm run start`.
4. In another terminal run `npm run android`.

## Physical Android Device Over USB

1. Enable Developer Options and USB debugging on the phone.
2. Connect the device with USB.
3. Verify the device with `adb devices`.
4. Start Metro with `npm run start`.
5. Run `adb reverse tcp:8081 tcp:8081`.
6. Build and install with `npm run android`.

## Physical Android Device Over Wi-Fi

1. Start Metro with `npm run start`.
2. Shake the device or open the developer menu.
3. Set the debug server host to `<your-computer-ip>:8081`.
4. Keep both devices on the same network.

## Web

1. Run `npm install`.
2. Start the web app with `npm run web`.
3. Open `http://localhost:8080`.
4. The privacy policy is also available at `http://localhost:8080/privacy-policy.html`.

## What To Verify

- Home, verse list, verse detail, search, and Samputt flows
- Swipe navigation on verse detail and Samputt screens
- Font size persistence after app restart
- Language switching between English and Hindi
- Drawer navigation to the About and Privacy screen
