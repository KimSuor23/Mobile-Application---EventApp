# 📱 Event Attendance Mobile App

A React Native mobile application developed for the **BIT351 Mobile Application Development** unit at Melbourne Polytechnic. This app allows admins to manage events and participants, while members can view and register for events and mark their attendance.

---

## 🚀 Features

### 👨‍💼 Admin Features:
- Create new events
- Edit and delete events
- View participants for each event
- Mark participants as Present or Absent

### 🧑‍🤝‍🧑 Member Features:
- Login with username (must exist in Firebase)
- View list of upcoming events
- Register or unregister for any event

---

## 📦 Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- Context API for state sharing

---

## 🔧 How to Run

1. Clone this repository:
   
   git clone https://github.com/KimSuor23/Mobile-Application---EventApp.git
   cd Mobile-Application---EventApp
   
2. Install dependencies:

   npm install

3. Start the development server:

   npx expo start

4. Open the app:

   Scan the QR code with Expo Go on your phone, or

   Run it in an Android/iOS simulator

## Firebase Setup
   
   To make the app fully functional, your Firestore must include these collections:

   events

   participants

   members
→ Each member should have at least a name field (used for login)

   Be sure to configure your Firebase connection in: firebase/index.js

## Author   
      
   Name: Kim Sour Liv

   Student ID: s1525783

Project: BIT351 Mobile Application Project – Semester 1, 2025

## License
   
   This project is built for educational purposes only. Not intended for commercial use.

---



    
