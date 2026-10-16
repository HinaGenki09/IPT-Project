// ==========================
// ASSET LIBRARY
// ==========================


// ==========================
// DOM ELEMENTS
// ==========================

const campaignName =
    document.getElementById(
        "campaignName"
    );

const campaignDescription =
    document.getElementById(
        "campaignDescription"
    );

const assetGrid =
    document.getElementById(
        "assetGrid"
    );

const assetCount =
    document.getElementById(
        "assetCount"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const uploadAssetButton =
    document.getElementById(
        "uploadAssetButton"
    );

const assetModal =
    document.getElementById(
        "assetModal"
    );

const closeAssetModal =
    document.getElementById(
        "closeAssetModal"
    );

const saveAssetButton =
    document.getElementById(
        "saveAssetButton"
    );

const assetName =
    document.getElementById(
        "assetName"
    );

const assetDescription =
    document.getElementById(
        "assetDescription"
    );

const assetFileUrl =
    document.getElementById(
        "assetFileUrl"
    );

const assetFileType =
    document.getElementById(
        "assetFileType"
    );

const assetMessage =
    document.getElementById(
        "assetMessage"
    );


// ==========================
// SELECTED CAMPAIGN
// ==========================

const selectedCampaignId =
    localStorage.getItem(
        "selectedCampaign"
    );


// ==========================
// TOKEN
// ==========================

const token =
    localStorage.getItem(
        "token"
    );


// ==========================
// SIDEBAR
// ==========================

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


// ==========================
// SIDEBAR MENU
// ==========================

sidebarMenuButton.addEventListener(
    "click",
    () => {

        sidebarAccountMenu.classList.toggle(
            "show"
        );

    }
);


// ==========================
// PROFILE
// ==========================

profileMenuButton.addEventListener(
    "click",
    () => {

        if (!currentUser) return;

        alert(
            `Username: ${currentUser.username}\n` +
            `Email: ${currentUser.email}\n` +
            `Account Type: ${
                currentUser.accountType ||
                "Not set"
            }`
        );

    }
);


// ==========================
// LOG OUT
// ==========================

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


// ==========================
// NOTIFICATIONS
// ==========================

document
    .getElementById("notificationButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/notifications.html";

        }
    );


// ==========================
// SIDEBAR NAVIGATION
// ==========================

// Dashboard
document
    .getElementById("homeButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/workspace.html";

        }
    );


// Calendar
document
    .getElementById("calendarSidebarButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/calendar.html";

        }
    );


// Asset Library
document
    .getElementById("assetSidebarButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/asset-library.html";

        }
    );


// Brief
document
    .getElementById("briefSidebarButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/workspace.html";

        }
    );


// References
document
    .getElementById("referencesSidebarButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "/references.html";

        }
    );


// ==========================
// BACK BUTTON
// ==========================

backButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/workspace.html";

    }
);


// ==========================
// OPEN MODAL
// ==========================

uploadAssetButton.addEventListener(
    "click",
    () => {

        assetName.value = "";

        assetDescription.value = "";

        assetFileUrl.value = "";

        assetFileType.value = "";

        assetMessage.textContent = "";

        assetModal.classList.add(
            "show"
        );

    }
);


// ==========================
// CLOSE MODAL
// ==========================

closeAssetModal.addEventListener(
    "click",
    () => {

        assetModal.classList.remove(
            "show"
        );

    }
);


// ==========================
// LOAD CAMPAIGN
// ==========================

async function loadCampaign() {

    try {

        const response =
            await fetch(
                "/api/campaigns",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const campaigns =
            await response.json();


        const campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            );


        if (!campaign) {

            campaignName.textContent =
                "Campaign not found";

            return;

        }


        campaignName.textContent =
            campaign.name;


        campaignDescription.textContent =
            campaign.description ||
            "No description.";

    } catch (error) {

        console.error(
            error
        );

    }

}


// ==========================
// LOAD ASSETS
// ==========================

