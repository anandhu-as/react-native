HabitTracker - React Native

A simple habit tracking mobile app built with React Native and Expo to help you create, track, and maintain daily habits.
This project uses Appwrite for backend services including authentication and database, making it a full-stack beginner-friendly project.

🏗️ Features

User Authentication – Sign up, log in, and manage users using Appwrite

Habit Management – Add, update, and delete habits

Track Daily Progress – Mark habits as complete each day

Simple and Clean UI – Easy to use and responsive

Built with React Native, TypeScript, and Expo

💻 Tech Stack

React Native – Cross-platform mobile development

Expo – Simplifies building and testing the app

TypeScript – Type safety and better code quality

Appwrite – Backend services (database & authentication)

React Navigation – For app navigation

🚀 Getting Started

1. Clone the repository
   git clone https://github.com/anandhu-as/HabitTracker-react-native.git
   cd HabitTracker-react-native

2. Install dependencies
   npm install

# or

yarn install

3. Configure Appwrite

Create an Appwrite project at https://appwrite.io

Set up a database for habits and a users collection

Update your Appwrite endpoint and project ID in your app (e.g., in a config file)

4. Run the app
   npx expo start

Open the app in an emulator or Expo Go on your device.

📂 Project Structure
HabitTracker-react-native/
│
├── App.tsx # Main entry point
├── package.json # Project configuration
├── assets/ # Images and other static assets
├── components/ # Reusable UI components
├── screens/ # App screens
├── navigation/ # Navigation setup
└── services/ # Appwrite API integration

🛠️ Future Improvements

Add habit reminders & notifications

Show streaks and progress charts

Offline support and local caching

Dark mode UI

More polished animations and UI
