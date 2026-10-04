const API_URL = "http://localhost:3000";


// Check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}


// Save login token
function saveToken(token) {
    localStorage.setItem("token", token);
}


// Get login token
function getToken() {
    return localStorage.getItem("token");
}


// Logout
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}


// Protect profile page
function requireLogin() {

    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}