async function loadAssets() {

    if (!selectedCampaignId) {

        assetGrid.innerHTML =
            `<p class="empty-message">
                No campaign selected.
            </p>`;

        return;

    }


    try {

        const response =
            await fetch(
                `/api/assets/campaign/${selectedCampaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const assets =
            await response.json();


        if (!response.ok) {

            console.error(
                "Asset loading error:",
                assets
            );

            return;

        }


        displayAssets(
            assets
        );

    } catch (error) {

        console.error(
            "Asset loading error:",
            error
        );

    }

}


// ==========================
// DISPLAY ASSETS
// ==========================

function displayAssets(
    assets
) {

    assetGrid.innerHTML = "";


    assetCount.textContent =
        `${assets.length} ${
            assets.length === 1
                ? "asset"
                : "assets"
        }`;


    if (
        assets.length ===
        0
    ) {

        assetGrid.innerHTML =
            `<p class="empty-message">
                No assets yet.
            </p>`;

        return;

    }


    assets.forEach(
        asset => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "asset-card";


            // ==========================
            // PREVIEW
            // ==========================

            const preview =
                document.createElement(
                    "div"
                );

            preview.className =
                "asset-preview";


            if (
                asset.fileType ===
                "Image"
            ) {

                const image =
                    document.createElement(
                        "img"
                    );

                image.src =
                    asset.fileUrl;

                image.alt =
                    asset.name;

                preview.appendChild(
                    image
                );

            } else {

                const fileIcon =
                    document.createElement(
                        "div"
                    );

                fileIcon.className =
                    "file-preview";

                fileIcon.textContent =
                    "📄";

                preview.appendChild(
                    fileIcon
                );

            }


            // ==========================
            // INFO
            // ==========================

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "asset-info";


            const name =
                document.createElement(
                    "h3"
                );

            name.className =
                "asset-name";

            name.textContent =
                asset.name;


            const description =
                document.createElement(
                    "p"
                );

            description.className =
                "asset-description";

            description.textContent =
                asset.description ||
                "No description.";


            // ==========================
            // STATUS
            // ==========================

            const status =
                document.createElement(
                    "span"
                );

            status.className =
                "asset-status " +
                getStatusClass(
                    asset.status
                );

            status.textContent =
                asset.status;


            info.appendChild(
                name
            );

            info.appendChild(
                description
            );

            info.appendChild(
                status
            );


            card.appendChild(
                preview
            );

            card.appendChild(
                info
            );


            // ==========================
            // CLICK ASSET
            // ==========================

            card.addEventListener(
                "click",
                () => {

                    localStorage.setItem(
                        "selectedAsset",
                        asset._id
                    );

                    window.location.href =
                        "/asset-review.html";

                }
            );


            assetGrid.appendChild(
                card
            );

        }
    );

}


// ==========================
// STATUS CLASS
// ==========================

function getStatusClass(
    status
) {

    if (
        status ===
        "Reviewed"
    ) {

        return "status-reviewed";

    }


    if (
        status ===
        "Approved"
    ) {

        return "status-approved";

    }


    return "status-pending";

}


// ==========================
// SAVE ASSET
// ==========================

saveAssetButton.addEventListener(
    "click",
    async () => {

        const name =
            assetName.value.trim();

        const description =
            assetDescription.value.trim();

        const fileUrl =
            assetFileUrl.value.trim();

        const fileType =
            assetFileType.value;


        assetMessage.textContent =
            "";


        if (!name) {

            assetMessage.textContent =
                "Please enter an asset name.";

            return;

        }


        if (!fileUrl) {

            assetMessage.textContent =
                "Please enter a file URL.";

            return;

        }


        if (!selectedCampaignId) {

            assetMessage.textContent =
                "No campaign selected.";

            return;

        }


        try {

            const response =
                await fetch(
                    `/api/assets/campaign/${selectedCampaignId}`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`
                        },

                        body:
                            JSON.stringify({

                                name:
                                    name,

                                description:
                                    description,

                                fileUrl:
                                    fileUrl,

                                fileType:
                                    fileType

                            })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                assetMessage.textContent =
                    data.message ||
                    "Unable to upload asset.";

                return;

            }


            assetModal.classList.remove(
                "show"
            );


            loadAssets();

        } catch (error) {

            console.error(
                error
            );

            assetMessage.textContent =
                "Unable to connect to server.";

        }

    }
);


// ==========================
// INITIAL LOAD
// ==========================

loadCampaign();

loadAssets();