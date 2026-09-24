const defaultProfilePicture = "hagok.jpg";


// Load saved profile picture
function loadProfilePicture() {

    const savedPicture = localStorage.getItem("profilePicture");

    const profilePicture =
        document.getElementById("profilePicture");

    if (savedPicture) {
        profilePicture.src = savedPicture;
    } else {
        profilePicture.src = defaultProfilePicture;
    }
}


// Open the camera
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


// Camera success
function cameraSuccess(imageData) {

    const imageSource =
        "data:image/jpeg;base64," + imageData;

    document.getElementById("profilePicture").src =
        imageSource;

    localStorage.setItem(
        "profilePicture",
        imageSource
    );

    alert("Profile picture updated successfully!");
}


// Camera error or cancellation
function cameraError(message) {

    console.log("Camera cancelled or failed:", message);

    if (message === "Camera cancelled.") {
        return;
    }

    alert(
        "Unable to access the camera. " +
        "Please check your device permissions."
    );
}


// Wait until Cordova is ready
document.addEventListener(
    "deviceready",
    function() {
        loadProfilePicture();
    },
    false
);