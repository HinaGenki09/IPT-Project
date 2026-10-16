// ==========================
// CLIENT VIEW
// ==========================

const clientApp =
    document.getElementById("clientApp");


// ==========================
// CLIENT VIEW HTML
// ==========================

clientApp.innerHTML = `

    <!-- ==========================
         SIDEBAR
    =========================== -->

    <aside class="client-sidebar">

        <div class="client-brand">
            <strong>CLIENT</strong>
            <span>WORKSPACE</span>
        </div>


        <nav class="client-navigation">

            <button
                class="client-nav-item active"
                data-page="dashboard"
            >
                <span>⌂</span>
                <span>Dashboard</span>
            </button>


            <button
                class="client-nav-item"
                data-page="content"
            >
                <span>▣</span>
                <span>Content</span>
            </button>


            <button
                class="client-nav-item"
                data-page="calendar"
            >
                <span>▦</span>
                <span>Calendar</span>
            </button>


            <button
                class="client-nav-item"
                data-page="brief"
            >
                <span>□</span>
                <span>Campaign Brief</span>
            </button>


            <button
                class="client-nav-item"
                data-page="references"
            >
                <span>↗</span>
                <span>References</span>
            </button>


            <button
                class="client-nav-item"
                data-page="history"
            >
                <span>◷</span>
                <span>History</span>
            </button>

        </nav>


        <div class="client-sidebar-bottom">

            <button
                class="client-nav-item"
                data-page="account"
            >
                <span>◎</span>
                <span>Account</span>
            </button>

        </div>

    </aside>


    <!-- ==========================
         MAIN AREA
    =========================== -->

    <main class="client-main">

        <!-- HEADER -->

        <header class="client-header">

            <div class="client-header-left">

                <h1 id="clientPageTitle">
                    Dashboard
                </h1>

                <p id="clientPageSubtitle">
                    Overview of your campaign activity.
                </p>

            </div>


            
<div class="client-header-right">

    <!-- Notifications -->
    <button
        class="client-notification-button"
        id="clientNotificationButton"
        aria-label="Notifications"
    >
        ♢
        <span
            id="clientNotificationDot"
            class="client-notification-dot hidden"
        ></span>
    </button>

    <!-- Workspace Guidelines -->
    <button
        type="button"
        class="client-guidelines-button"
        id="clientGuidelinesButton"
        title="Workspace Guidelines"
        aria-label="Open workspace guidelines"
    >
        ?
    </button>

</div>

        </header>

        

<!-- WORKSPACE GUIDELINES PANEL -->
<div
    id="clientGuidelinesPanel"
    class="client-guidelines-panel"
    hidden
>
    <div class="client-guidelines-panel-header">
        <div class="client-guidelines-title">
            <h2>Workspace Guidelines</h2>
            <p class="client-guidelines-subtitle">
                Quick guide to using your campaign dashboard
            </p>
        </div>

        <button
            type="button"
            id="closeClientGuidelines"
            aria-label="Close guidelines"
        >×</button>
    </div>

    <!-- Tasks and Content -->
    <section class="client-guideline-item">
        <div class="client-guideline-icon">
            <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <path d="m8 12 3 3 6-7"/>
            </svg>
        </div>
        <div class="client-guideline-text">
            <h3>Tasks &amp; Content</h3>
            <p>
                Review campaign content, check its status, and follow
                the available review actions before approving or
                requesting changes.
            </p>
        </div>
    </section>

    <!-- Asset Library -->
    <section class="client-guideline-item">
        <div class="client-guideline-icon">
            <svg viewBox="0 0 24 24">
                <path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
        </div>
        <div class="client-guideline-text">
            <h3>Asset Library</h3>
            <p>
                Use the campaign's available files and resources.
                Check asset details and review status when available.
            </p>
        </div>
    </section>

    <!-- Calendar -->
    <section class="client-guideline-item">
        <div class="client-guideline-icon">
            <svg viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="16" rx="2"/>
                <path d="M16 3v4M8 3v4M3 10h18"/>
                <path d="M12 13v4m-2-2h2"/>
            </svg>
        </div>
        <div class="client-guideline-text">
            <h3>Calendar</h3>
            <p>
                Check scheduled campaign activities and upcoming
                deadlines to stay updated on the campaign timeline.
            </p>
        </div>
    </section>

    <!-- Campaign Brief -->
    <section class="client-guideline-item">
        <div class="client-guideline-icon">
            <svg viewBox="0 0 24 24">
                <path d="M6 3h9l5 5v13H6z"/>
                <path d="M14 3v6h6M9 13h7M9 17h7"/>
            </svg>
        </div>
        <div class="client-guideline-text">
            <h3>Campaign Brief</h3>
            <p>
                Refer to the campaign objective, target audience,
                and key message when reviewing campaign content.
            </p>
        </div>
    </section>

    <!-- References -->
    <section class="client-guideline-item">
        <div class="client-guideline-icon">
            <svg viewBox="0 0 24 24">
                <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"/>
                <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/>
            </svg>
        </div>
        <div class="client-guideline-text">
            <h3>References</h3>
            <p>
                Use the provided references as guidance for the
                campaign's content, visual direction, and requirements.
                Refer to them when reviewing submitted assets.
            </p>
        </div>
    </section>

    <p class="client-guidelines-note">
        If anything is unclear, coordinate with the Content Creator
        before approving campaign content.
    </p>
</div>




        <!-- ==========================
             PAGE CONTENT
        =========================== -->

        <section
            class="client-page"
            id="clientPage"
        >

            <!-- CAMPAIGN OVERVIEW -->

            <div class="client-welcome">

                <div>

                    <p class="client-eyebrow">
                        CURRENT CAMPAIGN
                    </p>

                    <h2 id="clientCampaignName">
                        Campaign Name
                    </h2>

                    <p id="clientCampaignDescription">
                        Your campaign information will appear here.
                    </p>

                </div>


                <div class="client-campaign-status">

                    <span>
                        Status
                    </span>

                    <strong id="clientCampaignStatus">
                        Planning
                    </strong>

                </div>

            </div>


            <!-- DASHBOARD GRID -->

            <div class="client-dashboard-grid">

                <!-- UPCOMING -->

                <section class="client-card upcoming-card">

                    <div class="client-card-header">

                        <div>

                            <h3>
                                Upcoming
                            </h3>

                            <p>
                                Scheduled campaign activities
                            </p>

                        </div>

                        <span>
                            →
                        </span>

                    </div>


                    <div
                        class="client-upcoming-list"
                        id="clientUpcomingList"
                    >

                        <div class="client-empty-state">
                            No upcoming activities.
                        </div>

                    </div>

                </section>


                <!-- UPDATES -->

                <section class="client-card updates-card">

                    <div class="client-card-header">

                        <div>

                            <h3>
                                Recent Updates
                            </h3>

                            <p>
                                Latest campaign activity
                            </p>

                        </div>

                        <span>
                            →
                        </span>

                    </div>


                    <div
                        class="client-updates-list"
                        id="clientUpdatesList"
                    >

                        <div class="client-empty-state">
                            No recent updates.
                        </div>

                    </div>

                </section>

            </div>


            <!-- CAMPAIGN BRIEF PREVIEW -->

            <section class="client-card client-brief-preview">

                <div class="client-card-header">

                    <div>

                        <h3>
                            Campaign Brief
                        </h3>

                        <p>
                            Important campaign information
                        </p>

                    </div>

                    <button
                        class="client-link-button"
                        data-page="brief"
                    >
                        View brief →
                    </button>

                </div>


                <div class="client-brief-content">

                    <div>

                        <span>
                            Objective
                        </span>

                        <strong>
                            —
                        </strong>

                    </div>


                    <div>

                        <span>
                            Target Audience
                        </span>

                        <strong>
                            —
                        </strong>

                    </div>


                    <div>

                        <span>
                            Key Message
                        </span>

                        <strong>
                            —
                        </strong>

                    </div>

                </div>

            </section>

        </section>

    </main>

`;


 // ==========================
 // CLIENT WORKSPACE GUIDELINES
 // ==========================

class ClientWorkspaceGuidelines {
    constructor() {
        this.panel = document.getElementById(
            "clientGuidelinesPanel"
        );

        this.openButton = document.getElementById(
            "clientGuidelinesButton"
        );

        this.closeButton = document.getElementById(
            "closeClientGuidelines"
        );

        // Object containing the guideline sections
        this.guidelines = {
            content: "Review campaign content and its status.",
            assets: "Check available files and review status.",
            calendar: "Check scheduled activities and deadlines.",
            brief: "Follow the campaign objective and target audience.",
            references: "Use references to guide content and visual direction."
        };

        // Button event listeners
        this.openButton.addEventListener("click", () => {
            this.open();
        });

        this.closeButton.addEventListener("click", () => {
            this.close();
        });
    }

    // Method to open the panel
    open() {
        this.panel.hidden = false;
    }

    // Method to close the panel
    close() {
        this.panel.hidden = true;
    }
}

// Create the guidelines object
const clientGuidelines = new ClientWorkspaceGuidelines();


// ==========================
// NAVIGATION
// ==========================

const clientNavItems =
    document.querySelectorAll(
        ".client-nav-item"
    );

const clientPage =
    document.getElementById(
        "clientPage"
    );

const clientPageTitle =
    document.getElementById(
        "clientPageTitle"
    );

const clientPageSubtitle =
    document.getElementById(
        "clientPageSubtitle"
    );


clientNavItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                clientNavItems.forEach(
                    (nav) => {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );


                const page =
                    item.dataset.page;


                // ==========================
                // DASHBOARD
                // ==========================

                if (
                    page ===
                    "dashboard"
                ) {

                    clientPageTitle.textContent =
                        "Dashboard";

                    clientPageSubtitle.textContent =
                        "Overview of your campaign activity.";

                    showDashboard();

                }


                // ==========================
                // CONTENT
                // ==========================

                else if (
                    page ===
                    "content"
                ) {

                    clientPageTitle.textContent =
                        "Content";

                    clientPageSubtitle.textContent =
                        "Review and manage campaign content.";

                    showContent();

                }


                // ==========================
                // CALENDAR
                // ==========================

                else if (
                    page ===
                    "calendar"
                ) {

                    clientPageTitle.textContent =
                        "Calendar";

                    clientPageSubtitle.textContent =
                        "View your campaign schedule.";

                    showCalendar();

                }


                // ==========================
                // BRIEF
                // ==========================

                else if (
                    page ===
                    "brief"
                ) {

                    clientPageTitle.textContent =
                        "Campaign Brief";

                    clientPageSubtitle.textContent =
                        "Important information about the campaign.";

                    showBrief();

                }


                // ==========================
                // REFERENCES
                // ==========================

                else if (
                    page ===
                    "references"
                ) {

                    clientPageTitle.textContent =
                        "References";

                    clientPageSubtitle.textContent =
                        "Campaign links and reference materials.";

                    showReferences();

                }


                // ==========================
                // HISTORY
                // ==========================

                else if (
                    page ===
                    "history"
                ) {

                    clientPageTitle.textContent =
                        "History";

                    clientPageSubtitle.textContent =
                        "View previous campaign activity.";

                    showHistory();

                }


                // ==========================
                // ACCOUNT
                // ==========================

                else if (
                    page ===
                    "account"
                ) {

                    clientPageTitle.textContent =
                        "Account";

                    clientPageSubtitle.textContent =
                        "View your account information.";

                    showAccount();

                }

            }
        );

    }
);


// ==========================
// DASHBOARD
// ==========================

function showDashboard() {

    clientPage.innerHTML = `

        <div class="client-welcome">

            <div>

                <p class="client-eyebrow">
                    CURRENT CAMPAIGN
                </p>

                <h2 id="clientCampaignName">
                    Campaign Name
                </h2>

                <p id="clientCampaignDescription">
                    Your campaign information will appear here.
                </p>

            </div>


            <div class="client-campaign-status">

                <span>
                    Status
                </span>

                <strong id="clientCampaignStatus">
                    Planning
                </strong>


                <div
                    class="client-campaign-progress"
                    style="margin-top: 12px;"
                >

                    <div
                        style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 5px;
                        "
                    >

                        <span>
                            Progress
                        </span>

                        <strong id="clientCampaignProgressText">
                            0%
                        </strong>

                    </div>


                    <div
                        style="
                            width: 100%;
                            height: 8px;
                            background: #e5e5e5;
                            border-radius: 10px;
                            overflow: hidden;
                        "
                    >

                        <div
                            id="clientCampaignProgressBar"
                            style="
                                width: 0%;
                                height: 100%;
                                background: #8b5cf6;;
                                border-radius: 10px;
                                transition: width 0.3s ease;
                            "
                        ></div>

                    </div>

                </div>

            </div>

        </div>


        <div class="client-dashboard-grid">

            <!-- ==========================
                 UPCOMING
            =========================== -->

            <section class="client-card">

                <div class="client-card-header">

                    <div>

                        <h3>
                            Upcoming
                        </h3>

                        <p>
                            Scheduled campaign activities
                        </p>

                    </div>

                </div>


                <div
                    class="client-upcoming-list"
                    id="clientUpcomingList"
                >

                    <div class="client-empty-state">
                        Loading upcoming activities...
                    </div>

                </div>

            </section>


            <!-- ==========================
                 RECENT UPDATES
            =========================== -->

            <section class="client-card">

                <div class="client-card-header">

                    <div>

                        <h3>
                            Recent Updates
                        </h3>

                        <p>
                            Latest campaign notifications
                        </p>

                    </div>

                </div>


                <div
                    class="client-updates-list"
                    id="clientUpdatesList"
                >

                    <div class="client-empty-state">
                        Loading recent updates...
                    </div>

                </div>

            </section>

        </div>


        <!-- ==========================
             CAMPAIGN BRIEF
        =========================== -->

        <section class="client-card">

            <div class="client-card-header">

                <div>

                    <h3>
                        Campaign Brief
                    </h3>

                    <p>
                        Important campaign information
                    </p>

                </div>

            </div>


            <div class="client-brief-content">

                <div>

                    <span>
                        Objective
                    </span>

                    <strong id="clientBriefObjective">
                        —
                    </strong>

                </div>


                <div>

                    <span>
                        Target Audience
                    </span>

                    <strong id="clientBriefAudience">
                        —
                    </strong>

                </div>


                <div>

                    <span>
                        Key Message
                    </span>

                    <strong id="clientBriefMessage">
                        —
                    </strong>

                </div>

            </div>

        </section>

    `;


    loadClientDashboard();

}


// ==========================
// LOAD CLIENT DASHBOARD
// ==========================

async function loadClientDashboard() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    try {

        // ==========================
        // LOAD CAMPAIGNS
        // ==========================

        const campaignResponse =
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
            await campaignResponse.json();


        if (!campaignResponse.ok) {

            throw new Error(
                campaigns.message ||
                "Unable to load campaigns."
            );

        }


        if (
            !campaigns ||
            campaigns.length === 0
        ) {

            document.getElementById(
                "clientCampaignName"
            ).textContent =
                "No campaign assigned";


            document.getElementById(
                "clientCampaignDescription"
            ).textContent =
                "You are not currently assigned to a campaign.";


            document.getElementById(
                "clientCampaignStatus"
            ).textContent =
                "No Campaign";


            document.getElementById(
                "clientUpcomingList"
            ).innerHTML = `

                <div class="client-empty-state">
                    No upcoming activities.
                </div>

            `;


            document.getElementById(
                "clientUpdatesList"
            ).innerHTML = `

                <div class="client-empty-state">
                    No recent updates.
                </div>

            `;


            return;

        }


        // ==========================
        // GET SELECTED CAMPAIGN
        // ==========================

        let selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        let campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            );


        // ==========================
        // FALLBACK TO FIRST CAMPAIGN
        // ==========================

        if (!campaign) {

            campaign =
                campaigns[0];

            selectedCampaignId =
                campaign._id;


            localStorage.setItem(
                "selectedCampaign",
                selectedCampaignId
            );

        }


        // ==========================
        // CAMPAIGN INFORMATION
        // ==========================

        const campaignName =
            document.getElementById(
                "clientCampaignName"
            );

        const campaignDescription =
            document.getElementById(
                "clientCampaignDescription"
            );

        const campaignStatus =
            document.getElementById(
                "clientCampaignStatus"
            );


        if (campaignName) {

            campaignName.textContent =
                campaign.name ||
                "Campaign Name";

        }


        if (campaignDescription) {

            campaignDescription.textContent =
                campaign.description ||
                "Your campaign information will appear here.";

        }


        if (campaignStatus) {

            campaignStatus.textContent =
                campaign.status ||
                "Planning";

        }


        // ==========================
        // CAMPAIGN BRIEF
        // ==========================

        const brief =
            campaign.brief || {};


        const briefObjective =
            document.getElementById(
                "clientBriefObjective"
            );

        const briefAudience =
            document.getElementById(
                "clientBriefAudience"
            );

        const briefMessage =
            document.getElementById(
                "clientBriefMessage"
            );


        if (briefObjective) {

            briefObjective.textContent =
                brief.objective ||
                "—";

        }


        if (briefAudience) {

            briefAudience.textContent =
                brief.targetAudience ||
                "—";

        }


        if (briefMessage) {

            briefMessage.textContent =
                brief.keyMessage ||
                "—";

        }


        // ==========================
        // LOAD DASHBOARD DATA
        // ==========================

        await Promise.all([

            loadClientDashboardUpcoming(
                selectedCampaignId,
                token
            ),

            loadClientDashboardUpdates(
                selectedCampaignId,
                token
            ),

            loadClientDashboardProgress(
                selectedCampaignId,
                token
            )

        ]);


    } catch (error) {

        console.error(
            "CLIENT DASHBOARD ERROR:",
            error
        );

    }

}


// ==========================
// DASHBOARD UPCOMING
// ==========================

