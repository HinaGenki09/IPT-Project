// ==========================
// CAMPAIGN WORKSPACE
// ==========================


// ==========================
// DOM ELEMENTS
// ==========================

const campaignName =
    document.getElementById(
        "campaignName"
    );

const campaignImage =
    document.getElementById(
        "campaignImage"
    );

const campaignDescription =
    document.getElementById(
        "campaignDescription"
    );

const campaignDuration =
    document.getElementById(
        "campaignDuration"
    );

const campaignOwner =
    document.getElementById(
        "campaignOwner"
    );

const campaignMembers =
    document.getElementById(
        "campaignAccess"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const taskList =
    document.getElementById(
        "taskList"
    );

const viewLibraryButton =
    document.getElementById(
        "viewLibraryButton"
    );

const viewCalendarButton =
    document.getElementById(
        "viewCalendarButton"
    );

const calendarDays =
    document.getElementById(
        "calendarDays"
    );

const scheduleList =
    document.getElementById(
        "scheduleList"
    );

const viewReportButton =
    document.getElementById(
        "viewReportButton"
    );

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

const tasksSidebarButton =
    document.getElementById(
        "tasksSidebarButton"
    );




// ==========================
// NOTIFICATIONS
// ==========================

const notificationButton =
    document.getElementById(
        "notificationButton"
    );

const notificationDot =
    document.getElementById(
        "notificationDot"
    );


// ==========================
// CAMPAIGN BRIEF
// ==========================

const briefSidebarButton =
    document.getElementById(
        "briefSidebarButton"
    );




// ==========================
// ADD TASK
// ==========================

const addTaskButton =
    document.getElementById(
        "addTaskButton"
    );

const taskModal =
    document.getElementById(
        "taskModal"
    );

const closeTaskModal =
    document.getElementById(
        "closeTaskModal"
    );

const saveTaskButton =
    document.getElementById(
        "saveTaskButton"
    );

const newTaskName =
    document.getElementById(
        "newTaskName"
    );

const newTaskDate =
    document.getElementById(
        "newTaskDate"
    );

const taskMessage =
    document.getElementById(
        "taskMessage"
    );


// ==========================
// STATISTICS
// ==========================

const totalTasks =
    document.getElementById(
        "totalTasks"
    );

const completedTasks =
    document.getElementById(
        "completedTasks"
    );

const inProgressTasks =
    document.getElementById(
        "inProgressTasks"
    );


// ==========================
// OVERALL PROGRESS
// ==========================

const overallProgressPercentage =
    document.getElementById(
        "overallProgressPercentage"
    );

const overallProgressFill =
    document.getElementById(
        "overallProgressFill"
    );

const overallTaskProgress =
    document.getElementById(
        "overallTaskProgress"
    );

const overallAssetProgress =
    document.getElementById(
        "overallAssetProgress"
    );


// ==========================
// WORKSPACE ASSETS
// ==========================

const workspaceAssetGrid =
    document.getElementById(
        "workspaceAssetGrid"
    );

const workspaceAssetCount =
    document.getElementById(
        "workspaceAssetCount"
    );


// ==========================
// REPORT PANEL
// ==========================

const reportPanel =
    document.getElementById(
        "reportPanel"
    );

const closeReportButton =
    document.getElementById(
        "closeReportButton"
    );

const reportOverallProgress =
    document.getElementById(
        "reportOverallProgress"
    );

const reportTotalTasks =
    document.getElementById(
        "reportTotalTasks"
    );

const reportCompletedTasks =
    document.getElementById(
        "reportCompletedTasks"
    );

const reportInProgressTasks =
    document.getElementById(
        "reportInProgressTasks"
    );

const reportNotStartedTasks =
    document.getElementById(
        "reportNotStartedTasks"
    );

const reportTaskProgress =
    document.getElementById(
        "reportTaskProgress"
    );

const reportTotalAssets =
    document.getElementById(
        "reportTotalAssets"
    );

const reportApprovedAssets =
    document.getElementById(
        "reportApprovedAssets"
    );

const reportReviewedAssets =
    document.getElementById(
        "reportReviewedAssets"
    );

const reportPendingAssets =
    document.getElementById(
        "reportPendingAssets"
    );

const reportAssetProgress =
    document.getElementById(
        "reportAssetProgress"
    );


// ==========================
// SIDEBAR ACCOUNT MENU
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
// CURRENT USER
// ==========================

const currentUser =
    JSON.parse(
        localStorage.getItem("user")
    );


// ==========================
// OPEN / CLOSE ACCOUNT MENU
// ==========================

sidebarMenuButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        sidebarAccountMenu.classList.toggle(
            "show"
        );

    }
);


