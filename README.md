# Fraylon Workspace Mobile

Production-ready mobile shell for Fraylon Workspace, built with Expo + React Native and powered by a branded WebView.

## Quick Start (Expo Go)

1. Install dependencies:

```bash
yarn install
```

2. Create environment file:

```bash
copy .env.example .env
```

3. Start the app:

```bash
yarn start
```

4. Open on your phone:
- Install **Expo Go** (iOS/Android)
- Scan the QR code from the Expo terminal

## Environment

Set your web app URL in `.env`:

```bash
EXPO_PUBLIC_WEB_URL=https://fraylon-workspace.vercel.app
```

Use local web during development if needed:

```bash
EXPO_PUBLIC_WEB_URL=http://localhost:8080
```

## Build For Client Demo

1. Login to Expo:

```bash
npx eas login
```

2. Configure EAS project:

```bash
npx eas init
```

3. Build Android APK/AAB:

```bash
npx eas build --platform android --profile production
```

4. Build iOS:

```bash
npx eas build --platform ios --profile production
```

5. Build both platforms:

```bash
npx eas build --platform all --profile production
```

## Screenshots

Add screenshots to:

- `screenshots/home.png`
- `screenshots/offline.png`
- `screenshots/welcome-modal.png`

Then reference them in this README for client-facing showcase material.

## Deployment URL Placeholder

- Production URL: `https://fraylon-workspace.vercel.app`