async function loadClientDashboardUpcoming(
    campaignId,
    token
) {

    const container =
        document.getElementById(
            "clientUpcomingList"
        );


    if (!container) {
        return;
    }


    try {

        // ==========================
        // LOAD TASKS
        // ==========================

        const taskResponse =
            await fetch(
                `/api/tasks/campaign/${campaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const tasks =
            await taskResponse.json();


        if (!taskResponse.ok) {

            throw new Error(
                tasks.message ||
                "Unable to load scheduled tasks."
            );

        }


        // ==========================
        // LOAD CALENDAR NOTES
        // ==========================

        const noteResponse =
            await fetch(
                `/api/calendar/campaign/${campaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const notes =
            await noteResponse.json();


        if (!noteResponse.ok) {

            throw new Error(
                notes.message ||
                "Unable to load calendar notes."
            );

        }


        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        // ==========================
        // COMBINE SCHEDULED ITEMS
        // ==========================

        const upcomingTasks =
            tasks
                .filter(task => {

                    if (!task.dueDate) {
                        return false;
                    }


                    const date =
                        new Date(
                            task.dueDate
                        );

                    date.setHours(
                        0,
                        0,
                        0,
                        0
                    );


                    return date >= today;

                })
                .map(task => ({

                    type: "TASK",

                    title:
                        task.name ||
                        "Untitled Task",

                    details:
                        task.description ||
                        "No description.",

                    date:
                        task.dueDate,

                    status:
                        task.status ||
                        ""

                }));


        const upcomingNotes =
            notes
                .filter(note => {

                    if (!note.date) {
                        return false;
                    }


                    const date =
                        new Date(
                            note.date
                        );

                    date.setHours(
                        0,
                        0,
                        0,
                        0
                    );


                    return date >= today;

                })
                .map(note => ({

                    type: "CALENDAR NOTE",

                    title:
                        note.title ||
                        "Calendar Note",

                    details:
                        note.details ||
                        "No details.",

                    date:
                        note.date,

                    status:
                        note.reviewStatus ||
                        ""

                }));


        const upcoming = [

            ...upcomingTasks,

            ...upcomingNotes

        ];


        upcoming.sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );


        const limitedUpcoming =
            upcoming.slice(
                0,
                5
            );


        // ==========================
        // NOTHING SCHEDULED
        // ==========================

        if (!limitedUpcoming.length) {

            container.innerHTML = `

                <div class="client-empty-state">

                    No upcoming activities.

                </div>

            `;

            return;

        }


        // ==========================
        // DISPLAY ITEMS
        // ==========================

        container.innerHTML =
            limitedUpcoming
                .map(item => {

                    const date =
                        new Date(
                            item.date
                        ).toLocaleDateString(
                            "default",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        );


                    return `

                        <div
                            class="client-upcoming-item"
                        >

                            <div>

                                <small>
                                    ${item.type}
                                </small>

                                <strong>
                                    ${escapeCalendarHTML(
                                        item.title
                                    )}
                                </strong>

                                <p>
                                    ${escapeCalendarHTML(
                                        item.details
                                    )}
                                </p>

                            </div>

                            <span>
                                ${date}
                            </span>

                        </div>

                    `;

                })
                .join("");


    } catch (error) {

        console.error(
            "CLIENT UPCOMING ERROR:",
            error
        );


        container.innerHTML = `

            <div class="client-empty-state">

                Unable to load upcoming activities.

            </div>

        `;

    }

}


// ==========================
// DASHBOARD RECENT UPDATES
// ==========================

async function loadClientDashboardUpdates(
    campaignId,
    token
) {

    const container =
        document.getElementById(
            "clientUpdatesList"
        );


    if (!container) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/notifications?campaignId=${campaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const notifications =
            await response.json();


        if (!response.ok) {

            throw new Error(
                notifications.message ||
                "Unable to load notifications."
            );

        }


        const recent =
            notifications
                .sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ) -
                        new Date(
                            a.createdAt
                        )
                )
                .slice(
                    0,
                    5
                );


        if (!recent.length) {

            container.innerHTML = `

                <div class="client-empty-state">

                    No recent updates.

                </div>

            `;

            return;

        }


        container.innerHTML =
            recent
                .map(notification => {

                    const date =
                        new Date(
                            notification.createdAt
                        ).toLocaleDateString(
                            "default",
                            {
                                month: "short",
                                day: "numeric"
                            }
                        );


                    return `

                        <div
                            class="client-update-item"
                        >

                            <div>

                                <strong>
                                    ${escapeCalendarHTML(
                                        notification.title ||
                                        "Campaign Update"
                                    )}
                                </strong>

                                <p>
                                    ${escapeCalendarHTML(
                                        notification.message ||
                                        ""
                                    )}
                                </p>

                            </div>

                            <span>
                                ${date}
                            </span>

                        </div>

                    `;

                })
                .join("");


    } catch (error) {

        console.error(
            "CLIENT DASHBOARD UPDATES ERROR:",
            error
        );


        container.innerHTML = `

            <div class="client-empty-state">

                Unable to load recent updates.

            </div>

        `;

    }

}


// ==========================
// DASHBOARD CAMPAIGN PROGRESS
// ==========================

async function loadClientDashboardProgress(
    campaignId,
    token
) {

    const progressText =
        document.getElementById(
            "clientCampaignProgressText"
        );

    const progressBar =
        document.getElementById(
            "clientCampaignProgressBar"
        );


    if (!progressText || !progressBar) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/tasks/campaign/${campaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const tasks =
            await response.json();


        if (!response.ok) {

            throw new Error(
                tasks.message ||
                "Unable to load campaign tasks."
            );

        }


        if (
            !tasks ||
            tasks.length === 0
        ) {

            progressText.textContent =
                "0%";

            progressBar.style.width =
                "0%";

            return;

        }


        const completedTasks =
            tasks.filter(task => {

                const status =
                    String(
                        task.status ||
                        ""
                    ).toLowerCase();


                return (
                    status === "done" ||
                    status === "completed"
                );

            });


        const progress =
            Math.round(
                (
                    completedTasks.length /
                    tasks.length
                ) * 100
            );


        progressText.textContent =
            `${progress}%`;


        progressBar.style.width =
            `${progress}%`;


    } catch (error) {

        console.error(
            "CLIENT CAMPAIGN PROGRESS ERROR:",
            error
        );


        progressText.textContent =
            "0%";

        progressBar.style.width =
            "0%";

    }

}


// ==========================
// CONTENT / ASSET LIBRARY
// ==========================

function showContent() {
    clientPage.innerHTML = `
        <div class="client-content-page">
            <div class="client-section-header">
                <div>
                    <h2>Asset Library</h2>
                    <p>View and review campaign assets.</p>
                </div>
            </div>

            <div
                id="clientContentList"
                class="client-asset-library"
            >
                <div class="client-content-empty">
                    Loading assets...
                </div>
            </div>
        </div>

        <!-- REVIEW PANEL -->
        <div
            id="clientAssetReview"
            class="client-asset-review hidden"
        >
            <div class="client-review-overlay"></div>

            <div class="client-review-panel">
                <div class="client-review-header">
                    <div>
                        <h3 id="clientReviewAssetName">Asset</h3>

                        <span
                            id="clientReviewAssetStatus"
                            class="client-asset-status status-pending"
                        >
                            Pending Review
                        </span>
                    </div>

                    <button
                        id="closeClientReview"
                        class="client-review-close"
                    >
                        ×
                    </button>
                </div>

                <div
                    id="clientAssetPreview"
                    class="client-asset-preview"
                ></div>

                <!-- EXISTING COMMENTS -->
                <div
                    id="clientAssetComments"
                    style="
                        margin: 16px 0;
                        padding: 12px;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                    "
                >
                    <h4 style="margin-top: 0;">
                        Comments
                    </h4>

                    <div id="clientAssetCommentsList">
                        Loading comments...
                    </div>
                </div>

                <!-- ADD COMMENT -->
                <div class="client-review-comment">
                    <label for="clientAssetComment">
                        Comment
                    </label>

                    <textarea
                        id="clientAssetComment"
                        placeholder="Write your feedback..."
                    ></textarea>

                    <button
                        id="clientSendComment"
                        class="client-comment-button"
                    >
                        Send Comment
                    </button>
                </div>

                <!-- REVIEW ACTIONS -->
                <div class="client-review-actions">
                    <button
                        id="clientRequestChanges"
                        class="client-request-button"
                    >
                        Request Changes
                    </button>

                    <button
                        id="clientApproveAsset"
                        class="client-approve-button"
                    >
                        Approve
                    </button>
                </div>

                <!-- SEPARATE REQUEST CHANGES PANEL -->
                <div
                    id="clientRevisionRequestPanel"
                    style="
                        display: none;
                        margin-top: 18px;
                        padding: 16px;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                    "
                >
                    <h4 style="margin-top: 0;">
                        Request Changes
                    </h4>

                    <p>
                        Describe the changes needed for this asset.
                    </p>

                    <textarea
                        id="clientRevisionRequestText"
                        placeholder="Explain what the creator needs to change..."
                        style="
                            width: 100%;
                            min-height: 110px;
                            box-sizing: border-box;
                        "
                    ></textarea>

                    <p
                        id="clientRevisionRequestMessage"
                        style="display: none;"
                    ></p>

                    <div
                        style="
                            display: flex;
                            gap: 10px;
                            margin-top: 12px;
                        "
                    >
                        <button
                            id="clientCancelRevisionRequest"
                            type="button"
                        >
                            Cancel
                        </button>

                        <button
                            id="clientSendRevisionRequest"
                            type="button"
                            class="client-request-button"
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    loadClientContent();
}


// ==========================
// LOAD CLIENT CONTENT
// ==========================

async function loadClientContent() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href =
            "login.html";

        return;

    }


    try {

        const campaignResponse =
            await fetch(
                "/api/campaigns",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        if (!campaignResponse.ok) {

            throw new Error(
                "Unable to load campaigns."
            );

        }


        const campaigns =
            await campaignResponse.json();


        if (!campaigns.length) {

            showClientContentMessage(
                "No campaign assigned."
            );

            return;

        }


        const selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        const campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            ) ||
            campaigns[0];


        const assetResponse =
            await fetch(
                `/api/assets/campaign/${campaign._id}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        if (!assetResponse.ok) {

            throw new Error(
                "Unable to load campaign assets."
            );

        }


        const assets =
            await assetResponse.json();


        const contentList =
            document.getElementById(
                "clientContentList"
            );


        if (
            !assets ||
            assets.length === 0
        ) {

            showClientContentMessage(
                "No content has been submitted yet."
            );

            return;

        }


        contentList.innerHTML = "";


        assets.forEach(
            (asset) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "client-asset-card";


                item.innerHTML = `

                    <div
                        class="client-asset-card-top"
                    >

                        <div
                            class="client-asset-icon"
                        >
                            ${
                                asset.fileType === "Image"
                                    ? "🖼️"
                                    : asset.fileType === "Video"
                                        ? "🎬"
                                        : "📁"
                            }
                        </div>


                        <span
                            class="client-asset-status ${getClientAssetStatusClass(asset.status)}"
                        >

                            ${
                                asset.status ||
                                "Pending Review"
                            }

                        </span>

                    </div>


                    <div
                        class="client-asset-info"
                    >

                        <strong>

                            ${
                                asset.name ||
                                "Untitled Asset"
                            }

                        </strong>


                        <small>

                            ${
                                asset.fileType ||
                                "File"
                            }

                        </small>

                    </div>


                    <button
                        class="client-view-asset"
                    >

                        ${
                            asset.status === "Approved"
                                ? "View"
                                : "Review"
                        }

                    </button>

                `;


                const reviewButton =
                    item.querySelector(
                        ".client-view-asset"
                    );


                reviewButton.addEventListener(
                    "click",
                    () => {

                        if (
                            asset.status ===
                            "Approved"
                        ) {

                            openApprovedAssetView(
                                asset
                            );

                        } else {

                            openClientAssetReview(
                                asset
                            );

                        }

                    }
                );


                contentList.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            "Client content error:",
            error
        );


        showClientContentMessage(
            "Unable to load campaign content."
        );

    }

}

