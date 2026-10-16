async function selectAccountType(accountType) {

    const token =
        localStorage.getItem("token");

    const errorElement =
        document.getElementById("enterError");


    if (!token) {

        errorElement.textContent =
            "Your session has expired. Please log in again.";

        return;
    }


    try {

        errorElement.textContent = "";


        const response = await fetch(
            "/api/auth/account-type",
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    accountType:
                        accountType
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to save account type."
            );
        }


        /*
         * Update the user stored in localStorage
         */

        const user =
            JSON.parse(
                localStorage.getItem("user") ||
                "{}"
            );


        user.accountType =
            data.accountType;


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        /*
         * Redirect based on selected account type
         */

        if (
            accountType ===
            "Content Creator"
        ) {

            window.location.href =
                "/campaigns.html";

        } else if (
            accountType ===
            "Client"
        ) {

            window.location.href =
                "/client-workspace.html";
        }


    } catch (error) {

        console.error(
            "ENTER ACCOUNT TYPE ERROR:",
            error
        );


        errorElement.textContent =
            error.message;
    }
}