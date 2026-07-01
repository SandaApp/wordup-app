# Bible Search Fix

This update fixes the “excessive number of pending callbacks” issue that could appear while searching Bible references.

## Changes

- Added debounced search so the app waits briefly before searching while the user types.
- Reduced search animation delays to prevent too many queued animation callbacks.
- Added direct Bible reference handling, e.g.:
  - John 3:16
  - Psalm 23
  - Romans 8:28
  - 1 Corinthians 13
- Reduced default search result limit for smoother performance.
- Optimized chapter/reference lookup.

## After extracting

Restart Metro with cache clear:

```cmd
cd C:\Users\David Sanda\Desktop\WORDUP
npm start -- --clear
```
