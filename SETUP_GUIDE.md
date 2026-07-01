# WORDUP Setup Guide for Windows + Android Studio

This guide helps you run the new WORDUP mobile app on your PC and Android device/emulator.

## 1. Install Node.js

Download and install the **LTS** version from:

```txt
https://nodejs.org
```

During installation, make sure **Add to PATH** is selected.

After installation, close Command Prompt completely and open it again.

Check:

```cmd
node -v
npm -v
```

You should see version numbers. If `npm` is still not recognized, restart your PC.

---

## 2. Install Expo Go on your phone

For the easiest testing method, install **Expo Go** from the Google Play Store.

This lets you test WORDUP without building an APK first.

---

## 3. Open the WORDUP folder

In Command Prompt or PowerShell, go to the project folder:

```cmd
cd path\to\WORDUP
```

Example:

```cmd
cd C:\Users\YourName\Desktop\WORDUP
```

Check that you are in the right folder:

```cmd
dir
```

You should see:

```txt
App.tsx
package.json
app.json
src
assets
```

---

## 4. Install app dependencies

Run:

```cmd
npm install
```

If it completes successfully, continue.

If you see errors, copy the exact error and send it to me.

---

## 5. Start WORDUP

Run:

```cmd
npm start
```

Expo will open a development screen and show a QR code.

### To test on your phone

1. Make sure your phone and PC are on the same Wi-Fi.
2. Open Expo Go on your phone.
3. Scan the QR code.
4. WORDUP should open on your phone.

---

## 6. Run with Android Studio emulator

If you want to use Android Studio emulator:

1. Open Android Studio.
2. Start an Android emulator.
3. In the WORDUP folder, run:

```cmd
npm run android
```

Expo should open WORDUP in the emulator.

---

## 7. Useful commands

Start Expo:

```cmd
npm start
```

Run Android:

```cmd
npm run android
```

Check TypeScript:

```cmd
npm run typecheck
```

Stop Expo:

```cmd
Ctrl + C
```

---

## 8. Current WORDUP features

The current MVP includes:

```txt
Custom sword-and-heart icon
Splash screen
Onboarding
30 daily devotions
90 quiz questions
30 guided prayers
Searchable prayer section
Prayer request tracking
Answered prayer tracking
Voice reading with expo-speech
Daily reminder time drop-down
Memory verse practice
Progress stats
Colourful medal-like badges
Badge unlock celebrations
Animated onboarding, prayers, completion flow, and medals
```

---

## 9. Important note about voice reminders

WORDUP can speak automatically while the app is open.

If the app is fully closed, Android usually requires a notification first. The MVP flow is:

```txt
Reminder notification appears
User taps notification
WORDUP opens
Greeting and verse are spoken aloud
```

True background voice speaking while the app is closed can be added later with native Android code.

---

## 10. Building APK later

For testing, use Expo Go first.

When we are ready to create an APK or Play Store build, we will use Expo EAS Build:

```cmd
npm install -g eas-cli
eas login
eas build -p android
```

We will handle this after the app has been tested.
