// Default profile information
const defaultProfile = {
    fullName: "Paul Rey A. Ysug",
    course: "Bachelor of Science in Information Technology",
    yearLevel: "3rd Year",
    aboutMe: "I am an Information Technology student interested in networking, technology, gaming, and learning new computer-related skills.",
    skills: "HTML & CSS, JavaScript, Java, Database Management, Problem Solving"
};


// Get saved profile or use default profile
function getProfile() {
    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {
        return JSON.parse(savedProfile);
    }

    return defaultProfile;
}


// Display profile information
function displayProfile() {
    const profile = getProfile();

    document.getElementById("profileName").textContent = profile.fullName;
    document.getElementById("profileCourse").textContent = profile.course;
    document.getElementById("profileYear").textContent = profile.yearLevel;
    document.getElementById("profileAbout").textContent = profile.aboutMe;

    const skillsList = document.getElementById("profileSkills");
    skillsList.innerHTML = "";

    const skills = profile.skills.split(",");

    skills.forEach(function(skill) {
        const li = document.createElement("li");
        li.textContent = skill.trim();
        skillsList.appendChild(li);
    });
}


// Show the Edit Profile form
function editProfile() {
    const profile = getProfile();

    document.getElementById("fullName").value = profile.fullName;
    document.getElementById("course").value = profile.course;
    document.getElementById("yearLevel").value = profile.yearLevel;
    document.getElementById("aboutMe").value = profile.aboutMe;
    document.getElementById("skills").value = profile.skills;

    document.getElementById("profileView").style.display = "none";
    document.getElementById("editProfile").style.display = "block";
}


// Cancel editing
function cancelEdit() {
    document.getElementById("editProfile").style.display = "none";
    document.getElementById("profileView").style.display = "block";
}


// Save profile information
function saveProfile(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const course = document.getElementById("course").value.trim();
    const yearLevel = document.getElementById("yearLevel").value.trim();
    const aboutMe = document.getElementById("aboutMe").value.trim();
    const skills = document.getElementById("skills").value.trim();

    // Validation
    if (fullName === "") {
        alert("Please enter your full name.");
        return;
    }

    if (course === "") {
        alert("Please enter your course.");
        return;
    }

    if (yearLevel === "") {
        alert("Please enter your year level.");
        return;
    }

    if (aboutMe === "") {
        alert("Please enter your About Me information.");
        return;
    }

    // Create profile object
    const profile = {
        fullName: fullName,
        course: course,
        yearLevel: yearLevel,
        aboutMe: aboutMe,
        skills: skills
    };

    // Save profile to localStorage
    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
    );

    // Update displayed profile
    displayProfile();

    // Return to profile view
    document.getElementById("editProfile").style.display = "none";
    document.getElementById("profileView").style.display = "block";

    alert("Profile saved successfully!");
}


// Load profile when page opens
document.addEventListener("DOMContentLoaded", function() {
    displayProfile();

    document.getElementById("profileForm").addEventListener(
        "submit",
        saveProfile
    );
});