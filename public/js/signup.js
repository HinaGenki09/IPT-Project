const signupForm =
    document.getElementById("signupForm");

signupForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("signupMessage");

        try {
            const response =
                await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password
                    })
                });

            const data =
                await response.json();

            if (!response.ok) {
                message.textContent =
                    data.message;
                return;
            }

            message.textContent =
                "Account created successfully!";

            signupForm.reset();

        } catch (error) {
            console.error(error);

            message.textContent =
                "Unable to connect to server.";
        }
    }
);