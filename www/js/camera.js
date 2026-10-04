const defaultProfilePicture = "hagok.jpg";

async function loadProfilePicture() {
    const profilePicture = document.getElementById("profilePicture");
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
        const response = await fetch(API_URL + "/api/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const profile = await response.json();

        if (response.ok && profile.profilePicture) {
            profilePicture.src = profile.profilePicture;
        } else {
            profilePicture.src = defaultProfilePicture;
        }
    } catch (error) {
        console.error("Unable to load profile picture:", error);
        profilePicture.src = defaultProfilePicture;
    }
}


function takeProfilePicture() {
    navigator.camera.getPicture(
        cameraSuccess,
        cameraError,
        {
            quality: 70,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true
        }
    );
}


/*
    IMPORTANT:
    This function is NOT async.
    Cordova Camera requires a normal function as the success callback.
*/
function cameraSuccess(imageData) {
    const imageSource = "data:image/jpeg;base64," + imageData;

    document.getElementById("profilePicture").src = imageSource;

    saveProfilePicture(imageSource);
}


async function saveProfilePicture(imageSource) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You must be logged in.");
        return;
    }

    try {
        const profileResponse = await fetch(API_URL + "/api/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const profile = await profileResponse.json();

        if (!profileResponse.ok) {
            alert("Unable to load your profile.");
            return;
        }

        const response = await fetch(API_URL + "/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                fullName: profile.fullName,
                course: profile.course,
                yearLevel: profile.yearLevel,
                about: profile.about,
                skills: profile.skills,
                profilePicture: imageSource
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to save profile picture.");
            return;
        }

        localStorage.setItem("profilePicture", imageSource);

        alert("Profile picture updated successfully!");

    } catch (error) {
        console.error("Unable to save profile picture:", error);
        alert("Unable to save the profile picture.");
    }
}


function cameraError(message) {
    console.log("Camera cancelled or failed:", message);

    if (message === "Camera cancelled.") {
        return;
    }

    alert("Unable to access the camera. Please check your device permissions.");
}


document.addEventListener("deviceready", function() {
    loadProfilePicture();
}, false);