// ==========================
// LOAD CLIENT ASSET COMMENTS
// ==========================

async function loadClientAssetComments(assetId) {
    const commentsContainer =
        document.getElementById(
            "clientAssetCommentsList"
        );

    if (!commentsContainer) {
        return;
    }

    const token =
        localStorage.getItem("token");

    commentsContainer.textContent =
        "Loading comments...";

    try {
        const response = await fetch(
            `/api/assets/${assetId}/comments`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const comments = await response.json();

        if (!response.ok) {
            throw new Error(
                comments.message ||
                "Unable to load comments."
            );
        }

        commentsContainer.innerHTML = "";

        if (!Array.isArray(comments) || comments.length === 0) {
            commentsContainer.textContent =
                "No comments yet.";

            return;
        }

        comments.forEach((comment) => {
            const commentItem =
                document.createElement("div");

            commentItem.style.cssText = `
                padding: 10px 0;
                border-bottom: 1px solid #e5e7eb;
            `;

            const commentHeader =
                document.createElement("div");

            commentHeader.style.cssText = `
                display: flex;
                justify-content: space-between;
                gap: 10px;
                margin-bottom: 6px;
            `;

            const username =
                document.createElement("strong");

            username.textContent =
                comment.user?.username ||
                comment.user?.name ||
                "User";

            const date =
                document.createElement("small");

            date.textContent = comment.createdAt
                ? new Date(
                    comment.createdAt
                ).toLocaleString()
                : "";

            commentHeader.appendChild(username);
            commentHeader.appendChild(date);

            const commentText =
                document.createElement("p");

            commentText.style.cssText = `
                margin: 0;
                white-space: pre-wrap;
                overflow-wrap: anywhere;
            `;

            commentText.textContent =
                comment.comment || "";

            commentItem.appendChild(commentHeader);
            commentItem.appendChild(commentText);

            commentsContainer.appendChild(commentItem);
        });

    } catch (error) {
        console.error(
            "Load client asset comments error:",
            error
        );

        commentsContainer.textContent =
            "Unable to load comments.";
    }
}


// ==========================
// OPEN ASSET REVIEW PANEL
// ==========================

function openClientAssetReview(asset) {
    console.log(
        "Opening client asset review:",
        asset
    );

    const reviewPanel =
        document.getElementById(
            "clientAssetReview"
        );

    if (!reviewPanel) {
        console.error(
            "Client review panel was not found."
        );

        return;
    }

    const assetName =
        document.getElementById(
            "clientReviewAssetName"
        );

    const assetStatus =
        document.getElementById(
            "clientReviewAssetStatus"
        );

    const preview =
        document.getElementById(
            "clientAssetPreview"
        );

    const commentBox =
        document.getElementById(
            "clientAssetComment"
        );

    const sendCommentButton =
        document.getElementById(
            "clientSendComment"
        );

    const requestChangesButton =
        document.getElementById(
            "clientRequestChanges"
        );

    const approveButton =
        document.getElementById(
            "clientApproveAsset"
        );

    const commentSection =
        document.querySelector(
            ".client-review-comment"
        );

    const actionSection =
        document.querySelector(
            ".client-review-actions"
        );

    const revisionPanel =
        document.getElementById(
            "clientRevisionRequestPanel"
        );

    const revisionText =
        document.getElementById(
            "clientRevisionRequestText"
        );

    const revisionMessage =
        document.getElementById(
            "clientRevisionRequestMessage"
        );

    const cancelRevisionButton =
        document.getElementById(
            "clientCancelRevisionRequest"
        );

    const sendRevisionButton =
        document.getElementById(
            "clientSendRevisionRequest"
        );

    if (commentSection) {
        commentSection.style.display = "";
    }

    if (actionSection) {
        actionSection.style.display = "";
    }

    if (revisionPanel) {
        revisionPanel.style.display = "none";
    }

    if (revisionText) {
        revisionText.value = "";
    }

    if (revisionMessage) {
        revisionMessage.style.display = "none";
        revisionMessage.textContent = "";
    }

    // ==========================
    // DISPLAY ASSET INFORMATION
    // ==========================

    assetName.textContent =
        asset.name || "Untitled Asset";

    const status =
        asset.status || "Pending Review";

    assetStatus.textContent = status;

    assetStatus.className =
        `client-asset-status ${getClientAssetStatusClass(status)}`;

    commentBox.value = "";

    preview.innerHTML = "";

    // ==========================
    // IMAGE PREVIEW
    // ==========================

    if (
        asset.fileType === "Image" &&
        asset.fileUrl
    ) {
        const image =
            document.createElement("img");

        image.src = asset.fileUrl;
        image.alt = asset.name || "Asset";
        image.className = "client-preview-image";

        preview.appendChild(image);
    }

    // ==========================
    // VIDEO PREVIEW
    // ==========================

    else if (
        asset.fileType === "Video" &&
        asset.fileUrl
    ) {
        const video =
            document.createElement("video");

        video.controls = true;
        video.className = "client-preview-video";

        const source =
            document.createElement("source");

        source.src = asset.fileUrl;

        video.appendChild(source);

        video.appendChild(
            document.createTextNode(
                "Your browser does not support video playback."
            )
        );

        preview.appendChild(video);
    }

    // ==========================
    // OTHER FILE
    // ==========================

    else {
        preview.innerHTML = `
            <div class="client-file-preview">
                <div class="client-file-icon">📁</div>
                <p>Preview unavailable.</p>
            </div>
        `;
    }

    // ==========================
    // LOAD COMMENTS
    // ==========================

    loadClientAssetComments(asset._id);

    // ==========================
    // SHOW REVIEW PANEL
    // ==========================

    reviewPanel.classList.remove("hidden");

    // ==========================
    // CLOSE REVIEW PANEL
    // ==========================

    document.getElementById(
        "closeClientReview"
    ).onclick = () => {
        reviewPanel.classList.add("hidden");

        if (revisionPanel) {
            revisionPanel.style.display = "none";
        }
    };

    // ==========================
    // CLICK OUTSIDE REVIEW PANEL
    // ==========================

    document.querySelector(
        ".client-review-overlay"
    ).onclick = () => {
        reviewPanel.classList.add("hidden");

        if (revisionPanel) {
            revisionPanel.style.display = "none";
        }
    };

    // ==========================
    // ADD COMMENT
    // ==========================

    sendCommentButton.onclick = async () => {
        const comment =
            commentBox.value.trim();

        if (!comment) {
            alert("Please enter a comment.");
            return;
        }

        try {
            const response = await fetch(
                `/api/assets/${asset._id}/comments`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify({
                        comment
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to add comment."
                );

                return;
            }

            alert("Comment added successfully!");

            commentBox.value = "";

            // Refresh the comments shown to the client.
            await loadClientAssetComments(asset._id);

            asset.status = "Reviewed";

            assetStatus.textContent = "Reviewed";

            assetStatus.className =
                `client-asset-status ${getClientAssetStatusClass("Reviewed")}`;

        } catch (error) {
            console.error(
                "Comment error:",
                error
            );

            alert("Unable to connect to server.");
        }
    };

    // ==========================
    // OPEN REQUEST CHANGES PANEL
    // ==========================

    requestChangesButton.onclick = () => {
        if (!revisionPanel) {
            return;
        }

        revisionPanel.style.display = "block";

        if (revisionMessage) {
            revisionMessage.style.display = "none";
            revisionMessage.textContent = "";
        }

        if (revisionText) {
            revisionText.focus();
        }
    };

    // ==========================
    // CANCEL REQUEST CHANGES
    // ==========================

    if (cancelRevisionButton) {
        cancelRevisionButton.onclick = () => {
            revisionPanel.style.display = "none";

            revisionText.value = "";

            if (revisionMessage) {
                revisionMessage.style.display = "none";
                revisionMessage.textContent = "";
            }
        };
    }

    // ==========================
    // SEND REQUEST CHANGES
    // ==========================

    if (sendRevisionButton) {
        sendRevisionButton.onclick = async () => {
            const comment =
                revisionText.value.trim();

            if (!comment) {
                if (revisionMessage) {
                    revisionMessage.textContent =
                        "Please explain what changes are needed.";

                    revisionMessage.style.display = "block";
                } else {
                    alert(
                        "Please explain what changes are needed."
                    );
                }

                revisionText.focus();

                return;
            }

            sendRevisionButton.disabled = true;

            try {
                const response = await fetch(
                    `/api/assets/${asset._id}/request-changes`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":
                                `Bearer ${localStorage.getItem("token")}`
                        },

                        body: JSON.stringify({
                            comment
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    alert(
                        data.message ||
                        "Unable to request changes."
                    );

                    return;
                }

                // Match the status saved by the backend.
                asset.status = "Revision Requested";

                assetStatus.textContent =
                    "Revision Requested";

                assetStatus.className =
                    `client-asset-status ${getClientAssetStatusClass("Revision Requested")}`;

                // Clear and close only the request form.
                revisionText.value = "";

                revisionPanel.style.display = "none";

                if (revisionMessage) {
                    revisionMessage.style.display = "none";
                    revisionMessage.textContent = "";
                }

                // Reload comments so the request appears immediately.
                await loadClientAssetComments(asset._id);

                // Refresh the asset cards and their displayed statuses.
                await loadClientContent();

                alert(
                    "Changes requested successfully!"
                );

            } catch (error) {
                console.error(
                    "Request changes error:",
                    error
                );

                alert("Unable to connect to server.");

            } finally {
                sendRevisionButton.disabled = false;
            }
        };
    }

    // ==========================
    // APPROVE
    // ==========================

    approveButton.onclick = async () => {
        const confirmed = confirm(
            "Are you sure you want to approve this asset?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `/api/assets/${asset._id}/approve`,
                {
                    method: "PUT",

                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to approve asset."
                );

                return;
            }

            alert("Asset approved successfully!");

            asset.status = "Approved";

            assetStatus.textContent = "Approved";

            assetStatus.className =
                `client-asset-status ${getClientAssetStatusClass("Approved")}`;

            reviewPanel.classList.add("hidden");

            await loadClientContent();

        } catch (error) {
            console.error(
                "Approve error:",
                error
            );

            alert("Unable to connect to server.");
        }
    };
}

// ==========================
// OPEN APPROVED ASSET VIEW
// ==========================

function openApprovedAssetView(asset) {

    const reviewPanel =
        document.getElementById(
            "clientAssetReview"
        );


    if (!reviewPanel) {

        return;

    }


    const assetName =
        document.getElementById(
            "clientReviewAssetName"
        );


    const assetStatus =
        document.getElementById(
            "clientReviewAssetStatus"
        );


    const preview =
        document.getElementById(
            "clientAssetPreview"
        );


    const commentSection =
        document.querySelector(
            ".client-review-comment"
        );


    const actionSection =
        document.querySelector(
            ".client-review-actions"
        );


    // ==========================
    // HIDE COMMENT + ACTIONS
    // ==========================

    if (commentSection) {

        commentSection.style.display =
            "none";

    }


    if (actionSection) {

        actionSection.style.display =
            "none";

    }


    // ==========================
    // DISPLAY ASSET INFORMATION
    // ==========================

    assetName.textContent =
        asset.name ||
        "Untitled Asset";


    assetStatus.textContent =
        "Approved";


    assetStatus.className =
        "client-asset-status status-approved";


    // ==========================
    // CLEAR PREVIOUS PREVIEW
    // ==========================

    preview.innerHTML = "";


    // ==========================
    // IMAGE
    // ==========================

    if (
        asset.fileType === "Image" &&
        asset.fileUrl
    ) {

        preview.innerHTML = `

            <img
                src="${asset.fileUrl}"
                alt="${asset.name || "Asset"}"
                class="client-preview-image"
            >

        `;

    }


    // ==========================
    // VIDEO
    // ==========================

    else if (
        asset.fileType === "Video" &&
        asset.fileUrl
    ) {

        preview.innerHTML = `

            <video
                controls
                class="client-preview-video"
            >

                <source
                    src="${asset.fileUrl}"
                >

                Your browser does not support video playback.

            </video>

        `;

    }


    // ==========================
    // OTHER FILE
    // ==========================

    else {

        preview.innerHTML = `

            <div
                class="client-file-preview"
            >

                <div
                    class="client-file-icon"
                >
                    📁
                </div>


                <p>
                    Preview unavailable.
                </p>

            </div>

        `;

    }


    // ==========================
    // SHOW PANEL
    // ==========================

    reviewPanel.classList.remove(
        "hidden"
    );


    // ==========================
    // CLOSE BUTTON
    // ==========================

    document
        .getElementById(
            "closeClientReview"
        )
        .onclick = () => {

            reviewPanel.classList.add(
                "hidden"
            );


            if (commentSection) {

                commentSection.style.display =
                    "";

            }


            if (actionSection) {

                actionSection.style.display =
                    "";

            }

        };


    // ==========================
    // CLICK OUTSIDE PANEL
    // ==========================

    document
        .querySelector(
            ".client-review-overlay"
        )
        .onclick = () => {

            reviewPanel.classList.add(
                "hidden"
            );


            if (commentSection) {

                commentSection.style.display =
                    "";

            }


            if (actionSection) {

                actionSection.style.display =
                    "";

            }

        };

}


// ==========================
// ASSET STATUS COLOR
// ==========================

function getClientAssetStatusClass(status) {

    if (
        status ===
        "Approved"
    ) {

        return "status-approved";

    }


    if (
        status ===
        "Needs Revision" ||
        status ===
        "Need Revision"
    ) {

        return "status-revision";

    }


    return "status-pending";

}


// ==========================
// CONTENT MESSAGE
// ==========================

function showClientContentMessage(
    message
) {

    const contentList =
        document.getElementById(
            "clientContentList"
        );


    if (!contentList) {
        return;
    }


    contentList.innerHTML = `

        <div
            class="client-empty-state"
        >

            ${message}

        </div>

    `;

}


// ==========================
// CALENDAR
// ==========================

async function showCalendar() {

    const app =
        document.getElementById("clientApp");

    clientPage.innerHTML = `

        <div class="client-calendar-content">

            <!-- ==========================
                 LEFT: CAMPAIGN CALENDAR
            =========================== -->

            <div class="campaign-calendar-card">

                <div class="campaign-calendar-header">

                    <div>

                        <h2>
                            Campaign Calendar
                        </h2>

                        <p>
                            Deadlines, posting dates and meetings
                            update automatically
                        </p>

                    </div>


                    <div class="calendar-header-buttons">

                        <button
                            class="calendar-today-btn"
                            id="clientTodayBtn"
                        >
                            Today
                        </button>


                        <button
                            class="calendar-add-btn"
                            id="clientHeaderAddNote"
                        >
                            + Add Note
                        </button>

                    </div>

                </div>


                <div class="calendar-divider"></div>


                <!-- MONTH NAVIGATION -->

                <div class="calendar-month-navigation">

                    <h3 id="clientCalendarMonth">
                        October 2026
                    </h3>

                    <div class="month-arrow-buttons">

                        <button
                            id="clientPrevMonth"
                            aria-label="Previous month"
                        >
                            ‹
                        </button>


                        <button
                            id="clientNextMonth"
                            aria-label="Next month"
                        >
                            ›
                        </button>

                    </div>

                </div>


                <!-- WEEKDAYS -->

                <div class="calendar-weekdays">

                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>

                </div>


                <!-- CALENDAR -->

                <div
                    id="clientCalendarGrid"
                    class="calendar-grid"
                ></div>


                <!-- LEGEND -->

                <div class="calendar-legend">

                    <div class="legend-item">
                        <span class="legend-dot dot-content"></span>
                        Content deadline
                    </div>

                    <div class="legend-item">
                        <span class="legend-dot dot-review"></span>
                        Review deadline
                    </div>

                    <div class="legend-item">
                        <span class="legend-dot dot-posting"></span>
                        Posting date
                    </div>

                    <div class="legend-item">
                        <span class="legend-dot dot-meeting"></span>
                        Campaign meeting
                    </div>

                    <div class="legend-item">
                        <span class="legend-dot dot-shoot"></span>
                        Shoot
                    </div>

                    <div class="legend-item">
                        <span class="legend-dot dot-reminder"></span>
                        Reminder
                    </div>

                    <div class="legend-item">
                        <span class="legend-dot dot-note"></span>
                        Your note
                    </div>

                </div>

            </div>


            <!-- ==========================
                 RIGHT: SELECTED DAY
            =========================== -->

            <div class="selected-day-card">

                <div class="selected-day-heading">

                    <h2 id="clientSelectedDate">
                        Select a date
                    </h2>

                    <p id="clientDayItemCount">
                        0 items
                    </p>

                </div>


                <div class="calendar-divider"></div>


                <div
                    id="clientDayItems"
                    class="calendar-day-items"
                >

                    <div class="calendar-empty-state">

                        <p>
                            No tasks scheduled for this day.
                        </p>

                    </div>

                </div>


                <button
                    class="selected-day-add-btn"
                    id="clientSelectedDayAddNote"
                >
                    + Add note on this day
                </button>

            </div>

        </div>


        <!-- ==========================
             ADD NOTE MODAL
        =========================== -->

        <div
            id="clientCalendarNoteModal"
            class="client-calendar-modal"
        >

            <div class="client-calendar-modal-content">

                <div class="modal-header">

                    <h2>
                        Add Calendar Note
                    </h2>

                    <button
                        id="clientCloseNoteModal"
                        class="modal-close-btn"
                    >
                        ×
                    </button>

                </div>


                <div class="modal-form">

                    <label>
                        Note title
                    </label>

                    <input
                        type="text"
                        id="clientNoteTitle"
                        placeholder="Enter note title"
                    />


                    <label>
                        Details
                    </label>

                    <textarea
                        id="clientNoteDetails"
                        placeholder="Enter details..."
                    ></textarea>


                    <label>
                        Date
                    </label>

                    <input
                        type="date"
                        id="clientNoteDate"
                    />


                    <div class="modal-actions">

                        <button
                            id="clientCancelNote"
                            class="modal-cancel-btn"
                        >
                            Cancel
                        </button>


                        <button
                            id="clientSaveNote"
                            class="modal-save-btn"
                        >
                            Save Note
                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;


    await loadClientCalendar();

    setupClientCalendarButtons();

}


function setupClientCalendarButtons() {

    // ==========================
    // TODAY
    // ==========================

    const todayBtn =
        document.getElementById(
            "clientTodayBtn"
        );


    if (todayBtn) {

        todayBtn.addEventListener(
            "click",
            () => {

                clientCalendarDate =
                    new Date();

                clientSelectedDate =
                    new Date();

                renderClientCalendar();

                renderClientSelectedDay();

            }
        );

    }


    // ==========================
    // PREVIOUS MONTH
    // ==========================

    const previousBtn =
        document.getElementById(
            "clientPrevMonth"
        );


    if (previousBtn) {

        previousBtn.addEventListener(
            "click",
            () => {

                clientCalendarDate.setMonth(
                    clientCalendarDate.getMonth() - 1
                );

                renderClientCalendar();

            }
        );

    }


    // ==========================
    // NEXT MONTH
    // ==========================

    const nextBtn =
        document.getElementById(
            "clientNextMonth"
        );


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                clientCalendarDate.setMonth(
                    clientCalendarDate.getMonth() + 1
                );

                renderClientCalendar();

            }
        );

    }


    // ==========================
    // HEADER ADD NOTE
    // ==========================

    const headerAddNote =
        document.getElementById(
            "clientHeaderAddNote"
        );


    if (headerAddNote) {

        headerAddNote.addEventListener(
            "click",
            () => {

                openClientNoteModal(
                    clientSelectedDate
                );

            }
        );

    }


    // ==========================
    // SELECTED DAY ADD NOTE
    // ==========================

    const selectedDayAddNote =
        document.getElementById(
            "clientSelectedDayAddNote"
        );


    if (selectedDayAddNote) {

        selectedDayAddNote.addEventListener(
            "click",
            () => {

                openClientNoteModal(
                    clientSelectedDate
                );

            }
        );

    }


    // ==========================
    // CLOSE MODAL
    // ==========================

    const closeBtn =
        document.getElementById(
            "clientCloseNoteModal"
        );


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeClientNoteModal
        );

    }


    const cancelBtn =
        document.getElementById(
            "clientCancelNote"
        );


    if (cancelBtn) {

        cancelBtn.addEventListener(
            "click",
            closeClientNoteModal
        );

    }


    // ==========================
    // SAVE NOTE
    // ==========================

    const saveBtn =
        document.getElementById(
            "clientSaveNote"
        );


    if (saveBtn) {

        saveBtn.addEventListener(
            "click",
            saveClientCalendarNote
        );

    }

}


function openClientNoteModal(date) {

    const modal =
        document.getElementById(
            "clientCalendarNoteModal"
        );


    const dateInput =
        document.getElementById(
            "clientNoteDate"
        );


    if (!modal) {
        return;
    }


    dateInput.value =
        formatCalendarDate(date);


    modal.classList.add(
        "show"
    );

}


function closeClientNoteModal() {

    const modal =
        document.getElementById(
            "clientCalendarNoteModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    const title =
        document.getElementById(
            "clientNoteTitle"
        );


    const details =
        document.getElementById(
            "clientNoteDetails"
        );


    if (title) {
        title.value = "";
    }


    if (details) {
        details.value = "";
    }

}


let clientCalendarDate =
    new Date();


let clientSelectedDate =
    new Date();


let clientCalendarTasks = [];


let clientCalendarNotes = [];


let clientSelectedCampaignId =
    null;


async function getClientCalendarCampaign() {

    const token =
        localStorage.getItem("token");


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

        throw new Error(
            campaigns.message ||
            "Unable to load campaigns."
        );

    }


    const selectedCampaignId =
        localStorage.getItem(
            "selectedCampaign"
        );


    let campaign =
        campaigns.find(
            item =>
                item._id ===
                selectedCampaignId
        );


    if (!campaign) {

        campaign =
            campaigns.find(
                campaign =>
                    campaign.members &&
                    campaign.members.some(
                        member =>
                            member.role ===
                            "Client"
                    )
            );

    }


    if (!campaign) {

        campaign =
            campaigns[0];

    }


    if (!campaign) {

        throw new Error(
            "No campaign available."
        );

    }


    localStorage.setItem(
        "selectedCampaign",
        campaign._id
    );


    return campaign;

}


async function loadClientCalendar() {

    try {

        const token =
            localStorage.getItem("token");


        const campaign =
            await getClientCalendarCampaign();


        clientSelectedCampaignId =
            campaign._id;


        // ==========================
        // LOAD TASKS
        // ==========================

        const taskResponse =
            await fetch(
                `/api/tasks/campaign/${clientSelectedCampaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const taskData =
            await taskResponse.json();


        if (!taskResponse.ok) {

            throw new Error(
                taskData.message ||
                "Unable to load tasks."
            );

        }


        clientCalendarTasks =
            taskData;


        // ==========================
        // LOAD NOTES
        // ==========================

        const noteResponse =
            await fetch(
                `/api/calendar/campaign/${clientSelectedCampaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const noteData =
            await noteResponse.json();


        if (!noteResponse.ok) {

            throw new Error(
                noteData.message ||
                "Unable to load calendar notes."
            );

        }


        clientCalendarNotes =
            noteData;


        renderClientCalendar();

        renderClientSelectedDay();


    } catch (error) {

        console.error(
            "CLIENT CALENDAR ERROR:",
            error
        );


        const grid =
            document.getElementById(
                "clientCalendarGrid"
            );


        if (grid) {

            grid.innerHTML = `
                <div class="calendar-error">
                    ${error.message}
                </div>
            `;

        }

    }

}


function renderClientCalendar() {

    const grid =
        document.getElementById(
            "clientCalendarGrid"
        );


    const monthTitle =
        document.getElementById(
            "clientCalendarMonth"
        );


    if (!grid || !monthTitle) {
        return;
    }


    const year =
        clientCalendarDate.getFullYear();


    const month =
        clientCalendarDate.getMonth();


    const monthName =
        clientCalendarDate.toLocaleString(
            "default",
            {
                month: "long"
            }
        );


    monthTitle.textContent =
        `${monthName} ${year}`;


    grid.innerHTML = "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "calendar-day empty";


        grid.appendChild(
            empty
        );

    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const cell =
            document.createElement(
                "div"
            );


        cell.className =
            "calendar-day";


        const date =
            new Date(
                year,
                month,
                day
            );


        const dateString =
            formatCalendarDate(
                date
            );


        const today =
            new Date();


        if (
            date.toDateString() ===
            today.toDateString()
        ) {

            cell.classList.add(
                "today"
            );

        }


        if (
            date.toDateString() ===
            clientSelectedDate.toDateString()
        ) {

            cell.classList.add(
                "selected"
            );

        }


        const number =
            document.createElement(
                "div"
            );


        number.className =
            "calendar-day-number";


        number.textContent =
            day;


        cell.appendChild(
            number
        );


        const dayTasks =
            getTasksForDate(
                dateString
            );


        const dayNotes =
            getNotesForDate(
                dateString
            );


        // ==========================
        // TASK DOTS
        // ==========================

        dayTasks.forEach(
            task => {

                const taskDot =
                    document.createElement(
                        "span"
                    );


                taskDot.className =
                    "calendar-dot";


                const taskType =
                    (
                        task.type ||
                        ""
                    ).toLowerCase();


                if (
                    taskType ===
                    "content deadline"
                ) {

                    taskDot.classList.add(
                        "dot-content"
                    );

                } else if (
                    taskType ===
                    "review deadline"
                ) {

                    taskDot.classList.add(
                        "dot-review"
                    );

                } else if (
                    taskType ===
                    "posting date"
                ) {

                    taskDot.classList.add(
                        "dot-posting"
                    );

                } else if (
                    taskType ===
                    "campaign meeting"
                ) {

                    taskDot.classList.add(
                        "dot-meeting"
                    );

                } else if (
                    taskType ===
                    "shoot"
                ) {

                    taskDot.classList.add(
                        "dot-shoot"
                    );

                } else if (
                    taskType ===
                    "reminder"
                ) {

                    taskDot.classList.add(
                        "dot-reminder"
                    );

                } else {

                    taskDot.classList.add(
                        "dot-content"
                    );

                }


                taskDot.title =
                    task.name;


                cell.appendChild(
                    taskDot
                );

            }
        );


        // ==========================
        // CALENDAR NOTE DOT
        // ==========================

        dayNotes.forEach(
            note => {

                const noteDot =
                    document.createElement(
                        "span"
                    );


                noteDot.className =
                    "calendar-dot dot-note";


                noteDot.title =
                    note.title;


                cell.appendChild(
                    noteDot
                );

            }
        );


        cell.addEventListener(
            "click",
            () => {

                clientSelectedDate =
                    date;


                renderClientCalendar();


                renderClientSelectedDay();

            }
        );


        grid.appendChild(
            cell
        );

    }

}


function formatCalendarDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


function getTasksForDate(dateString) {

    return clientCalendarTasks.filter(
        task => {

            if (!task.dueDate) {
                return false;
            }


            return normalizeTaskDate(
                task.dueDate
            ) === dateString;

        }
    );

}


function normalizeTaskDate(value) {

    if (!value) {
        return "";
    }


    if (
        typeof value === "string" &&
        value.length >= 10
    ) {

        return value.substring(
            0,
            10
        );

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return formatCalendarDate(
        date
    );

}


function getNotesForDate(dateString) {

    return clientCalendarNotes.filter(
        note =>
            normalizeTaskDate(
                note.date
            ) === dateString
    );

}


function renderClientSelectedDay() {

    const title =
        document.getElementById(
            "clientSelectedDate"
        );


    const container =
        document.getElementById(
            "clientDayItems"
        );


    if (!title || !container) {
        return;
    }


    const dateString =
        formatCalendarDate(
            clientSelectedDate
        );


    title.textContent =
        clientSelectedDate.toLocaleDateString(
            "default",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    const tasks =
        getTasksForDate(
            dateString
        );


    const notes =
        getNotesForDate(
            dateString
        );


    const itemCount =
        document.getElementById(
            "clientDayItemCount"
        );


    if (itemCount) {

        const total =
            tasks.length +
            notes.length;


        itemCount.textContent =
            `${total} ${
                total === 1
                    ? "item"
                    : "items"
            }`;

    }


    container.innerHTML = "";


    if (
        tasks.length === 0 &&
        notes.length === 0
    ) {

        container.innerHTML = `

            <div class="calendar-empty-state">

                <p>
                    No tasks scheduled for this day.
                </p>

            </div>

        `;

        return;

    }


    // ==========================
    // TASKS
    // ==========================

    tasks.forEach(
        task => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "calendar-event task-event";


            item.innerHTML = `

                <div class="event-type">
                    TASK
                </div>


                <h3>
                    ${escapeCalendarHTML(
                        task.name
                    )}
                </h3>


                <p>
                    ${escapeCalendarHTML(
                        task.description ||
                        "No description."
                    )}
                </p>


                <span class="event-status">
                    ${escapeCalendarHTML(
                        task.status
                    )}
                </span>

            `;


            container.appendChild(
                item
            );

        }
    );


    // ==========================
    // NOTES
    // ==========================

    notes.forEach(
        note => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "calendar-event note-event";


            item.innerHTML = `

                <div class="event-type">
                    CALENDAR NOTE
                </div>


                <h3>
                    ${escapeCalendarHTML(
                        note.title
                    )}
                </h3>


                <p>
                    ${escapeCalendarHTML(
                        note.details ||
                        "No details."
                    )}
                </p>

            `;


            container.appendChild(
                item
            );

        }
    );

}


function escapeCalendarHTML(value) {

    return String(
        value || ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.id ===
            "clientPrevMonth"
        ) {

            clientCalendarDate.setMonth(
                clientCalendarDate.getMonth() - 1
            );


            renderClientCalendar();


            return;

        }


        if (
            event.target.id ===
            "clientNextMonth"
        ) {

            clientCalendarDate.setMonth(
                clientCalendarDate.getMonth() + 1
            );


            renderClientCalendar();


            return;

        }


        if (
            event.target.id ===
            "clientTodayBtn"
        ) {

            clientCalendarDate =
                new Date();


            clientSelectedDate =
                new Date();


            renderClientCalendar();


            renderClientSelectedDay();

        }

    }
);


// ==========================
// BRIEF
// ==========================

async function showBrief() {

    const token =
        localStorage.getItem("token");


    try {

        const response =
            await fetch(
                "/api/campaigns",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const campaigns =
            await response.json();


        if (
            !response.ok ||
            !campaigns.length
        ) {

            clientPage.innerHTML = `

                <section class="client-card">

                    <div class="client-card-header">

                        <div>

                            <h3>
                                Campaign Brief
                            </h3>

                            <p>
                                Important campaign information.
                            </p>

                        </div>

                    </div>


                    <div class="client-brief-content">

                        <div>
                            <span>Objective</span>
                            <strong>—</strong>
                        </div>


                        <div>
                            <span>Target Audience</span>
                            <strong>—</strong>
                        </div>


                        <div>
                            <span>Key Message</span>
                            <strong>—</strong>
                        </div>

                    </div>

                </section>

            `;


            return;

        }


        const selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        const campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            ) ||
            campaigns[0];


        const brief =
            campaign.brief ||
            {};


        clientPage.innerHTML = `

            <section class="client-card">

                <div class="client-card-header">

                    <div>

                        <h3>
                            Campaign Brief
                        </h3>

                        <p>
                            Important campaign information.
                        </p>

                    </div>

                </div>


                <div class="client-brief-content">

                    <div>

                        <span>
                            Objective
                        </span>

                        <strong>
                            ${escapeCalendarHTML(
                                brief.objective ||
                                "—"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Target Audience
                        </span>

                        <strong>
                            ${escapeCalendarHTML(
                                brief.targetAudience ||
                                "—"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Key Message
                        </span>

                        <strong>
                            ${escapeCalendarHTML(
                                brief.keyMessage ||
                                "—"
                            )}
                        </strong>

                    </div>

                </div>

            </section>

        `;


    } catch (error) {

        console.error(
            "Campaign brief error:",
            error
        );

    }

}


// ==========================
// REFERENCES
// ==========================

async function showReferences() {

    clientPage.innerHTML = `

        <section class="client-card">

            <div class="client-card-header">

                <div>

                    <h3>
                        References
                    </h3>

                    <p>
                        Useful links and resources for this campaign.
                    </p>

                </div>

            </div>


            <div
                id="clientReferencesList"
                class="client-references-list"
            >

                <div class="client-empty-state">
                    Loading references...
                </div>

            </div>

        </section>

    `;


    const referencesList =
        document.getElementById(
            "clientReferencesList"
        );


    const token =
        localStorage.getItem("token");


    try {

        const campaignResponse =
            await fetch(
                "/api/campaigns",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const campaigns =
            await campaignResponse.json();


        if (!campaignResponse.ok) {

            throw new Error(
                campaigns.message ||
                "Unable to load campaigns."
            );

        }


        const selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        const campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            ) ||
            campaigns[0];


        if (!campaign) {

            referencesList.innerHTML = `

                <div class="client-empty-state">
                    No campaign found.
                </div>

            `;


            return;

        }


        const response =
            await fetch(
                `/api/references/campaign/${campaign._id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const references =
            await response.json();


        if (!response.ok) {

            referencesList.innerHTML = `

                <div class="client-empty-state">
                    Unable to load references.
                </div>

            `;


            console.error(
                references.message ||
                "Unable to load references."
            );


            return;

        }


        if (
            references.length === 0
        ) {

            referencesList.innerHTML = `

                <div class="client-empty-state">
                    No references added yet.
                </div>

            `;


            return;

        }


        referencesList.innerHTML = "";


        references.forEach(
            reference => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "client-reference-row";


                row.innerHTML = `

                    <div class="client-reference-icon">
                        🔗
                    </div>


                    <div class="client-reference-info">

                        <div class="client-reference-title">
                            ${escapeCalendarHTML(
                                reference.title
                            )}
                        </div>


                        <div class="client-reference-url">
                            ${escapeCalendarHTML(
                                reference.url
                            )}
                        </div>

                    </div>


                    <button
                        class="client-reference-open"
                    >
                        Open
                    </button>

                `;


                row
                    .querySelector(
                        ".client-reference-open"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            window.open(
                                reference.url,
                                "_blank",
                                "noopener,noreferrer"
                            );

                        }
                    );


                referencesList.appendChild(
                    row
                );

            }
        );


    } catch (error) {

        console.error(
            "Load client references error:",
            error
        );


        referencesList.innerHTML = `

            <div class="client-empty-state">
                Unable to connect to server.
            </div>

        `;

    }

}


// ==========================
// HISTORY
// ==========================

async function showHistory() {

    const token =
        localStorage.getItem("token");


    if (!token) {
        return;
    }


    clientPage.innerHTML = `

        <section class="client-card">

            <div class="client-card-header">

                <div>

                    <h3>
                        Activity History
                    </h3>

                    <p>
                        Previous campaign activity.
                    </p>

                </div>

            </div>


            <div
                id="client-history-list"
                class="client-empty-state"
            >
                Loading activity history...
            </div>

        </section>

    `;


    try {

        const selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        if (!selectedCampaignId) {

            document.getElementById(
                "client-history-list"
            ).innerHTML =
                "No campaign selected.";


            return;

        }


        const response =
            await fetch(
                `/api/audit-logs?campaignId=${selectedCampaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const logs =
            await response.json();


        if (!response.ok) {

            console.error(
                logs.message ||
                "Unable to load activity history."
            );


            document.getElementById(
                "client-history-list"
            ).innerHTML =
                "Unable to load activity history.";


            return;

        }


        const historyContainer =
            document.getElementById(
                "client-history-list"
            );


        if (!logs.length) {

            historyContainer.innerHTML =
                "No activity history available yet.";


            return;

        }


        historyContainer.className =
            "client-history-list";


        historyContainer.innerHTML =
            logs
                .map(
                    log => {

                        const date =
                            new Date(
                                log.createdAt
                            ).toLocaleString(
                                undefined,
                                {
                                    dateStyle:
                                        "medium",
                                    timeStyle:
                                        "short"
                                }
                            );


                        const username =
                            log.user?.username ||
                            "Unknown user";


                        return `

                            <div
                                class="client-history-item"
                            >

                                <div
                                    class="client-history-content"
                                >

                                    <strong>
                                        ${escapeCalendarHTML(
                                            log.action
                                        )}
                                    </strong>


                                    <p>
                                        ${escapeCalendarHTML(
                                            log.description
                                        )}
                                    </p>


                                    <small>
                                        ${escapeCalendarHTML(
                                            username
                                        )}
                                        •
                                        ${date}
                                    </small>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");


    } catch (error) {

        console.error(
            "Activity history error:",
            error
        );


        const historyContainer =
            document.getElementById(
                "client-history-list"
            );


        if (historyContainer) {

            historyContainer.innerHTML =
                "Unable to load activity history.";

        }

    }

}


// ==========================
// ACCOUNT
// ==========================

function showAccount() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    clientPage.innerHTML = `

        <section class="client-card">

            <div class="client-card-header">

                <div>

                    <h3>
                        Account Information
                    </h3>

                    <p>
                        Your account details.
                    </p>

                </div>

            </div>


            <div class="client-brief-content">

                <div>

                    <span>
                        Username
                    </span>

                    <strong>
                        ${user?.username || "—"}
                    </strong>

                </div>


                <div>

                    <span>
                        Email
                    </span>

                    <strong>
                        ${user?.email || "—"}
                    </strong>

                </div>


                <div>

                    <span>
                        Account Type
                    </span>

                    <strong>
                        ${user?.accountType || "—"}
                    </strong>

                </div>

            </div>


            <div class="account-actions">

                <button
                    type="button"
                    id="clientLogoutBtn"
                >
                    Log Out
                </button>

            </div>

        </section>

    `;


    const logoutButton =
        document.getElementById(
            "clientLogoutBtn"
        );


    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("selectedCampaign");

            window.location.href =
                "/login.html";

        }
    );

}


// ==========================
// LOAD CAMPAIGN DATA
// ==========================

async function loadClientCampaign() {

    const token =
        localStorage.getItem("token");


    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!token || !user) {

        window.location.href =
            "login.html";

        return;

    }


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


        if (!response.ok) {

            console.error(
                "Unable to load campaigns."
            );

            return;

        }


        const campaigns =
            await response.json();


        console.log(
            "CLIENT CAMPAIGNS:",
            campaigns
        );


        const selectedCampaignId =
            localStorage.getItem(
                "selectedCampaign"
            );


        const campaign =
            campaigns.find(
                item =>
                    item._id ===
                    selectedCampaignId
            ) ||
            campaigns[0];


        if (!campaign) {

            const nameElement =
                document.getElementById(
                    "clientCampaignName"
                );


            const descriptionElement =
                document.getElementById(
                    "clientCampaignDescription"
                );


            const statusElement =
                document.getElementById(
                    "clientCampaignStatus"
                );


            if (nameElement) {

                nameElement.textContent =
                    "No campaign assigned";

            }


            if (descriptionElement) {

                descriptionElement.textContent =
                    "You are not currently assigned to a campaign.";

            }


            if (statusElement) {

                statusElement.textContent =
                    "No Campaign";

            }


            return;

        }


        // ==========================
        // SAVE SELECTED CAMPAIGN
        // ==========================

        localStorage.setItem(
            "selectedCampaign",
            campaign._id
        );


        // ==========================
        // DISPLAY CAMPAIGN
        // ==========================

        const campaignName =
            document.getElementById(
                "clientCampaignName"
            );


        const campaignDescription =
            document.getElementById(
                "clientCampaignDescription"
            );


        const campaignStatus =
            document.getElementById(
                "clientCampaignStatus"
            );


        if (campaignName) {

            campaignName.textContent =
                campaign.name;

        }


        if (campaignDescription) {

            campaignDescription.textContent =
                campaign.description ||
                "No campaign description available.";

        }


        if (campaignStatus) {

            campaignStatus.textContent =
                campaign.status;

        }


        console.log(
            "Client campaign:",
            campaign
        );


    } catch (error) {

        console.error(
            "Campaign loading error:",
            error
        );

    }

}


// ==========================
// CLIENT NOTIFICATIONS
// ==========================

let clientNotifications = [];


async function loadClientNotifications() {

    const token =
        localStorage.getItem("token");


    if (!token) {
        return;
    }


    try {

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


        const notifications =
            await response.json();


        if (!response.ok) {

            console.error(
                notifications.message ||
                "Unable to load notifications."
            );


            return;

        }


        clientNotifications =
            notifications;


        updateClientNotificationDot();


    } catch (error) {

        console.error(
            "Client notifications error:",
            error
        );

    }

}


// ==========================
// NOTIFICATION DOT
// ==========================

function updateClientNotificationDot() {

    const dot =
        document.getElementById(
            "clientNotificationDot"
        );


    if (!dot) {
        return;
    }


    const unreadCount =
        clientNotifications.filter(
            notification =>
                !notification.isRead
        ).length;


    if (unreadCount > 0) {

        dot.classList.remove(
            "hidden"
        );

    } else {

        dot.classList.add(
            "hidden"
        );

    }

}


// ==========================
// SHOW NOTIFICATIONS
// ==========================

function showClientNotifications() {

    let panel =
        document.getElementById(
            "clientNotificationPanel"
        );


    if (!panel) {

        panel =
            document.createElement(
                "div"
            );


        panel.id =
            "clientNotificationPanel";


        panel.className =
            "client-notification-panel";


        document.body.appendChild(
            panel
        );

    }


    if (
        !clientNotifications ||
        clientNotifications.length === 0
    ) {

        panel.innerHTML = `

            <div class="client-notification-header">
                <strong>Notifications</strong>
            </div>


            <div class="client-notification-empty">
                No notifications yet.
            </div>

        `;


        panel.classList.toggle(
            "show"
        );


        return;

    }


    panel.innerHTML = `

        <div class="client-notification-header">

            <strong>
                Notifications
            </strong>

        </div>


        <div class="client-notification-list">

            ${
                clientNotifications
                    .map(
                        notification => `

                            <div
                                class="client-notification-item ${
                                    notification.isRead
                                        ? ""
                                        : "unread"
                                }"
                                data-notification-id="${notification._id}"
                            >

                                <div
                                    class="client-notification-icon"
                                >
                                    ${
                                        notification.type ===
                                        "Audit Log"
                                            ? "📋"
                                            : "✓"
                                    }
                                </div>


                                <div
                                    class="client-notification-content"
                                >

                                    <strong>
                                        ${escapeCalendarHTML(
                                            notification.title
                                        )}
                                    </strong>


                                    <p>
                                        ${escapeCalendarHTML(
                                            notification.message ||
                                            ""
                                        )}
                                    </p>


                                    <small>
                                        ${new Date(
                                            notification.createdAt
                                        ).toLocaleString()}
                                    </small>

                                </div>

                            </div>

                        `
                    )
                    .join("")
            }

        </div>

    `;


    panel.classList.toggle(
        "show"
    );


    // ==========================
    // MARK AS READ
    // ==========================

    panel
        .querySelectorAll(
            ".client-notification-item"
        )
        .forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        markClientNotificationAsRead(
                            item.dataset.notificationId
                        );

                    }
                );

            }
        );

}


// ==========================
// MARK CLIENT NOTIFICATION
// ==========================

async function markClientNotificationAsRead(
    notificationId
) {

    const token =
        localStorage.getItem("token");


    try {

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
            clientNotifications.find(
                item =>
                    item._id ===
                    notificationId
            );


        if (notification) {

            notification.isRead =
                true;

        }


        updateClientNotificationDot();


        showClientNotifications();


    } catch (error) {

        console.error(
            "Mark notification error:",
            error
        );

    }

}


// ==========================
// NOTIFICATION BUTTON
// ==========================

const clientNotificationButton =
    document.getElementById(
        "clientNotificationButton"
    );


if (clientNotificationButton) {

    clientNotificationButton.addEventListener(
        "click",
        () => {

            showClientNotifications();

        }
    );

}


// ==========================
// INITIAL DASHBOARD
// ==========================

// IMPORTANT:
// Load the actual dashboard functions
// immediately when the page opens.

showDashboard();


// Keep the existing campaign loader.

loadClientCampaign();


// Keep notifications loading.

loadClientNotifications();