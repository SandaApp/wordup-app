# Onboarding Button Visibility Fix

This update fixes the APK appearing stuck on “Step 1 of 4 Welcome to WORDUP”.

## What Changed

- The onboarding Next/Skip/Start buttons are now in a fixed bottom footer.
- The icon and card were made more compact.
- The onboarding content still scrolls if needed, but the buttons remain visible at all times.

## After Applying

Rebuild a new APK:

```cmd
cd C:\Users\David Sanda\Desktop\WORDUP
eas build -p android --profile preview
```

Install the new APK and test first launch.