// Close when clicking elsewhere

document.addEventListener(
    "click",
    (event) => {

        if (
            !sidebarAccountMenu.contains(
                event.target
            ) &&
            event.target !==
                sidebarMenuButton
        ) {

            sidebarAccountMenu.classList.remove(
                "show"
            );

        }

    }
);


// ==========================
// PROFILE
// ==========================

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

        sidebarAccountMenu.classList.remove(
            "show"
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
// SELECTED CAMPAIGN
// ==========================

const selectedCampaignId =
    localStorage.getItem(
        "selectedCampaign"
    );


// ==========================
// CAMPAIGN DATA
// ==========================

let currentCampaign = null;

let currentRole = null;


// ==========================
// PROGRESS DATA
// ==========================

let latestTasks = [];

let latestAssets = [];


// ==========================
// SIDEBAR BUTTONS
// ==========================

homeButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/campaigns.html";

    }
);


notificationButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/notifications.html";

    }
);


calendarSidebarButton.addEventListener(
    "click",
    () => {

         window.location.href =
            "/calendar.html";

    }
);


assetSidebarButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/asset-library.html";

    }
);


tasksSidebarButton.addEventListener(
    "click",
    () => {

        taskList.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


// ==========================
// CAMPAIGN BRIEF SIDEBAR
// ==========================

if (briefSidebarButton) {

    briefSidebarButton.addEventListener(
        "click",
        () => {

            showCampaignBrief();

        }
    );

}

document
    .getElementById("referencesSidebarButton")
    .addEventListener("click", () => {

        window.location.href =
            "/references.html";

    });


// ==========================
// GET CURRENT USER ROLE
// ==========================

function determineUserRole(
    campaign
) {

    if (!currentUser) {
        return null;
    }


    // Check if current user is a campaign member

    const member =
        campaign.members
            ? campaign.members.find(
                member => {

                    const memberUser =
                        member.user;

                    if (!memberUser) {
                        return false;
                    }

                    const memberId =
                        typeof memberUser === "object"
                            ? memberUser._id
                            : memberUser;

                    return (
                        memberId ===
                        currentUser.id
                    );

                }
            )
            : null;


    if (member) {

        return member.role;

    }


    // Check campaign owner

    if (
        campaign.owner ===
        currentUser.username
    ) {

        // Owner with no members
        // = Solo Content Creator

        if (
            !campaign.members ||
            campaign.members.length === 0
        ) {

            return "Solo Content Creator";

        }


        // Owner with members
        // = Lead

        return "Lead";

    }


    return null;

}


// ==========================
// DISPLAY CAMPAIGN DETAILS
// ==========================

function displayCampaignDetails(
    campaign
) {

    // CAMPAIGN NAME

    campaignName.textContent =
        campaign.name;


    // CAMPAIGN DESCRIPTION

    campaignDescription.textContent =
        campaign.description ||
        "No description.";


    // CAMPAIGN IMAGE

    campaignImage.src =
        campaign.image ||
        "https://via.placeholder.com/300x150";


    // OWNER

    campaignOwner.textContent =
        campaign.owner ||
        "-";


    // ==========================
    // DURATION
    // ==========================

    const start =
        new Date(
            campaign.startDate
        );

    const end =
        new Date(
            campaign.endDate
        );


    const difference =
        end.getTime() -
        start.getTime();


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    const startFormatted =
        start.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );


    const endFormatted =
        end.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );


    campaignDuration.textContent =
        `${startFormatted} – ${endFormatted} (${days} days)`;


    // ==========================
    // PEOPLE WITH ACCESS
    // ==========================

    if (
        !campaign.members ||
        campaign.members.length === 0
    ) {

        campaignMembers.textContent =
            "Owner only";

        return;

    }


    const memberList =
        campaign.members.map(
            (member) => {

                const username =
                    member.user &&
                    member.user.username
                        ? member.user.username
                        : "Unknown User";


                const role =
                    member.role ||
                    "Member";


                return `${username} — ${role}`;

            }
        );


    campaignMembers.textContent =
        memberList.join(" • ");

}


