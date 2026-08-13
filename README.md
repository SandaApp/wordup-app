# Sanda's WordUp

**Daily Scripture. Prayer & Growth.**  
**Turning screen time into Scripture time.**

Sanda's WordUp is an Expo React Native (TypeScript) Android app for families, teens, young adults, and individuals — offline KJV Bible, daily devotion, prayer, memory verses, and spiritual habit-building.

Developed by **Bishop Dr. David Sanda** for the glory of Jesus.

Inspired by **Psalm 119:11** — *Thy word have I hid in mine heart, that I might not sin against thee.*

Logo: vertical golden sword in a blue heart (do not redesign or slant).

- **Website:** https://davidsanda.com/wordup/  
- **Privacy:** https://davidsanda.com/wordup/privacy.html  
- **Repo:** https://github.com/SandaApp/wordup-app  

## Identity

| Field | Value |
|-------|--------|
| Display name | Sanda's WordUp |
| version | 1.0.0 |
| Android applicationId | `com.davidsanda.wordup` |

## Features (v1.0.0)

- Animated intro & onboarding  
- Daily devotion, verse of the day, spoken greeting  
- Offline KJV Bible reader + search (full text)  
- Words of Christ in red  
- Save, highlight, speak, and share verses  
- Guided prayers & private prayer requests  
- Memory practice, quizzes, streaks, badges  
- Reminder scheduling · Individual/Family mode  

## Size notes

Release builds exclude concept art and emulator ABIs, use a compact KJV JSON shape, minify with R8, and ship a smaller in-app logo asset. Full Scripture and features are retained. See `WORDUP_HANDOVER.md`.

## Quick start

```bash
npm install
npm start
```

```bash
npm run android
npm run typecheck
```

## EAS Build

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
eas build -p android --profile production
```

## Google Play

See:

- [`WORDUP_HANDOVER.md`](./WORDUP_HANDOVER.md)  
- [`release/play-store/STORE_LISTING_CHECKLIST.md`](./release/play-store/STORE_LISTING_CHECKLIST.md)  
- [`release/play-store/BUILD_AND_SUBMIT.md`](./release/play-store/BUILD_AND_SUBMIT.md)  
- [`WORDUP_VISION.md`](./WORDUP_VISION.md)  

## Principles

1. Scripture stays central.  
2. Words of Christ in red are core.  
3. Prayer requests are private by default (on-device).  
4. Family- and youth-friendly.  
5. Redirect screen time toward spiritual value.

## License

See `LICENSE.txt`.
