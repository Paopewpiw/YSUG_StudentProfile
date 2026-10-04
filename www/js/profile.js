function getToken() {
    return localStorage.getItem("token");
}

// ===============================
// GET TOKEN
// ===============================

function getToken() {

    return localStorage.getItem("token");

}


// ===============================
// LOAD PROFILE FROM DATABASE
// ===============================

async function getProfile() {

    const token = getToken();

    if (!token) {

        window.location.href = "login.html";

        return null;
    }


    try {

        const response =
            await fetch(
                API_URL + "/api/profile",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );


        const profile =
            await response.json();


        if (!response.ok) {

            alert(
                profile.message ||
                "Unable to load profile."
            );

            localStorage.removeItem("token");

            window.location.href =
                "login.html";

            return null;
        }


        return profile;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server."
        );

        return null;
    }
}


// ===============================
// DISPLAY PROFILE
// ===============================

function displayProfile(profile) {

    if (!profile) {
        return;
    }


    document.getElementById(
        "profileName"
    ).textContent =
        profile.fullName;


    document.getElementById(
        "profileCourse"
    ).textContent =
        profile.course;


    document.getElementById(
        "profileYear"
    ).textContent =
        profile.yearLevel;


    document.getElementById(
        "profileAbout"
    ).textContent =
        profile.about;


    const skillsList =
        document.getElementById(
            "profileSkills"
        );


    skillsList.innerHTML = "";


    const skills =
        profile.skills
            ? profile.skills.split(",")
            : [];


    skills.forEach(function(skill) {

        const li =
            document.createElement("li");


        li.textContent =
            skill.trim();


        skillsList.appendChild(li);

    });


    // Update profile picture
    if (profile.profilePicture) {

        document.getElementById(
            "profilePicture"
        ).src =
            profile.profilePicture;
    }

}


// ===============================
// EDIT PROFILE
// ===============================

async function editProfile() {

    const profile =
        await getProfile();


    if (!profile) {
        return;
    }


    document.getElementById(
        "fullName"
    ).value =
        profile.fullName;


    document.getElementById(
        "course"
    ).value =
        profile.course;


    document.getElementById(
        "yearLevel"
    ).value =
        profile.yearLevel;


    document.getElementById(
        "aboutMe"
    ).value =
        profile.about;


    document.getElementById(
        "skills"
    ).value =
        profile.skills;


    document.getElementById(
        "profileView"
    ).style.display =
        "none";


    document.getElementById(
        "editProfile"
    ).style.display =
        "block";

}


// ===============================
// CANCEL EDIT
// ===============================

function cancelEdit() {

    document.getElementById(
        "editProfile"
    ).style.display =
        "none";


    document.getElementById(
        "profileView"
    ).style.display =
        "block";

}


// ===============================
// SAVE PROFILE TO MONGODB
// ===============================

async function saveProfile(event) {

    event.preventDefault();


    const fullName =
        document.getElementById(
            "fullName"
        ).value.trim();


    const course =
        document.getElementById(
            "course"
        ).value.trim();


    const yearLevel =
        document.getElementById(
            "yearLevel"
        ).value.trim();


    const aboutMe =
        document.getElementById(
            "aboutMe"
        ).value.trim();


    const skills =
        document.getElementById(
            "skills"
        ).value.trim();


    // Validation
    if (fullName === "") {

        alert(
            "Please enter your full name."
        );

        return;
    }


    if (course === "") {

        alert(
            "Please enter your course."
        );

        return;
    }


    if (yearLevel === "") {

        alert(
            "Please enter your year level."
        );

        return;
    }


    if (aboutMe === "") {

        alert(
            "Please enter your About Me information."
        );

        return;
    }


    if (skills === "") {

        alert(
            "Please enter your skills."
        );

        return;
    }


    const token =
        getToken();


    try {

        const response =
            await fetch(
                API_URL + "/api/profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token
                    },

                    body: JSON.stringify({

                        fullName:
                            fullName,

                        course:
                            course,

                        yearLevel:
                            yearLevel,

                        about:
                            aboutMe,

                        skills:
                            skills

                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to save profile."
            );

            return;
        }


        // Update local user information
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        // Display updated profile
        displayProfile(data.user);


        // Return to profile view
        document.getElementById(
            "editProfile"
        ).style.display =
            "none";


        document.getElementById(
            "profileView"
        ).style.display =
            "block";


        alert(
            "Profile saved successfully!"
        );


    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server."
        );

    }

}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href =
        "login.html";

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        // Check login
        if (!getToken()) {

            window.location.href =
                "login.html";

            return;
        }


        const profile =
            await getProfile();


        if (profile) {

            displayProfile(profile);

        }


        document.getElementById(
            "profileForm"
        ).addEventListener(
            "submit",
            saveProfile
        );

    }
);