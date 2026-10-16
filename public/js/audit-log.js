// ==========================
// CURRENT USER
// ==========================

const currentUser =
    JSON.parse(
        localStorage.getItem("user") || "null"
    );


// ==========================
// SIDEBAR
// ==========================

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


// ==========================
// PROFILE
// ==========================

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
                `Account Type: ${
                    currentUser.accountType ||
                    "Not set"
                }`
            );

        }
    );

}


// ==========================
// LOGOUT
// ==========================

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


// ==========================
// SIDEBAR NAVIGATION
// ==========================

const homeButton =
    document.getElementById(
        "homeButton"
    );

const calendarSidebarButton =
    document.getElementById(
        "calendarSidebarButton"
    );

const assetSidebarButton =
    document.getElementById(
        "assetSidebarButton"
    );

const briefSidebarButton =
    document.getElementById(
        "briefSidebarButton"
    );

const referencesSidebarButton =
    document.getElementById(
        "referencesSidebarButton"
    );

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/workspace.html";

        }
    );

}


if (calendarSidebarButton) {

    calendarSidebarButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/calendar.html";

        }
    );

}


if (assetSidebarButton) {

    assetSidebarButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/asset-library.html";

        }
    );

}


if (briefSidebarButton) {

    briefSidebarButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/workspace.html";

        }
    );

}


if (referencesSidebarButton) {

    referencesSidebarButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/references.html";

        }
    );

}


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/notifications.html";

        }
    );

}


// ==========================
// LOAD AUDIT LOGS
// ==========================

async function loadAuditLogs() {

    const auditList =
        document.getElementById(
            "auditList"
        );


    if (!auditList) {
        return;
    }


    // ==========================
    // GET SELECTED CAMPAIGN
    // ==========================

    const selectedCampaign =
        localStorage.getItem(
            "selectedCampaign"
        );


    console.log(
        "SELECTED CAMPAIGN:",
        selectedCampaign
    );


    if (!selectedCampaign) {

        auditList.innerHTML = `
            <p class="empty-message">
                Please open a campaign first to view its audit logs.
            </p>
        `;

        return;

    }


    auditList.innerHTML = `
        <p class="loading-message">
            Loading activity...
        </p>
    `;


    try {

        // ==========================
        // SAME REQUEST AS CAMPAIGNS.JS
        // ==========================

        const response =
            await fetch(
                `/api/audit-logs?campaignId=${selectedCampaign}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


        const data =
            await response.json();


        console.log(
            "AUDIT LOG RESPONSE:",
            data
        );


        // ==========================
        // ERROR
        // ==========================

        if (!response.ok) {

            auditList.innerHTML = `
                <p class="error-message">
                    ${
                        data.message ||
                        "Unable to load audit logs."
                    }
                </p>
            `;

            return;

        }


        // ==========================
        // NO LOGS
        // ==========================

        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            auditList.innerHTML = `
                <p class="empty-message">
                    No audit logs yet.
                </p>
            `;

            return;

        }


        // ==========================
        // DISPLAY LOGS
        // ==========================

        auditList.innerHTML = "";


        data.forEach(
            (log) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "audit-item";


                // ==========================
                // ICON
                // ==========================

                let icon =
                    "📋";


                const action =
                    (
                        log.action ||
                        ""
                    ).toLowerCase();


                if (
                    action.includes(
                        "asset"
                    )
                ) {

                    icon = "📁";

                } else if (
                    action.includes(
                        "calendar"
                    )
                ) {

                    icon = "🗓";

                } else if (
                    action.includes(
                        "task"
                    )
                ) {

                    icon = "☑";

                } else if (
                    action.includes(
                        "campaign"
                    )
                ) {

                    icon = "📢";

                }


                // ==========================
                // DATE
                // ==========================

                const date =
                    log.createdAt
                        ? new Date(
                            log.createdAt
                        ).toLocaleString(
                            "en-US",
                            {
                                month:
                                    "short",

                                day:
                                    "numeric",

                                year:
                                    "numeric",

                                hour:
                                    "numeric",

                                minute:
                                    "2-digit"
                            }
                        )
                        : "";


                // ==========================
                // HTML
                // ==========================

                item.innerHTML = `

                    <div class="audit-icon">
                        ${icon}
                    </div>

                    <div class="audit-content">

                        <strong>
                            ${
                                log.action ||
                                "Activity"
                            }
                        </strong>

                        <p>
                            ${
                                log.description ||
                                ""
                            }
                        </p>

                    </div>

                    <small class="audit-time">
                        ${date}
                    </small>

                `;


                auditList.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            "AUDIT LOG ERROR:",
            error
        );


        auditList.innerHTML = `
            <p class="error-message">
                Unable to connect to the server.
            </p>
        `;

    }

}


// ==========================
// INITIAL LOAD
// ==========================

loadAuditLogs();