// ==========================
// LOAD TASKS FROM MONGODB
// ==========================

async function loadTasks() {

    if (!selectedCampaignId) {
        return [];
    }


    try {

        const token =
            localStorage.getItem(
                "token"
            );


        const response =
            await fetch(
                `/api/tasks/campaign/${selectedCampaignId}`,
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
                "Task loading error:",
                data
            );

            return [];

        }


        return data;

    } catch (error) {

        console.error(
            "Task loading error:",
            error
        );

        return [];

    }

}


// ==========================
// UPDATE TASK STATISTICS
// ==========================

function updateStatistics(
    tasks
) {

    // Save latest tasks

    latestTasks =
        tasks;


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.status ===
                "Done"
        ).length;


    const inProgress =
        tasks.filter(
            task =>
                task.status ===
                "In Progress"
        ).length;


    // ==========================
    // SUMMARY NUMBERS
    // ==========================

    totalTasks.textContent =
        total;

    completedTasks.textContent =
        completed;

    inProgressTasks.textContent =
        inProgress;


    // ==========================
    // UPDATE OVERALL PROGRESS
    // ==========================

    updateOverallProgress(
        latestTasks
    );

}


// ==========================
// UPDATE ASSET STATISTICS
// ==========================

function updateAssetStatistics(
    assets
) {

    // Save latest assets

    latestAssets =
        assets;


    // ==========================
    // UPDATE OVERALL PROGRESS
    // ==========================

    updateOverallProgress(
        latestTasks
    );

}


// ==========================
// OVERALL PROGRESS
// ==========================

function updateOverallProgress(
    tasks
) {

    const taskTotal =
        tasks.length;


    const taskCompleted =
        tasks.filter(
            task =>
                task.status ===
                "Done"
        ).length;


    // ==========================
    // TASK PROGRESS
    // ==========================

    const taskProgress =
        taskTotal === 0
            ? null
            : Math.round(
                (taskCompleted /
                    taskTotal) *
                100
            );


    // ==========================
    // ASSET PROGRESS
    // ==========================

    const assetTotal =
        latestAssets.length;


    const assetApproved =
        latestAssets.filter(
            asset =>
                asset.status ===
                "Approved"
        ).length;


    const assetProgress =
        assetTotal === 0
            ? null
            : Math.round(
                (assetApproved /
                    assetTotal) *
                100
            );


    // ==========================
    // DISPLAY TASK PROGRESS
    // ==========================

    overallTaskProgress.textContent =
        taskProgress === null
            ? "—"
            : `${taskProgress}%`;


    // ==========================
    // DISPLAY ASSET PROGRESS
    // ==========================

    overallAssetProgress.textContent =
        assetProgress === null
            ? "—"
            : `${assetProgress}%`;


    // ==========================
    // CALCULATE OVERALL
    // ==========================

    const progressValues =
        [
            taskProgress,
            assetProgress
        ].filter(
            value =>
                value !== null
        );


    let overall =
        0;


    if (
        progressValues.length > 0
    ) {

        overall =
            Math.round(
                progressValues.reduce(
                    (
                        total,
                        value
                    ) =>
                        total + value,
                    0
                ) /
                progressValues.length
            );

    }


    // ==========================
    // DISPLAY OVERALL PROGRESS
    // ==========================

    overallProgressPercentage.textContent =
        `${overall}%`;


    overallProgressFill.style.width =
        `${overall}%`;


    // ==========================
    // UPDATE REPORT
    // ==========================

    updateReport();

}


// ==========================
// STATUS CLASS
// ==========================

function getStatusClass(
    status
) {

    if (
        status ===
        "Done"
    ) {

        return "status-done";

    }


    if (
        status ===
        "In Progress"
    ) {

        return "status-progress";

    }


    if (
        status ===
        "Pending"
    ) {

        return "status-pending";

    }


    return "status-not-started";

}


// ==========================
// DISPLAY TASKS
// ==========================

