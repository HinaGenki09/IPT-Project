const selectedCampaignId =

    localStorage.getItem(

        "selectedCampaign"

    );



const referencesList =

    document.getElementById(

        "referencesList"

    );



const linkModal =

    document.getElementById(

        "linkModal"

    );



const referenceTitle =

    document.getElementById(

        "referenceTitle"

    );



const referenceUrl =

    document.getElementById(

        "referenceUrl"

    );



const referenceMessage =

    document.getElementById(

        "referenceMessage"

    );



let references = [];



/* ==========================

   DEFAULT REFERENCES

========================== */

const defaultReferences = [

    {

        id: 1,

        title:

            "Canva - Campaign Design",

        url:

            "https://www.canva.com/"

    },

    {

        id: 2,

        title:

            "Google Drive - Product Photos",

        url:

            "https://drive.google.com/"

    },

    {

        id: 3,

        title:

            "Figma - Content Layout",

        url:

            "https://www.figma.com/"

    }

];



/* ==========================

   LOAD REFERENCES

========================== */

async function loadReferences() {

    if (!selectedCampaignId) {

        references = [];

        renderReferences();

        return;

    }

    const token =

        localStorage.getItem("token");

    try {

        const response =

            await fetch(

                `/api/references/campaign/${selectedCampaignId}`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        const data =

            await response.json();

        if (!response.ok) {

            console.error(

                data.message ||

                "Unable to load references."

            );

            references = [];

            renderReferences();

            return;

        }

        references = data;

        renderReferences();

    } catch (error) {

        console.error(

            "Load references error:",

            error

        );

        references = [];

        renderReferences();

    }

}

async function saveReference() {

    const title =

        referenceTitle.value.trim();

    const url =

        referenceUrl.value.trim();

    referenceMessage.textContent = "";

    if (!title) {

        referenceMessage.textContent =

            "Please enter a title.";

        return;

    }

    if (!url) {

        referenceMessage.textContent =

            "Please enter a URL.";

        return;

    }

    let finalUrl = url;

    // Automatically add https://

    if (!/^https?:\/\//i.test(finalUrl)) {

        finalUrl =

            "https://" + finalUrl;

    }

    try {

        new URL(finalUrl);

    } catch (error) {

        referenceMessage.textContent =

            "Please enter a valid URL.";

        return;

    }

    if (!selectedCampaignId) {

        referenceMessage.textContent =

            "No campaign selected.";

        return;

    }

    const token =

        localStorage.getItem("token");

    try {

        const response =

            await fetch(

                `/api/references/campaign/${selectedCampaignId}`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":

                            "application/json",

                        Authorization:

                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        title: title,

                        url: finalUrl

                    })

                }

            );

        const data =

            await response.json();

        if (!response.ok) {

            referenceMessage.textContent =

                data.message ||

                "Unable to save reference.";

            return;

        }

        // Add the newly saved reference

        references.push(data);

        renderReferences();

        closeLinkModal();

    } catch (error) {

        console.error(

            "Save reference error:",

            error

        );

        referenceMessage.textContent =

            "Unable to connect to server.";

    }

}



/* ==========================

   RENDER

========================== */

