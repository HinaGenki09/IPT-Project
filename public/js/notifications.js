// ==========================
// NOTIFICATIONS
// ==========================


const notificationList =
    document.getElementById(
        "notificationList"
    );

const unreadCount =
    document.getElementById(
        "unreadCount"
    );

const notificationDot =
    document.getElementById(
        "notificationDot"
    );


// ==========================
// ACCOUNT MENU
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


// ==========================
// LOAD NOTIFICATIONS
// ==========================

let notifications = [];

let currentFilter = "All";


async function loadNotifications() {

    try {

        const token =
            localStorage.getItem(
                "token"
            );


        const selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        const notificationUrl =
            selectedCampaignId
                ? `/api/notifications?campaignId=${selectedCampaignId}`
                : "/api/notifications";


        const response =
            await fetch(
                notificationUrl,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Notification error:",
                data
            );

            notificationList.innerHTML =
                `<p class="empty-message">
                    Unable to load notifications.
                </p>`;

            return;

        }


        notifications =
            data;


        displayNotifications();

    } catch (error) {

        console.error(
            "Notification loading error:",
            error
        );

        notificationList.innerHTML =
            `<p class="empty-message">
                Unable to load notifications.
            </p>`;

    }

}


// ==========================
// DISPLAY
// ==========================

function displayNotifications() {

    let filtered =
        notifications;


    if (
        currentFilter !==
        "All"
    ) {

        filtered =
            notifications.filter(
                notification =>
                    notification.type ===
                    currentFilter
            );

    }


    notificationList.innerHTML =
        "";


    if (
        filtered.length === 0
    ) {

        notificationList.innerHTML =
            `<p class="empty-message">
                No notifications yet.
            </p>`;

        updateUnreadCount();

        return;

    }


    filtered.forEach(
        notification => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "notification-item";


            if (
                !notification.isRead
            ) {

                item.classList.add(
                    "unread"
                );

            }


            // ==========================
            // ICON
            // ==========================

            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "notification-icon";


            if (
                notification.title
                    .toLowerCase()
                    .includes("asset")
            ) {

                icon.textContent = "📁";

            } else if (
                notification.title
                    .toLowerCase()
                    .includes("task")
            ) {

                icon.textContent = "☑";

            } else if (
                notification.title
                    .toLowerCase()
                    .includes("calendar")
            ) {

                icon.textContent = "🗓";

            } else {

                icon.textContent = "✓";

            }


            // ==========================
            // CONTENT
            // ==========================

            const content =
                document.createElement(
                    "div"
                );

            content.className =
                "notification-content";


            const title =
                document.createElement(
                    "strong"
                );

            title.textContent =
                notification.title;


            const message =
                document.createElement(
                    "p"
                );

            message.textContent =
                notification.message;


            content.appendChild(
                title
            );

            content.appendChild(
                message
            );


            // ==========================
            // TIME
            // ==========================

            const time =
                document.createElement(
                    "small"
                );

            time.className =
                "notification-time";

            time.textContent =
                formatNotificationTime(
                    notification.createdAt
                );


            // ==========================
            // APPEND
            // ==========================

            item.appendChild(
                icon
            );

            item.appendChild(
                content
            );

            item.appendChild(
                time
            );


            // ==========================
            // MARK AS READ
            // ==========================

            item.addEventListener(
                "click",
                () => {

                    markAsRead(
                        notification._id
                    );

                }
            );


            notificationList.appendChild(
                item
            );

        }
    );


    updateUnreadCount();

}


// ==========================
// FORMAT TIME
// ==========================

function formatNotificationTime(
    dateValue
) {

    if (!dateValue) {
        return "";
    }


    const date =
        new Date(
            dateValue
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleString(
        [],
        {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


// ==========================
// UNREAD COUNT
// ==========================

function updateUnreadCount() {

    const unread =
        notifications.filter(
            notification =>
                !notification.isRead
        ).length;


    unreadCount.textContent =
        `${unread} unread`;


    notificationDot.style.display =
        unread > 0
            ? "block"
            : "none";

}


// ==========================
// MARK AS READ
// ==========================

async function markAsRead(
    notificationId
) {

    try {

        const token =
            localStorage.getItem(
                "token"
            );


        const response =
            await fetch(
                `/api/notifications/${notificationId}/read`,
                {
                    method: "PUT",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        if (!response.ok) {
            return;
        }


        const notification =
            notifications.find(
                item =>
                    item._id ===
                    notificationId
            );


        if (notification) {

            notification.isRead =
                true;

        }


        displayNotifications();

    } catch (error) {

        console.error(
            error
        );

    }

}


// ==========================
// FILTERS
// ==========================

document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-button"
                        )
                        .forEach(
                            item =>
                                item.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter;


                    if (
                        currentFilter ===
                        "Audit Log"
                    ) {

                        window.location.href =
                            "/audit-log.html";

                        return;

                    }


                    displayNotifications();

                }
            );

        }
    );


// ==========================
// SIDEBAR
// ==========================

document
    .getElementById("homeButton")
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


// ==========================
// INITIAL LOAD
// ==========================

loadNotifications();