async function displayTasks() {

    const tasks =
        await loadTasks();


    updateStatistics(
        tasks
    );


    taskList.innerHTML =
        "";


    if (
        tasks.length ===
        0
    ) {

        taskList.innerHTML =
            `<p>No tasks yet.</p>`;

        return;

    }


    tasks.forEach(
        (task) => {

            const taskItem =
                document.createElement(
                    "div"
                );


            taskItem.className =
                "task-item";


            // ==========================
            // CHECKBOX
            // ==========================

            const checkbox =
                document.createElement(
                    "input"
                );

            checkbox.type =
                "checkbox";

            checkbox.className =
                "task-check";

            checkbox.checked =
                task.status ===
                "Done";


            checkbox.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );


            checkbox.addEventListener(
                "change",
                async () => {

                    const newStatus =
                        checkbox.checked
                            ? "Done"
                            : "In Progress";


                    await updateTaskStatus(
                        task._id,
                        newStatus
                    );

                }
            );


            // ==========================
            // TASK NAME
            // ==========================

            const name =
                document.createElement(
                    "span"
                );

            name.className =
                "task-name";

            name.textContent =
                task.name;


            // ==========================
            // STATUS BUTTON
            // ==========================

            const status =
                document.createElement(
                    "button"
                );

            status.type =
                "button";

            status.className =
                "task-status " +
                getStatusClass(
                    task.status
                );

            status.textContent =
                task.status;


            status.addEventListener(
                "click",
                async (event) => {

                    event.stopPropagation();


                    if (
                        task.status ===
                        "Done"
                    ) {

                        return;

                    }


                    await updateTaskStatus(
                        task._id,
                        "In Progress"
                    );

                }
            );


            // ==========================
            // DATE
            // ==========================

            const date =
                document.createElement(
                    "span"
                );

            date.className =
                "task-date";

            date.textContent =
                task.dueDate ||
                "No date";


            // ==========================
            // ADD ELEMENTS
            // ==========================

            taskItem.appendChild(
                checkbox
            );

            taskItem.appendChild(
                name
            );

            taskItem.appendChild(
                status
            );

            taskItem.appendChild(
                date
            );


            // ==========================
            // DELETE TASK
            // ==========================

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.textContent =
                "✕";

            deleteButton.className =
                "delete-task-button";


            deleteButton.addEventListener(
                "click",
                async (event) => {

                    event.stopPropagation();


                    const confirmed =
                        confirm(
                            "Delete this task?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    try {

                        const token =
                            localStorage.getItem(
                                "token"
                            );


                        const response =
                            await fetch(
                                `/api/tasks/${task._id}`,
                                {
                                    method:
                                        "DELETE",

                                    headers: {
                                        "Authorization":
                                            `Bearer ${token}`
                                    }
                                }
                            );


                        const data =
                            await response.json();


                        if (!response.ok) {

                            alert(
                                data.message ||
                                "Unable to delete task."
                            );

                            return;

                        }


                        displayTasks();

                    } catch (error) {

                        console.error(
                            error
                        );


                        alert(
                            "Unable to connect to server."
                        );

                    }

                }
            );


            taskItem.appendChild(
                deleteButton
            );


            taskList.appendChild(
                taskItem
            );

        }
    );

}


// ==========================
// UPDATE TASK STATUS
// ==========================

async function updateTaskStatus(
    taskId,
    status
) {

    try {

        const token =
            localStorage.getItem(
                "token"
            );


        const response =
            await fetch(
                `/api/tasks/${taskId}`,
                {
                    method:
                        "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body:
                        JSON.stringify({
                            status:
                                status
                        })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to update task."
            );

            return;

        }


        displayTasks();

    } catch (error) {

        console.error(
            error
        );


        alert(
            "Failed to update task."
        );

    }

}


// ==========================
// ADD TASK
// ==========================

addTaskButton.addEventListener(
    "click",
    () => {

        newTaskName.value =
            "";

        newTaskDate.value =
            "";

        taskMessage.textContent =
            "";

        taskModal.classList.add(
            "show"
        );

        newTaskName.focus();

    }
);


// ==========================
// CLOSE TASK MODAL
// ==========================

closeTaskModal.addEventListener(
    "click",
    () => {

        taskModal.classList.remove(
            "show"
        );

    }
);


// ==========================
// SAVE NEW TASK
// ==========================

saveTaskButton.addEventListener(
    "click",
    async () => {

        const name =
            newTaskName.value.trim();

        const date =
            newTaskDate.value.trim();


        if (!name) {

            taskMessage.textContent =
                "Please enter a task name.";

            return;

        }


        try {

            const token =
                localStorage.getItem(
                    "token"
                );


            const response =
                await fetch(
                    `/api/tasks/campaign/${selectedCampaignId}`,
                    {
                        method:
                            "POST",

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
                                    "",

                                dueDate:
                                    date
                            })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                taskMessage.textContent =
                    data.message ||
                    "Failed to create task.";

                return;

            }


            // Close modal

            taskModal.classList.remove(
                "show"
            );


            newTaskName.value =
                "";

            newTaskDate.value =
                "";


            // Reload tasks

            displayTasks();

        } catch (error) {

            console.error(
                error
            );


            taskMessage.textContent =
                "Unable to connect to server.";

        }

    }
);


