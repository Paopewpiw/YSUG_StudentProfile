# Student Profile Application

A Cordova-based Android student profile application developed for Activity 7. It continues the Activity 6 profile, navigation, editing, and camera features, and adds a Node.js/Express API, MongoDB storage, and token-based login.

## 1. Features

- Login and backend authentication
- Database-driven student profile retrieval
- Profile, About, Skills, Projects, and Contact pages
- Edit Profile: full name, course, year level, About Me, and skills
- Save profile changes to MongoDB
- Cordova Camera Plugin integration for changing the profile picture
- Logout and protected profile access
- Responsive HTML and CSS layout

## 2. Application Pages

- **Login:** authenticates the user through the backend API.
- **Profile:** displays the student's profile information and profile picture, and provides Edit Profile, Change Profile Picture, and Logout actions.
- **About:** provides additional information about the student, including background, interests, education, and goals.
- **Skills:** displays technical and computer-related skills.
- **Projects:** presents student projects and the technologies used.
- **Contact:** displays contact information and a contact-form layout.

## 3. Authentication and Profile Management

The user enters their username and password on the Login page. The backend verifies the credentials and returns an authentication token for a successful login. The app uses the token when requesting protected profile data and updates.

**Login → Backend authentication → Retrieve profile → Display profile**

Invalid credentials should produce an error rather than opening the protected profile. Logging out clears the locally stored authentication information and returns the user to the Login page.

An authenticated user can edit their name, course, year level, About Me text, and skills. Selecting **Save** sends the changes to the backend, which updates the corresponding MongoDB record. The app displays confirmation after a successful update.

## 4. Database and API

The application uses **MongoDB** for persistent profile data and a **Node.js/Express** backend API. Mongoose is used to work with MongoDB.

The architecture is:

**Cordova Android app → Express API → MongoDB**

The profile record includes fields such as username, full name, course, year level, About Me, skills, and profile-picture data/reference. The backend associates profile information with the authenticated user.

The frontend communicates with the API rather than connecting directly to MongoDB. The app uses these API operations:

- `POST /api/login` — authenticate a user.
- `GET /api/profile` — retrieve the authenticated user's profile.
- `PUT /api/profile` — update the authenticated user's profile.
- `GET /api/health` — check whether the API is running.

## 5. CRUD Operations

- **Create:** create a user/profile record through the backend's supported account-creation workflow.
- **Read:** retrieve the authenticated user's profile from MongoDB.
- **Update:** save edits to the authenticated user's profile in MongoDB.
- **Delete:** document and demonstrate the controlled delete operation implemented in the backend, if included in the submitted code. If the current code does not provide a delete endpoint or interface, add a controlled test-record delete operation before claiming full CRUD compliance.

## 6. Camera Integration

The app retains the Activity 6 Cordova Camera Plugin feature. Selecting **Change Profile Picture** calls `navigator.camera.getPicture()` to open the device camera. After capture, the image is displayed in the profile and submitted to the backend as profile-picture data so it can be associated with the user's profile.

The app waits for Cordova's `deviceready` event before loading the saved profile picture and using native Cordova functionality. The quality of the camera preview depends on the device or emulator camera configuration; an emulator without a usable webcam may show an unusable preview.

## 7. Data Persistence

Profile edits are saved through the API to MongoDB. The app can retrieve the updated profile after logout and login, and after the app is restarted, as long as the backend and MongoDB are running and the same database is being used.

The authentication token is stored locally by the app while the user is logged in. Local storage is not a replacement for the database: the backend database is the persistent source for the profile fields.

## 8. Security and Configuration

- Passwords are hashed by the backend and should not be stored as plain text.
- The Cordova app does not connect directly to MongoDB.
- Keep `.env` out of GitHub. Do not commit database credentials, real passwords, or secret keys.
- Use `.env.example` as a template and create a private local `.env` file for the actual configuration.
- The example JWT secret below is only a placeholder; replace it with a private value for local use.

## 9. Requirements

Install the following before running the project:

- Node.js and npm
- MongoDB Community Server, with the MongoDB service running
- Apache Cordova CLI
- Android Studio and the Android SDK
- An Android emulator or a connected Android device

## 10. How to Run

### A. Get the project

Clone the repository, then open CMD in the project folder.

```cmd
cd /d "C:\Coding Stuff\YSUG_StudentProfile"
```

The path above is an example for the original development computer. Use your own project folder path if it differs.

### B. Configure the backend

Open a separate CMD window and enter the backend folder:

```cmd
cd /d "C:\Coding Stuff\YSUG_StudentProfile\backend"
npm install
```

Create a `backend/.env` file using `backend/.env.example` as a template. Configure the local MongoDB connection and a private JWT secret. For the current local setup, the MongoDB URI is:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/ysug_studentprofile
PORT=3000
JWT_SECRET=replace_with_a_private_secret
```

Do not commit the actual `.env` file. Ensure MongoDB is running, and make sure a demonstration account/profile exists in the database. A database on the developer's computer is not automatically included in the Git repository; provide a safe seed/setup script or documented account-creation workflow for a fresh installation.

Start the backend:

```cmd
node server.js
```

Leave this window open. To check the API, open `http://localhost:3000/api/health` in a browser. The expected response is a message indicating that the Student Profile API is running.

### C. Install frontend/Cordova dependencies

Open another CMD window in the project root:

```cmd
cd /d "C:\Coding Stuff\YSUG_StudentProfile"
npm install
```

If the Android platform or camera plugin is not already installed in the local Cordova project, install the configured Android platform and Camera Plugin:

```cmd
cordova platform add android
cordova plugin add cordova-plugin-camera
```

Check the installed plugins:

```cmd
cordova plugin list
```

Do not add the platform/plugin again if they are already configured and installed. Keep `config.xml` and the project `package.json`/lockfile committed so Cordova can reproduce the project setup.

### D. Start and connect the Android emulator

Start an Android emulator in Android Studio's Device Manager, or connect an Android device with USB debugging enabled. Confirm that ADB can see it:

```cmd
adb devices
```

Wait until the emulator/device appears with status `device`. Then run:

```cmd
adb reverse tcp:3000 tcp:3000
```

This project currently uses `http://localhost:3000` for its API URL. The ADB reverse command allows the Android emulator to reach the backend running on the development computer. Run it again after restarting the emulator if necessary.

### E. Build and run

From the project root:

```cmd
cordova build android
cordova run android
```

Keep the backend and MongoDB running while using the app.

## 11. Test Accounts

Use only demonstration accounts created specifically for this project. Do not use personal university or other account credentials.

A fresh MongoDB installation will not automatically contain the developer's local test account. Create or seed a demonstration account using the project's supported backend workflow before testing login. Do not publish a password hash, secret key, or private credentials in this README.

## 12. Testing

The following Activity 7 checks were performed during development:

| Test | Expected result | Status |
|---|---|---|
| Valid login | Valid credentials open the profile | Passed |
| Invalid login | Incorrect credentials are rejected with an error message | Passed |
| Profile retrieval | Profile information is retrieved from the database | Passed |
| Edit profile | Saved edits update the database record | Passed |
| Verify update | Updated information remains after logout and login | Passed |
| Camera | Camera opens, capture callback runs, and image data is submitted for saving | Passed; emulator preview is limited without a usable webcam |
| Logout | User returns to Login and must authenticate again to access protected functionality | Passed |
| Data persistence | Saved profile is retrieved after app restart and login | Passed |



## 13. Screenshots



<img width="1819" height="3178" alt="test" src="https://github.com/user-attachments/assets/836a3b21-c33f-4fc0-a28c-de46e8155771" />
