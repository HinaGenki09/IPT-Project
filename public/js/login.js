const loginForm =
    document.getElementById("loginForm");

loginForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("loginMessage");

        try {
            const response =
                await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

            const data =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                if (
                    data.user.accountType ===
                    "Content Creator"
                ) {

                    window.location.href =
                        "campaigns.html";

                } else if (
                    data.user.accountType ===
                    "Client"
                ) {

                    window.location.href =
                        "/client-workspace.html";

                } else {

                    window.location.href =
                        "/enter.html";
                }


            } else {

                message.textContent =
                    data.message ||
                    "Login failed.";
            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server.";
        }
    }
);