// ==========================
// LOAD WORKSPACE ASSETS
// ==========================

async function loadWorkspaceAssets() {

    if (!selectedCampaignId) {
        return;
    }


    try {

        const token =
            localStorage.getItem(
                "token"
            );


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


        // ==========================
        // SAVE ASSETS
        // ==========================

        latestAssets =
            assets;


        // ==========================
        // UPDATE ASSET STATISTICS
        // ==========================

        updateAssetStatistics(
            assets
        );


        // ==========================
        // DISPLAY ASSETS
        // ==========================

        displayWorkspaceAssets(
            assets
        );


    } catch (error) {

        console.error(
            "Workspace asset loading error:",
            error
        );

    }

}


// ==========================
// DISPLAY WORKSPACE ASSETS
// ==========================

function displayWorkspaceAssets(
    assets
) {

    workspaceAssetGrid.innerHTML =
        "";


    workspaceAssetCount.textContent =
        `${assets.length} ${
            assets.length === 1
                ? "asset"
                : "assets"
        }`;


    if (
        assets.length ===
        0
    ) {

        workspaceAssetGrid.innerHTML =
            `<p class="workspace-empty-assets">
                No assets uploaded yet.
            </p>`;

        return;

    }


    // ==========================
    // ONLY SHOW LATEST 5
    // ==========================

    const previewAssets =
        assets.slice(
            0,
            5
        );


    previewAssets.forEach(
        asset => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "workspace-asset-card";


            // ==========================
            // THUMBNAIL
            // ==========================

            const thumbnail =
                document.createElement(
                    "div"
                );


            thumbnail.className =
                "workspace-asset-thumbnail";


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


                image.onerror =
                    () => {

                        image.style.display =
                            "none";


                        thumbnail.innerHTML =
                            `<span class="workspace-file-icon">
                                🖼️
                            </span>`;

                    };


                thumbnail.appendChild(
                    image
                );

            } else {

                const fileIcon =
                    document.createElement(
                        "span"
                    );

                fileIcon.className =
                    "workspace-file-icon";


                if (
                    asset.fileType ===
                    "Video"
                ) {

                    fileIcon.textContent =
                        "🎬";

                } else if (
                    asset.fileType ===
                    "Document"
                ) {

                    fileIcon.textContent =
                        "📄";

                } else {

                    fileIcon.textContent =
                        "📁";

                }


                thumbnail.appendChild(
                    fileIcon
                );

            }


            // ==========================
            // ASSET INFORMATION
            // ==========================

            const information =
                document.createElement(
                    "div"
                );


            information.className =
                "workspace-asset-info";


            const name =
                document.createElement(
                    "span"
                );

            name.className =
                "workspace-asset-name";

            name.textContent =
                asset.name;


            const status =
                document.createElement(
                    "span"
                );

            status.className =
                "workspace-asset-status " +
                getWorkspaceAssetStatusClass(
                    asset.status
                );

            status.textContent =
                asset.status;


            information.appendChild(
                name
            );

            information.appendChild(
                status
            );


            card.appendChild(
                thumbnail
            );

            card.appendChild(
                information
            );


            // ==========================
            // OPEN ASSET REVIEW
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


            workspaceAssetGrid.appendChild(
                card
            );

        }
    );

}


// ==========================
// ASSET STATUS CLASS
// ==========================

function getWorkspaceAssetStatusClass(
    status
) {

    if (
        status ===
        "Reviewed"
    ) {

        return "workspace-status-reviewed";

    }


    if (
        status ===
        "Approved"
    ) {

        return "workspace-status-approved";

    }


    return "workspace-status-pending";

}


// ==========================
// REPORT
// ==========================