function renderReferences() {

    referencesList.innerHTML =

        "";



    if (

        references.length === 0

    ) {

        referencesList.innerHTML = `

            <div class="empty-references">

                No references added yet.

            </div>

        `;

        return;

    }



    references.forEach(

        reference => {

            const row =

                document.createElement(

                    "div"

                );



            row.className =

                "reference-row";



            /* Icon */

            const icon =

                document.createElement(

                    "div"

                );



            icon.className =

                "reference-icon";



            icon.textContent =

                "🔗";



            /* Information */

            const info =

                document.createElement(

                    "div"

                );



            info.className =

                "reference-info";



            const title =

                document.createElement(

                    "div"

                );



            title.className =

                "reference-title";



            title.textContent =

                reference.title;



            const url =

                document.createElement(

                    "div"

                );



            url.className =

                "reference-url";



            url.textContent =

                reference.url;



            info.appendChild(

                title

            );



            info.appendChild(

                url

            );



            /* Open */

            const openButton =

                document.createElement(

                    "button"

                );



            openButton.className =

                "open-reference-button";



            openButton.textContent =

                "Open";



            openButton.addEventListener(

                "click",

                () => {

                    window.open(

                        reference.url,

                        "_blank",

                        "noopener,noreferrer"

                    );

                }

            );



            
/* Delete */
const deleteButton = document.createElement("button");

deleteButton.className = "delete-reference-button";
deleteButton.innerHTML = "🗑";
deleteButton.title = "Delete reference";

deleteButton.addEventListener("click", async () => {
    const confirmed = confirm(
        `Delete "${reference.title}"?`
    );

    if (!confirmed) {
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(
            `/api/references/${reference._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to delete reference.");
            return;
        }

        references = references.filter(
            item => item._id !== reference._id
        );

        renderReferences();

    } catch (error) {
        console.error("Delete reference error:", error);
        alert("Unable to connect to server.");
    }
});



            row.appendChild(

                icon

            );



            row.appendChild(

                info

            );



            row.appendChild(

                openButton

            );



            row.appendChild(

                deleteButton

            );



            referencesList.appendChild(

                row

            );

        }

    );

}



/* ==========================

   OPEN MODAL

========================== */

function openLinkModal() {

    referenceTitle.value =

        "";

    referenceUrl.value =

        "";

    referenceMessage.textContent =

        "";



    linkModal.classList.add(

        "show"

    );



    referenceTitle.focus();

}



/* ==========================

   CLOSE MODAL

========================== */

function closeLinkModal() {

    linkModal.classList.remove(

        "show"

    );

}


/* ==========================

   BUTTON EVENTS

========================== */

document

    .getElementById(

        "addLinkButton"

    )

    .addEventListener(

        "click",

        openLinkModal

    );



document

    .getElementById(

        "closeLinkModal"

    )

    .addEventListener(

        "click",

        closeLinkModal

    );



document

    .getElementById(

        "cancelLinkButton"

    )

    .addEventListener(

        "click",

        closeLinkModal

    );



document

    .getElementById(

        "saveLinkButton"

    )

    .addEventListener(

        "click",

        saveReference

    );



linkModal.addEventListener(

    "click",

    event => {

        if (

            event.target ===

            linkModal

        ) {

            closeLinkModal();

        }

    }

);



/* ==========================
   SIDEBAR ACCOUNT MENU
========================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("user")
    );


const sidebarMenuButton =
    document.getElementById(
        "sidebarMenuButton"
    );

const sidebarAccountMenu =
    document.getElementById(
        "sidebarAccountMenu"
    );

const profileMenuButton =
    document.getElementById(
        "profileMenuButton"
    );

const logoutMenuButton =
    document.getElementById(
        "logoutMenuButton"
    );


if (sidebarMenuButton) {

    sidebarMenuButton.addEventListener(
        "click",
        () => {

            sidebarAccountMenu.classList.toggle(
                "show"
            );

        }
    );

}


if (profileMenuButton) {

    profileMenuButton.addEventListener(
        "click",
        () => {

            if (!currentUser) {
                return;
            }

            alert(
                `Username: ${currentUser.username}\n` +
                `Email: ${currentUser.email}\n` +
                `Account Type: ${currentUser.accountType || "Not set"}`
            );

        }
    );

}


if (logoutMenuButton) {

    logoutMenuButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            localStorage.removeItem(
                "selectedCampaign"
            );

            window.location.href =
                "/login.html";

        }
    );

}


/* ==========================
   SIDEBAR NAVIGATION
========================== */

document
    .getElementById(
        "homeButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/workspace.html";

        }
    );


document
    .getElementById(
        "calendarSidebarButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/calendar.html";

        }
    );


document
    .getElementById(
        "assetSidebarButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/asset-library.html";

        }
    );


document
    .getElementById(
        "briefSidebarButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/workspace.html";

        }
    );


document
    .getElementById(
        "referencesSidebarButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/references.html";

        }
    );


document
    .getElementById(
        "notificationButton"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/notifications.html";

        }
    );


/* ==========================
   START
========================== */

loadReferences();