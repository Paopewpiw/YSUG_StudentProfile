const LOGIN_API_URL = "http://localhost:3000";


// Login form
document.addEventListener("DOMContentLoaded", function() {

    // If already logged in, go directly to profile
    if (localStorage.getItem("token")) {
        window.location.href = "index.html";
        return;
    }


    const loginForm =
        document.getElementById("loginForm");

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const username =
                document.getElementById("username")
                .value
                .trim();


            const password =
                document.getElementById("password")
                .value;


            const message =
                document.getElementById("loginMessage");


            if (username === "") {

                message.textContent =
                    "Please enter your username.";

                return;
            }


            if (password === "") {

                message.textContent =
                    "Please enter your password.";

                return;
            }


            message.textContent =
                "Logging in...";


            try {

                const response =
                    await fetch(
                        LOGIN_API_URL + "/api/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                username: username,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    message.textContent =
                        data.message ||
                        "Login failed.";

                    return;
                }


                // Save JWT
                localStorage.setItem(
                    "token",
                    data.token
                );


                // Save basic user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                message.textContent =
                    "Login successful!";


                // Go to profile
                window.location.href =
                    "index.html";

            } catch (error) {

                console.error(error);

                message.textContent =
                    "Unable to connect to the server.";
            }

        }
    );

});