function updateReport() {

    const total =
        latestTasks.length;


    const completed =
        latestTasks.filter(
            task =>
                task.status ===
                "Done"
        ).length;


    const inProgress =
        latestTasks.filter(
            task =>
                task.status ===
                "In Progress"
        ).length;


    const notStarted =
        latestTasks.filter(
            task =>
                task.status ===
                "Not Started"
        ).length;


    const taskProgress =
        total === 0
            ? 0
            : Math.round(
                (completed /
                    total) *
                100
            );


    const totalAssets =
        latestAssets.length;


    const approvedAssets =
        latestAssets.filter(
            asset =>
                asset.status ===
                "Approved"
        ).length;


    const reviewedAssets =
        latestAssets.filter(
            asset =>
                asset.status ===
                "Reviewed"
        ).length;


    const pendingAssets =
        latestAssets.filter(
            asset =>
                asset.status ===
                "Pending Review"
        ).length;


    const assetProgress =
        totalAssets === 0
            ? 0
            : Math.round(
                (approvedAssets /
                    totalAssets) *
                100
            );


    const progressValues =
        [];


    if (
        total > 0
    ) {

        progressValues.push(
            taskProgress
        );

    }


    if (
        totalAssets > 0
    ) {

        progressValues.push(
            assetProgress
        );

    }


    let overall =
        0;


    if (
        progressValues.length > 0
    ) {

        overall =
            Math.round(
                progressValues.reduce(
                    (
                        sum,
                        value
                    ) =>
                        sum + value,
                    0
                ) /
                progressValues.length
            );

    }


    // ==========================
    // REPORT VALUES
    // ==========================

    reportOverallProgress.textContent =
        `${overall}%`;


    reportTotalTasks.textContent =
        total;


    reportCompletedTasks.textContent =
        completed;


    reportInProgressTasks.textContent =
        inProgress;


    reportNotStartedTasks.textContent =
        notStarted;


    reportTaskProgress.textContent =
        `${taskProgress}%`;


    reportTotalAssets.textContent =
        totalAssets;


    reportApprovedAssets.textContent =
        approvedAssets;


    reportReviewedAssets.textContent =
        reviewedAssets;


    reportPendingAssets.textContent =
        pendingAssets;


    reportAssetProgress.textContent =
        `${assetProgress}%`;

}


// ==========================
// OPEN REPORT
// ==========================

viewReportButton.addEventListener(
    "click",
    () => {

        updateReport();

        reportPanel.classList.add(
            "show"
        );

    }
);


// ==========================
// CLOSE REPORT
// ==========================

closeReportButton.addEventListener(
    "click",
    () => {

        reportPanel.classList.remove(
            "show"
        );

    }
);


// ==========================
// CAMPAIGN BRIEF
// ==========================

function showCampaignBrief() {

    const workspacePage =
        document.getElementById(
            "workspacePage"
        );

    workspacePage.innerHTML = `

        <section class="workspace-brief-page">

            <div class="workspace-section-header">

                <div>

                    <h2>
                        Campaign Brief
                    </h2>

                    <p>
                        Important information about the campaign.
                    </p>

                </div>

            </div>


            <section
                class="workspace-card workspace-brief-card"
            >

                <div class="workspace-brief-content">

                    <div class="workspace-brief-row">

                        <div>
                            <span>
                                Objective
                            </span>
                        </div>

                        <strong id="briefObjective">
                            —
                        </strong>

                    </div>


                    <div class="workspace-brief-row">

                        <div>
                            <span>
                                Target Audience
                            </span>
                        </div>

                        <strong id="briefTargetAudience">
                            —
                        </strong>

                    </div>


                    <div class="workspace-brief-row">

                        <div>

                            <span>
                                Key Message
                            </span>

                        </div>

                        <strong id="briefKeyMessage">
                            —
                        </strong>

                    </div>

                </div>


                <div class="workspace-brief-actions">

                    <button
                        id="editBriefButton"
                        class="workspace-brief-button"
                    >
                        Edit
                    </button>


                    <button
                        id="saveBriefButton"
                        class="workspace-brief-button primary"
                        style="display: none;"
                    >
                        Save
                    </button>

                </div>

            </section>

        </section>

    `;

    loadCampaignBrief();

}


// ==========================
// LOAD CAMPAIGN BRIEF
// ==========================

