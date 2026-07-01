# WORDUP

**Daily Scripture. Prayer & Growth.**

WORDUP is an Expo React Native mobile app designed for families, teens, young adults, and individuals who want to grow closer to God through daily Scripture, prayer, memory verses, and spiritual habit-building.

## MVP Features Included in This Scaffold

- Today screen with verse, devotion, reflection, prayer, and challenge
- Read-aloud support using `expo-speech`
- Prayer screen with guided prayers and private prayer requests
- Memory verse practice
- Progress tracking with local device storage
- Settings screen for reminder time and spoken greeting toggle
- Notification service starter for daily verse reminders

## Setup

Install Node.js LTS first. Then open this folder in your terminal:

```bash
cd WORDUP
npm install
npm start
```

To run on Android:

```bash
npm run android
```

You can also install the Expo Go app on your Android phone and scan the QR code shown by Expo.

## Important Note About Automatic Voice Reminders

Expo can speak automatically when the app is open. If the app is fully closed, Android normally requires a notification first. In the MVP, the notification appears at the selected time. When the user opens it, WORDUP speaks the greeting and verse.

True background voice playback while the app is closed can be added later with native Android code.
