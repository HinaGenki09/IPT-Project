const menuButton =
    document.getElementById("menuButton");

const logoutButton =
    document.getElementById("logoutButton");

const campaignGrid =
    document.getElementById("campaignGrid");

const searchCampaign =
    document.getElementById("searchCampaign");

const newCampaignButton =
    document.getElementById("newCampaignButton");

const campaignModal =
    document.getElementById("campaignModal");

const closeModal =
    document.getElementById("closeModal");

const campaignForm =
    document.getElementById("campaignForm");

const campaignMessage =
    document.getElementById("campaignMessage");


// ==========================
// SIDEBAR / PROFILE
// ==========================

const sidebar =
    document.getElementById("sidebar");

const profileButton =
    document.getElementById("profileButton");

const auditLogsButton =
    document.getElementById("auditLogsButton");

const profilePanel =
    document.getElementById("profilePanel");

const auditPanel =
    document.getElementById("auditPanel");

const closeProfilePanel =
    document.getElementById("closeProfilePanel");

const closeAuditPanel =
    document.getElementById("closeAuditPanel");


// ==========================
// PEOPLE WITH ACCESS
// ==========================

const accessSection =
    document.getElementById("accessSection");

const campaignMembers =
    document.getElementById("campaignMembers");

const clientSelect =
    document.getElementById(
        "clientSelect"
    );

const collaboratorSelect =
    document.getElementById(
        "collaboratorSelect"
    );

const addClientButton =
    document.getElementById(
        "addClientButton"
    );

const addCollaboratorButton =
    document.getElementById(
        "addCollaboratorButton"
    );


// ==========================
// DATA
// ==========================

let campaigns = [];

let selectedMembers = [];

let availableUsers = [];


// ==========================
// PROFILE
// ==========================

const user =
    JSON.parse(
        localStorage.getItem("user") || "{}"
    );

if (user) {

    const profileUsername =
        document.getElementById(
            "profileUsername"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profileUsernameDetail =
        document.getElementById(
            "profileUsernameDetail"
        );

    const profileEmailDetail =
        document.getElementById(
            "profileEmailDetail"
        );

    const profileAccountType =
        document.getElementById(
            "profileAccountType"
        );


    if (profileUsername) {

        profileUsername.textContent =
            user.username || "Username";

    }


    if (profileEmail) {

        profileEmail.textContent =
            user.email ||
            "email@example.com";

    }


    if (profileUsernameDetail) {

        profileUsernameDetail.textContent =
            user.username || "Username";

    }


    if (profileEmailDetail) {

        profileEmailDetail.textContent =
            user.email ||
            "email@example.com";

    }


    if (profileAccountType) {

        profileAccountType.textContent =
            user.accountType ||
            "Content Creator";

    }

}


// ==========================
// SIDEBAR
// ==========================

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "show"
        );

    }
);


// ==========================
// PROFILE BUTTON
// ==========================

if (profileButton) {

    profileButton.addEventListener(
        "click",
        () => {

            profilePanel.classList.add(
                "show"
            );

            auditPanel.classList.remove(
                "show"
            );

            sidebar.classList.remove(
                "show"
            );

        }
    );

}


// ==========================
// CLOSE PROFILE
// ==========================

if (closeProfilePanel) {

    closeProfilePanel.addEventListener(
        "click",
        () => {

            profilePanel.classList.remove(
                "show"
            );

        }
    );

}


// ==========================
// AUDIT LOGS BUTTON
// ==========================

if (auditLogsButton) {

    auditLogsButton.addEventListener(
        "click",
        () => {

            auditPanel.classList.add(
                "show"
            );

            profilePanel.classList.remove(
                "show"
            );

            sidebar.classList.remove(
                "show"
            );


            const selectedCampaign =
                localStorage.getItem(
                    "selectedCampaign"
                );


            console.log(
                "SELECTED CAMPAIGN:",
                localStorage.getItem(
                    "selectedCampaign"
                )
            );


            if (!selectedCampaign) {

                const auditLogList =
                    document.getElementById(
                        "auditLogList"
                    );

                if (auditLogList) {

                    auditLogList.innerHTML =
                        "<p>Please open a campaign first to view its audit logs.</p>";

                }

                return;

            }


            loadAuditLogs(
                selectedCampaign
            );

        }
    );

}


// ==========================
// LOAD AUDIT LOGS
// ==========================