async function loadCampaignBrief() {

    if (!selectedCampaignId) {
        return;
    }


    try {

        const token =
            localStorage.getItem(
                "token"
            );


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


        if (!response.ok) {

            console.error(
                "Campaign brief loading error:",
                campaigns
            );

            return;

        }


        const campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            );


        if (!campaign) {
            return;
        }


        currentCampaign =
            campaign;


        const brief =
            campaign.brief ||
            {};


        const objective =
            document.getElementById(
                "briefObjective"
            );

        const targetAudience =
            document.getElementById(
                "briefTargetAudience"
            );

        const keyMessage =
            document.getElementById(
                "briefKeyMessage"
            );


        if (objective) {

            objective.textContent =
                brief.objective ||
                "—";

        }


        if (targetAudience) {

            targetAudience.textContent =
                brief.targetAudience ||
                "—";

        }


        if (keyMessage) {

            keyMessage.textContent =
                brief.keyMessage ||
                "—";

        }


        setupCampaignBriefEditing(
            campaign
        );


    } catch (error) {

        console.error(
            "Campaign brief loading error:",
            error
        );

    }

}


// ==========================
// EDIT / SAVE CAMPAIGN BRIEF
// ==========================

function setupCampaignBriefEditing(
    campaign
) {

    const editButton =
        document.getElementById(
            "editBriefButton"
        );

    const saveButton =
        document.getElementById(
            "saveBriefButton"
        );

    const objectiveElement =
        document.getElementById(
            "briefObjective"
        );

    const targetAudienceElement =
        document.getElementById(
            "briefTargetAudience"
        );

    const keyMessageElement =
        document.getElementById(
            "briefKeyMessage"
        );


    if (
        !editButton ||
        !saveButton
    ) {

        return;

    }


    editButton.addEventListener(
        "click",
        () => {

            const objective =
                objectiveElement.textContent === "—"
                    ? ""
                    : objectiveElement.textContent;

            const targetAudience =
                targetAudienceElement.textContent === "—"
                    ? ""
                    : targetAudienceElement.textContent;

            const keyMessage =
                keyMessageElement.textContent === "—"
                    ? ""
                    : keyMessageElement.textContent;


            objectiveElement.innerHTML =
                `
                <input
                    id="briefObjectiveInput"
                    type="text"
                    value="${objective}"
                >
                `;


            targetAudienceElement.innerHTML =
                `
                <input
                    id="briefTargetAudienceInput"
                    type="text"
                    value="${targetAudience}"
                >
                `;


            keyMessageElement.innerHTML =
                `
                <input
                    id="briefKeyMessageInput"
                    type="text"
                    value="${keyMessage}"
                >
                `;


            editButton.style.display =
                "none";

            saveButton.style.display =
                "inline-block";

        }
    );


    saveButton.addEventListener(
        "click",
        async () => {

            const objective =
                document.getElementById(
                    "briefObjectiveInput"
                ).value.trim();


            const targetAudience =
                document.getElementById(
                    "briefTargetAudienceInput"
                ).value.trim();


            const keyMessage =
                document.getElementById(
                    "briefKeyMessageInput"
                ).value.trim();

            if (
                !objective &&
                !targetAudience &&
                !keyMessage
            ) {
                alert(
                    "Please enter at least one Campaign Brief field before saving."
                );

                return;
            }


            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );


                const response =
                    await fetch(
                        `/api/campaigns/${campaign._id}/brief`,
                        {
                            method:
                                "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify({
                                    objective:
                                        objective,

                                    targetAudience:
                                        targetAudience,

                                    keyMessage:
                                        keyMessage
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message ||
                        "Failed to save campaign brief."
                    );

                    return;

                }


                alert(
                    "Campaign brief saved successfully."
                );


                showCampaignBrief();


            } catch (error) {

                console.error(
                    "Campaign brief save error:",
                    error
                );


                alert(
                    "Unable to connect to server."
                );

            }

        }
    );

}

// ==========================
// LOAD CALENDAR PREVIEW
// ==========================

