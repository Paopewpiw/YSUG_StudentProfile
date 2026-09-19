# Student Profile

## 1. Project Description

This project is a responsive Student Profile application developed using HTML, CSS, JavaScript, and Apache Cordova. It displays information about a student, including their background, skills, projects, and contact information.

The application was developed as part of the student's activities in learning web development and Cordova application development.

## 2. Application Pages

### Profile

The Profile page serves as the homepage of the application. It displays the student's name, course, year level, About Me information, and skills.

### About

The About page provides information about the student's background, interests, educational background, and goals.

### Skills

The Skills page displays the technical and personal skills that the student is developing.

### Projects

The Projects page presents projects created by the student and the technologies used in each project.

### Contact

The Contact page provides the student's contact information and contains a contact form layout.

## 3. Profile Editing

The Profile page includes an Edit Profile function.

The user can modify:

- Full Name
- Course
- Year Level
- About Me
- Skills

After selecting Edit Profile, an editing form is displayed. The user can select Save to apply the changes or Cancel to discard them.

## 4. JavaScript Functionality

JavaScript is used to make the Student Profile interactive.

It handles:

- Edit Profile form handling
- User input validation
- Dynamic profile updates
- Saving profile information
- Canceling profile edits

The JavaScript updates the displayed profile without requiring changes to the HTML source code.

## 5. Local Data Storage

The application uses `localStorage` to store the student's profile information.

The saved information includes:

- Full Name
- Course
- Year Level
- About Me
- Skills

When the application starts, JavaScript retrieves the saved information from `localStorage`. If no saved information exists, the application displays the default profile information.

This allows the updated profile to remain available after closing and reopening the application.

## 6. Responsive Design

The application uses responsive HTML and CSS to support different screen sizes.

The layout adapts to:

- Desktop
- Tablet
- Mobile

CSS media queries are used to adjust the layout, navigation, cards, buttons, and form elements for smaller screens.

## 7. How to Run

1. Clone or download the repository.
2. Open the project folder.
3. Make sure Apache Cordova and the required Android development tools are installed.
4. Open the project using Android Studio or a terminal.
5. Build the Cordova application.
6. Run the application on an Android emulator or connected Android device.

## 8. Screenshots
<img width="677" height="674" alt="Screenshot 2026-09-19 183823" src="https://github.com/user-attachments/assets/3509e5b7-cecd-4304-9e51-b80b814660ea" />
<img width="603" height="642" alt="Screenshot 2026-09-19 184058" src="https://github.com/user-attachments/assets/bc5732f6-923c-4536-b296-252dc24c2265" />
<img width="649" height="689" alt="Screenshot 2026-09-19 184115" src="https://github.com/user-attachments/assets/02246145-c760-43f0-9d6e-9d81759ba3e3" />
<img width="592" height="674" alt="Screenshot 2026-09-19 184125" src="https://github.com/user-attachments/assets/7ab701bb-e21d-4936-84a4-f5decfead82d" />
<img width="605" height="665" alt="Screenshot 2026-09-19 184135" src="https://github.com/user-attachments/assets/2aed2bc0-edb8-4c45-ac65-8b897ee9ac39" />


Example Cordova commands:

```bash
cordova platform add android
cordova build android
cordova run android

