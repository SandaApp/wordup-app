# APK Startup Fix

This update addresses the APK opening but appearing stuck on the first page.

## Fixes

1. The full KJV Bible data is now lazy-loaded only when the Bible feature is opened.
2. Onboarding is now scrollable, so the Next/Start buttons remain accessible on smaller screens.
3. Startup should be faster because the app no longer parses the entire Bible before onboarding.

## After Applying

Rebuild the APK with EAS, install the new APK, and test first launch again.