async function loadCalendarPreview() {

    if (!selectedCampaignId) {
        return;
    }

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                `/api/calendar/campaign/${selectedCampaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );

        const notes =
            await response.json();

        if (!response.ok) {

            console.error(
                "Calendar loading error:",
                notes
            );

            return;

        }

        displayCalendarDays();

        displayCalendarPreview(
            notes
        );

    } catch (error) {

        console.error(
            "Calendar preview loading error:",
            error
        );

    }

}

// ==========================
// DISPLAY CURRENT WEEK
// ==========================

function displayCalendarDays() {

    calendarDays.innerHTML = "";

    const today =
        new Date();

    const dayOfWeek =
        today.getDay();

    const mondayOffset =
        dayOfWeek === 0
            ? -6
            : 1 - dayOfWeek;

    const monday =
        new Date(
            today
        );

    monday.setDate(
        today.getDate() +
        mondayOffset
    );

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const date =
            new Date(
                monday
            );

        date.setDate(
            monday.getDate() +
            i
        );

        const day =
            document.createElement(
                "div"
            );

        day.className =
            "calendar-day";

        const dayName =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );

        const dayNumber =
            date.getDate();

        const dateKey =
            date.toISOString()
                .split("T")[0];

        const todayKey =
            today.toISOString()
                .split("T")[0];

        if (
            dateKey ===
            todayKey
        ) {

            day.classList.add(
                "selected"
            );

        }

        day.innerHTML = `
            <small>
                ${dayName}
            </small>

            <strong>
                ${dayNumber}
            </strong>
        `;

        calendarDays.appendChild(
            day
        );

    }

}

// ==========================
// DISPLAY CALENDAR PREVIEW
// ==========================

function displayCalendarPreview(
    notes
) {

    scheduleList.innerHTML =
        "";

    if (
        !notes ||
        notes.length === 0
    ) {

        scheduleList.innerHTML = `
            <p class="calendar-empty">
                No upcoming calendar events.
            </p>
        `;

        return;

    }

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const upcomingNotes =
        notes
            .filter(note => {

                const noteDate =
                    new Date(
                        note.date
                    );

                noteDate.setHours(
                    0,
                    0,
                    0,
                    0
                );

                return (
                    noteDate >= today
                );

            })
            .sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            )
            .slice(
                0,
                3
            );


    if (
        upcomingNotes.length === 0
    ) {

        scheduleList.innerHTML = `
            <p class="calendar-empty">
                No upcoming calendar events.
            </p>
        `;

        return;

    }


    upcomingNotes.forEach(
        note => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "schedule-item";


            const date =
                new Date(
                    note.date
                );


            const formattedDate =
                date.toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric"
                    }
                );


            const status =
                note.reviewStatus ||
                "Not Required";


            let statusClass =
                "scheduled";

            if (
                status ===
                "Pending Review"
            ) {

                statusClass =
                    "review";

            }


            if (
                status ===
                "Rejected"
            ) {

                statusClass =
                    "rejected";

            }


            item.innerHTML = `

                <div class="schedule-thumbnail">
                    🗓️
                </div>


                <div class="schedule-information">

                    <strong>
                        ${note.title}
                    </strong>

                    <small>
                        ${note.details || "Calendar note"}
                    </small>

                </div>


                <div class="schedule-time">

                    <small>
                        ${formattedDate}
                    </small>

                    <span class="${statusClass}">
                        ${status}
                    </span>

                </div>

            `;


            scheduleList.appendChild(
                item
            );

        }
    );

}


// ==========================
// LOAD CAMPAIGN
// ==========================

async function loadCampaign() {

    if (!selectedCampaignId) {

        campaignName.textContent =
            "Campaign Workspace";

        return;

    }


    try {

        const token =
            localStorage.getItem(
                "token"
            );


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


        currentCampaign =
            campaign;


        displayCampaignDetails(
            campaign
        );


        currentRole =
            determineUserRole(
                campaign
            );


        console.log(
            "Current campaign:",
            campaign
        );


        console.log(
            "Current role:",
            currentRole
        );


        // ==========================
        // HIDE ADD TASK FOR
        // COLLABORATORS
        // ==========================

        if (
            currentRole ===
            "Collaborator"
        ) {

            addTaskButton.style.display =
                "none";

        } else {

            addTaskButton.style.display =
                "block";

        }


        // ==========================
        // LOAD TASKS
        // ==========================

        await displayTasks();


        // ==========================
        // LOAD ASSETS
        // ==========================

        await loadWorkspaceAssets();

        // ==========================
// LOAD CALENDAR
// ==========================

await loadCalendarPreview();


    } catch (error) {

        console.error(
            error
        );


        campaignName.textContent =
            "Campaign Workspace";

    }

}


// ==========================
// BACK
// ==========================

backButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/campaigns.html";

    }
);


// ==========================
// VIEW LIBRARY
// ==========================

viewLibraryButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/asset-library.html";

    }
);


// ==========================
// VIEW CALENDAR
// ==========================

viewCalendarButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "/calendar.html";

    }
);


// ==========================
// INITIAL LOAD
// ==========================

loadCampaign();