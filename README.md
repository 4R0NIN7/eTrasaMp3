# 🎧 eTrasaMP3

**eTrasaMP3** is a React Native mobile application that plays MP3 audio files based on the user’s GPS location. When a user approaches predefined geographic points, the app triggers playback of the corresponding audio file.

---

## 🚀 Features

- 📍 Background GPS location tracking
- 🔊 Automatic MP3 playback when near a defined geofence
- 🔒 Runtime permissions handling
- 💤 Background fetch to manage updates
- 🔄 React Native lifecycle integration (start/stop audio with location)
- ✅ Tests and commit validation via Jest, Husky, and Commitlint

---

## 📦 Major Libraries

| Purpose                | Package(s) Used                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Core framework         | `react-native`, `react`                                                                                    |
| Audio playback         | `expo-audio`                                                                                               |
| Background geolocation | `react-native-background-geolocation`, `react-native-background-fetch`, `react-native-geolocation-service` |
| Permissions            | `react-native-permissions`                                                                                 |
| Animation              | `react-native-reanimated`                                                                                  |
| Utility                | `lodash`                                                                                                   |
| Dev tools              | `jest`, `@testing-library/react-native`, `husky`, `commitlint`, `eslint`, `prettier`, `patch-package`      |

---

## 🛠️ Getting Started

### 1. Install dependencies

```sh
yarn install
```

### 2. Install iOS pods (macOS only)

```sh
cd ios
bundle install
bundle exec pod install
```

---

## 📱 Running the App

### Start Metro

```sh
yarn start
```

### Android

```sh
yarn android
```

### iOS

```sh
yarn ios
```

---

## 🧪 Testing

Run all Jest tests:

```sh
yarn test
```

---

## 💅 Linting & Formatting

```sh
yarn lint         # Run ESLint
yarn prettier .   # Run Prettier manually
```

Linting and formatting also run automatically via `lint-staged` on each commit.

---

## 🔐 Git Hooks & Commit Conventions

### Commitlint + Husky

This project uses **Husky** and **Commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).

Sample valid commit:

```sh
feat: add geofence audio trigger
```

### Supported types

- `feat`: New feature
- `fix`: Bug fix
- `test`: Add or fix tests
- `chore`: Tooling, scripts
- `docs`: Documentation change
- `refactor`: Refactor code
- `style`: Lint/formatting

---

## 📦 Production Build

### Android Release APK

```sh
yarn build:release
yarn install:apk  # Optional: Installs release APK on connected device
```

### Manual Bundle (optional)

```sh
yarn bundle
```

---

## ⚙️ Project Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `yarn android`       | Run app on Android               |
| `yarn ios`           | Run app on iOS                   |
| `yarn start`         | Start Metro bundler              |
| `yarn test`          | Run unit tests                   |
| `yarn lint`          | Lint the code                    |
| `yarn build:release` | Create Android release build     |
| `yarn install:apk`   | Install APK to connected Android |
| `yarn bundle`        | Generate JS bundle for Android   |

---

## 🔎 Troubleshooting

- Android Studio/Emulator issues? Try `adb reverse tcp:8081 tcp:8081`
- iOS issues? Try `cd ios && xcodebuild clean`
- Metro not responding? `yarn start --reset-cache`

---

## 🧠 Learn More

- [React Native Docs](https://reactnative.dev)
- [Expo Audio](https://docs.expo.dev/versions/latest/sdk/audio/)
- [React Native Background Geolocation](https://github.com/transistorsoft/react-native-background-geolocation)
- [Jest Testing Docs](https://jestjs.io/)
- [Husky Docs](https://typicode.github.io/husky/)
- [Commitlint Docs](https://commitlint.js.org)

---

## 🎉 Happy Mapping & Listening
