# Bhaktamar Stotra App - Deployment Guide

## 📱 App Store Deployment Preparation

### Current Status
✅ **App Features Complete**
- Complete Bhaktamar Stotra with all 48 verses
- Sanskrit text with transliterations
- Hindi and English meanings
- Font size controls (4 levels)
- Samputt reading feature
- Responsive design for mobile devices

✅ **Technical Setup**
- React Native with Expo SDK 53
- React 19.1.0 (compatible version)
- TypeScript for type safety
- Tested on Android device successfully

### Required Assets (To Be Created)

#### 1. App Icon Requirements
- **iOS**: 1024x1024px PNG (no transparency, no rounded corners)
- **Android**: 1024x1024px PNG (adaptive icon)
- **Suggested Design**: 
  - Sacred Om symbol (🕉️) or Jain symbol
  - Spiritual colors: Brown (#8B4513) and Wheat (#F5DEB3)
  - Clean, recognizable design

#### 2. Splash Screen Requirements
- **Size**: 1242x2436px PNG (iPhone X resolution)
- **Background**: Cream color (#f8f6f0) matching app theme
- **Content**: App name "Bhaktamar Stotra" with spiritual symbol

#### 3. App Store Screenshots (Required)
- **iPhone**: 6.7" display (1290x2796px) - at least 3 screenshots
- **Android**: Various sizes for Google Play
- **Suggested Screenshots**:
  1. Home screen with app features
  2. Verse reading screen with Sanskrit text
  3. Samputt feature demonstration
  4. Font size controls in action

### Build Process

#### Step 1: Install EAS CLI
```bash
npm install -g @expo/eas-cli
```

#### Step 2: Login to Expo
```bash
eas login
```

#### Step 3: Configure Project
```bash
eas build:configure
```

#### Step 4: Build for Production

**For Android (APK):**
```bash
eas build --platform android --profile production
```

**For iOS (IPA):**
```bash
eas build --platform ios --profile production
```

### App Store Submission Requirements

#### Apple App Store
1. **Apple Developer Account** ($99/year)
2. **App Store Connect** setup
3. **Bundle Identifier**: `com.bhaktamarstotra.app`
4. **App Category**: Education or Lifestyle
5. **Content Rating**: 4+ (suitable for all ages)
6. **Privacy Policy**: Required (even if app doesn't collect data)

#### Google Play Store
1. **Google Play Console** account ($25 one-time fee)
2. **Package Name**: `com.bhaktamarstotra.app`
3. **App Category**: Education or Books & Reference
4. **Content Rating**: Everyone
5. **Privacy Policy**: Required

### App Store Listing Information

#### App Name
**Bhaktamar Stotra - Sacred Jain Prayer**

#### Short Description (80 characters)
**Complete Bhaktamar Stotra with Sanskrit, Hindi & English translations**

#### Full Description
```
Bhaktamar Stotra - Sacred Jain Prayer

Experience the divine verses of Bhaktamar Stotra, one of the most revered Jain prayers, in this comprehensive digital companion.

✨ FEATURES:
• Complete 48 verses in original Sanskrit
• Accurate transliterations for proper pronunciation  
• Hindi and English meanings for deeper understanding
• Adjustable font sizes for comfortable reading
• Unique Samputt reading feature for enhanced spiritual practice
• Clean, spiritual interface designed for devotion
• Offline access - no internet required

🕉️ SAMPUTT FEATURE:
Practice the traditional Samputt method by selecting any verse to repeat between each verse of the stotra, creating a powerful meditative experience.

📖 PERFECT FOR:
• Daily prayer and meditation
• Learning Sanskrit pronunciation
• Understanding verse meanings
• Spiritual study and practice
• Jain community members and devotees

This app preserves the sacred tradition of Bhaktamar Stotra in digital format, making it accessible to devotees worldwide while maintaining the authenticity and reverence of the original text.

No ads, no data collection - purely focused on spiritual practice.
```

#### Keywords
- bhaktamar stotra
- jain prayer
- sanskrit
- devotional
- spiritual
- meditation
- prayer book
- jainism
- sacred text
- religious

### Privacy Policy Template

Since the app doesn't collect any user data, here's a simple privacy policy:

```
Privacy Policy for Bhaktamar Stotra App

This app does not collect, store, or transmit any personal information or user data. All content is stored locally on your device. We do not use analytics, advertising, or any third-party services that would access your data.

The app operates entirely offline and does not require internet connectivity after installation.

Contact: [your-email@example.com]
Last updated: [current-date]
```

### Next Steps

1. **Create App Assets** (icons, splash screen, screenshots)
2. **Set up Developer Accounts** (Apple/Google)
3. **Build Production Apps** using EAS
4. **Test Production Builds** on devices
5. **Submit to App Stores** with proper metadata
6. **Monitor Review Process** and respond to feedback

### Estimated Timeline
- Asset creation: 1-2 days
- Developer account setup: 1-2 days  
- Build and test: 1 day
- Store submission: 1 day
- Review process: 1-7 days (Apple), 1-3 days (Google)

**Total: 1-2 weeks from start to live on stores**