async function loadAuditLogs(
    campaignId
) {

    const auditLogList =
        document.getElementById(
            "auditLogList"
        );

    if (!auditLogList) {
        return;
    }


    auditLogList.innerHTML =
        "<p>Loading audit logs...</p>";


    try {

        const response =
            await fetch(
                `/api/audit-logs?campaignId=${campaignId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            auditLogList.innerHTML =
                `<p>${
                    data.message ||
                    "Unable to load audit logs."
                }</p>`;

            return;

        }


        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            auditLogList.innerHTML =
                "<p>No audit logs yet.</p>";

            return;

        }


        auditLogList.innerHTML = "";


        data.forEach(
            (log) => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "audit-log-item";


                const date =
                    log.createdAt
                        ? new Date(
                            log.createdAt
                        ).toLocaleString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                            }
                        )
                        : "";


                item.innerHTML = `

                    <div class="audit-log-main">

                        <strong>
                            ${log.action || "Activity"}
                        </strong>

                        <p>
                            ${log.description || ""}
                        </p>

                    </div>

                    <small>
                        ${date}
                    </small>

                `;


                auditLogList.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            "AUDIT LOG ERROR:",
            error
        );


        auditLogList.innerHTML =
            "<p>Unable to load audit logs.</p>";

    }

}


// ==========================
// CLOSE AUDIT LOGS
// ==========================

if (closeAuditPanel) {

    closeAuditPanel.addEventListener(
        "click",
        () => {

            auditPanel.classList.remove(
                "show"
            );

        }
    );

}


// ==========================
// LOGOUT
// ==========================

logoutButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "/login.html";

    }
);


// ==========================
// LOAD CAMPAIGNS
// ==========================

async function loadCampaigns() {

    try {

        const response =
            await fetch(
                "/api/campaigns",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

        campaigns =
            await response.json();

        displayCampaigns(
            campaigns
        );

    } catch (error) {

        console.error(error);

        campaignGrid.innerHTML =
            "<p>Unable to load campaigns.</p>";

    }

}


// ==========================
// DISPLAY CAMPAIGNS
// ==========================

function displayCampaigns(list) {

    campaignGrid.innerHTML = "";

    if (list.length === 0) {

        campaignGrid.innerHTML =
            "<p>No campaigns yet.</p>";

        return;

    }

    list.forEach(
        (campaign) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "campaign-card";

            card.innerHTML = `
                <img
                    class="campaign-image"
                    src="${
                        campaign.image ||
                        "https://via.placeholder.com/300x150"
                    }"
                    alt="Campaign image"
                >

                <div class="campaign-card-content">

                    <div class="campaign-card-header">

                        <h3>
                            ${campaign.name}
                        </h3>

                        <button
                            class="campaign-menu-button"
                            data-id="${campaign._id}"
                        >
                            ⋮
                        </button>

                    </div>

                    <p>
                        Owner: ${campaign.owner}
                    </p>

                    <p>
                        ${campaign.description || "No description."}
                    </p>

                    <p>
                        ${formatDate(
                            campaign.startDate
                        )}
                        -
                        ${formatDate(
                            campaign.endDate
                        )}
                    </p>

                    <span class="status">
                        ${campaign.status}
                    </span>

                    <div
                        class="campaign-actions"
                        id="actions-${campaign._id}"
                    >

                        <button
                            class="edit-campaign"
                            data-id="${campaign._id}"
                        >
                            Edit Campaign
                        </button>

                        <button
                            class="delete-campaign"
                            data-id="${campaign._id}"
                        >
                            Delete Campaign
                        </button>

                    </div>

                </div>
            `;


            // ==========================
            // CAMPAIGN MENU
            // ==========================

            const cardMenuButton =
                card.querySelector(
                    ".campaign-menu-button"
                );

            const actions =
                card.querySelector(
                    ".campaign-actions"
                );

            cardMenuButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    actions.classList.toggle(
                        "show"
                    );

                }
            );


            // ==========================
            // EDIT BUTTON
            // ==========================

            const editButton =
                card.querySelector(
                    ".edit-campaign"
                );

            editButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    openEditCampaign(
                        campaign
                    );

                }
            );


            // ==========================
            // DELETE BUTTON
            // ==========================

            const deleteButton =
                card.querySelector(
                    ".delete-campaign"
                );

            deleteButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    deleteCampaign(
                        campaign._id
                    );

                }
            );


            // ==========================
            // OPEN CAMPAIGN
            // ==========================

            card.addEventListener(
                "click",
                () => {

                    localStorage.setItem(
                        "selectedCampaign",
                        campaign._id
                    );

                    window.location.href =
                        "/workspace.html";

                }
            );


            campaignGrid.appendChild(
                card
            );

        }
    );

}


// ==========================
// EDIT CAMPAIGN
// ==========================

function openEditCampaign(
    campaign
) {

    document.getElementById(
        "campaignName"
    ).value =
        campaign.name;

    document.getElementById(
        "campaignDescription"
    ).value =
        campaign.description || "";


    document.getElementById(
        "startDate"
    ).value =
        campaign.startDate.split(
            "T"
        )[0];


    document.getElementById(
        "endDate"
    ).value =
        campaign.endDate.split(
            "T"
        )[0];


    document.getElementById(
        "campaignImage"
    ).value =
        campaign.image || "";


    // ==========================
    // EXISTING MEMBERS
    // ==========================

    selectedMembers =
        campaign.members
            ? campaign.members.map(
                (member) => ({

                    userId:
                        member.user
                            ? member.user._id
                            : member._id,

                    role:
                        member.role ||
                        "Collaborator"

                })
            )
            : [];


    displayMembers();

    loadUsers();


    campaignMessage.textContent =
        "";


    campaignModal.classList.add(
        "show"
    );


    campaignForm.dataset.editId =
        campaign._id;

}


// ==========================
// LOAD USERS
// ==========================

async function loadUsers() {

    try {

        const response =
    await fetch(
        "/api/auth/users",
        {
            headers: {
                "Authorization":
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );


        if (!response.ok) {

            throw new Error(
                "Unable to load users."
            );

        }


        availableUsers =
            await response.json();


        // ==========================
        // CLIENT DROPDOWN
        // ==========================

        clientSelect.innerHTML = `
            <option value="">
                Select Client
            </option>
        `;


        availableUsers.forEach(
            (user) => {

                const alreadyAdded =
                    selectedMembers.some(
                        member =>
                            member.userId ===
                            user._id
                    );


                if (
                    user.accountType ===
                        "Client" &&
                    !alreadyAdded
                ) {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        user._id;

                    option.textContent =
                        `${user.username} (${user.email})`;

                    clientSelect.appendChild(
                        option
                    );

                }

            }
        );


        // ==========================
        // COLLABORATOR DROPDOWN
        // ==========================

        collaboratorSelect.innerHTML = `
            <option value="">
                Select Collaborator (CC)
            </option>
        `;


        availableUsers.forEach(
            (user) => {

                const alreadyAdded =
                    selectedMembers.some(
                        member =>
                            member.userId ===
                            user._id
                    );


                if (
                    user.accountType ===
                        "Content Creator" &&
                    !alreadyAdded
                ) {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        user._id;

                    option.textContent =
                        `${user.username} (${user.email})`;

                    collaboratorSelect.appendChild(
                        option
                    );

                }

            }
        );


        displayMembers();


    } catch (error) {

        console.error(error);

        clientSelect.innerHTML = `
            <option value="">
                Unable to load clients
            </option>
        `;

        collaboratorSelect.innerHTML = `
            <option value="">
                Unable to load CCs
            </option>
        `;

    }

}


// ==========================
// DISPLAY MEMBERS
// ==========================

function displayMembers() {

    campaignMembers.innerHTML =
        "";

    if (
        selectedMembers.length === 0
    ) {

        campaignMembers.innerHTML = `
            <p class="no-members">
                No people added yet.
            </p>
        `;

        return;

    }


    selectedMembers.forEach(
        (memberData) => {

            const member =
                availableUsers.find(
                    (user) =>
                        user._id ===
                        memberData.userId
                );


            if (!member) {
                return;
            }


            const memberItem =
                document.createElement(
                    "div"
                );

            memberItem.className =
                "member-item";


            memberItem.innerHTML = `
                <div>

                    <strong>
                        ${member.username}
                    </strong>

                    <small>
                        ${member.email}
                    </small>

                    <small>
                        Role:
                        ${memberData.role}
                    </small>

                </div>

                <button
                    type="button"
                    class="remove-member"
                >
                    Remove
                </button>
            `;


            const removeButton =
                memberItem.querySelector(
                    ".remove-member"
                );


            removeButton.addEventListener(
                "click",
                () => {

                    selectedMembers =
                        selectedMembers.filter(
                            (item) =>
                                item.userId !==
                                member._id
                        );


                    displayMembers();

                    loadUsers();

                }
            );


            campaignMembers.appendChild(
                memberItem
            );

        }
    );

}


// ==========================
// ADD CLIENT
// ==========================

addClientButton.addEventListener(
    "click",
    () => {

        const userId =
            clientSelect.value;


        if (!userId) {

            alert(
                "Please select a client first."
            );

            return;

        }


        const alreadyAdded =
            selectedMembers.some(
                member =>
                    member.userId ===
                    userId
            );


        if (alreadyAdded) {

            alert(
                "This person already has access."
            );

            return;

        }


        selectedMembers.push({

            userId:
                userId,

            role:
                "Client"

        });


        clientSelect.value =
            "";


        displayMembers();

        loadUsers();

    }
);


// ==========================
// ADD COLLABORATOR
// ==========================

addCollaboratorButton.addEventListener(
    "click",
    () => {

        const userId =
            collaboratorSelect.value;


        if (!userId) {

            alert(
                "Please select a collaborator first."
            );

            return;

        }


        const alreadyAdded =
            selectedMembers.some(
                member =>
                    member.userId ===
                    userId
            );


        if (alreadyAdded) {

            alert(
                "This person already has access."
            );

            return;

        }


        selectedMembers.push({

            userId:
                userId,

            role:
                "Collaborator"

        });


        collaboratorSelect.value =
            "";


        displayMembers();

        loadUsers();

    }
);


// ==========================
// DATE FORMAT
// ==========================

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric"
            }
        );

}


// ==========================
// SEARCH
// ==========================

searchCampaign.addEventListener(
    "input",
    () => {

        const search =
            searchCampaign.value
                .toLowerCase()
                .trim();


        const filtered =
            campaigns.filter(
                (campaign) =>
                    campaign.name
                        .toLowerCase()
                        .includes(
                            search
                        )
            );


        displayCampaigns(
            filtered
        );

    }
);


// ==========================
// NEW CAMPAIGN MODAL
// ==========================

newCampaignButton.addEventListener(
    "click",
    () => {

        if (
            campaigns.length >= 3
        ) {

            alert(
                "You can only create up to 3 campaigns."
            );

            return;

        }


        // Make sure this is
        // a NEW campaign

        delete campaignForm.dataset.editId;


        campaignForm.reset();


        // Clear members

        selectedMembers = [];


        // Reset member selectors

        clientSelect.value =
            "";

        collaboratorSelect.value =
            "";


        displayMembers();

        loadUsers();


        campaignMessage.textContent =
            "";


        campaignModal.classList.add(
            "show"
        );

    }
);


// ==========================
// CLOSE MODAL
// ==========================

closeModal.addEventListener(
    "click",
    () => {

        campaignModal.classList.remove(
            "show"
        );


        campaignForm.reset();


        delete campaignForm.dataset.editId;


        selectedMembers = [];


        // Reset member selectors

        clientSelect.value =
            "";

        collaboratorSelect.value =
            "";


        displayMembers();


        campaignMessage.textContent =
            "";

    }
);


// ==========================
// CREATE / UPDATE CAMPAIGN
// ==========================

campaignForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const campaignData = {

            name:
                document.getElementById(
                    "campaignName"
                ).value,

            description:
                document.getElementById(
                    "campaignDescription"
                ).value,

            startDate:
                document.getElementById(
                    "startDate"
                ).value,

            endDate:
                document.getElementById(
                    "endDate"
                ).value,

            image:
                document.getElementById(
                    "campaignImage"
                ).value,

            members:
                selectedMembers.map(
                    member => ({
                        user:
                            member.userId,

                        role:
                            member.role
                    })
                )

        };


        // ==========================
        // CHECK EDIT MODE
        // ==========================

        const editId =
            campaignForm.dataset.editId;


        try {

            const response =
                await fetch(

                    editId
                        ? `/api/campaigns/${editId}`
                        : "/api/campaigns",

                    {

                        method:
                            editId
                                ? "PUT"
                                : "POST",


                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${localStorage.getItem("token")}`

                        },


                        body:
                            JSON.stringify(
                                campaignData
                            )

                    }

                );


            const data =
                await response.json();


            if (!response.ok) {

                campaignMessage.textContent =
                    data.message;

                return;

            }


            campaignMessage.textContent =
                editId
                    ? "Campaign updated successfully!"
                    : "Campaign created successfully!";


            campaignForm.reset();


            delete campaignForm.dataset.editId;


            selectedMembers = [];


            setTimeout(
                () => {

                    campaignModal.classList.remove(
                        "show"
                    );


                    campaignMessage.textContent =
                        "";


                    loadCampaigns();

                },
                700
            );


        } catch (error) {

            console.error(error);


            campaignMessage.textContent =
                "Unable to connect to server.";

        }

    }
);


// ==========================
// DELETE CAMPAIGN
// ==========================

async function deleteCampaign(
    id
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this campaign?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/campaigns/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message
            );

            return;

        }


        alert(
            "Campaign deleted successfully."
        );


        loadCampaigns();


    } catch (error) {

        console.error(error);


        alert(
            "Unable to connect to server."
        );

    }

}


// ==========================
// INITIAL LOAD
// ==========================

loadCampaigns();