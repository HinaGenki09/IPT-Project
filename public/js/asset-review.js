// ==========================
// ASSET REVIEW
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

const assetImage =
    document.getElementById(
        "assetImage"
    );

const filePreview =
    document.getElementById(
        "filePreview"
    );

const assetName =
    document.getElementById(
        "assetName"
    );

const assetDescription =
    document.getElementById(
        "assetDescription"
    );

const assetStatus =
    document.getElementById(
        "assetStatus"
    );

const assetStatusDetails =
    document.getElementById(
        "assetStatusDetails"
    );

const assetVersion =
    document.getElementById(
        "assetVersion"
    );

const uploadedBy =
    document.getElementById(
        "uploadedBy"
    );

const commentsList =
    document.getElementById(
        "commentsList"
    );

const commentInput =
    document.getElementById(
        "commentInput"
    );

const commentButton =
    document.getElementById(
        "commentButton"
    );

const commentMessage =
    document.getElementById(
        "commentMessage"
    );

const revisionList =
    document.getElementById(
        "revisionList"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const revisionSubmitSection =
    document.getElementById(
        "revisionSubmitSection"
    );

const revisionFileUrl =
    document.getElementById(
        "revisionFileUrl"
    );

const revisionNotes =
    document.getElementById(
        "revisionNotes"
    );

const revisionMessage =
    document.getElementById(
        "revisionMessage"
    );

const submitRevisionButton =
    document.getElementById(
        "submitRevisionButton"
    );


// ==========================
// LOCAL STORAGE
// ==========================

const selectedAssetId =
    localStorage.getItem(
        "selectedAsset"
    );

const selectedCampaignId =
    localStorage.getItem(
        "selectedCampaign"
    );

const token =
    localStorage.getItem(
        "token"
    );

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );


// ==========================
// BACK BUTTON
// ==========================

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "/asset-library.html";

        }
    );

}


// ==========================
// LOAD ASSET
// ==========================

async function loadAsset() {

    if (!selectedAssetId) {

        assetName.textContent =
            "Asset not found";

        return;

    }


    try {

        const response =
            await fetch(
                `/api/assets/${selectedAssetId}`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const asset =
            await response.json();


        if (!response.ok) {

            assetName.textContent =
                "Asset not found";

            return;

        }


        displayAsset(
            asset
        );


        await loadComments();

        await loadRevisions();

        await loadCampaign(
            asset.campaign
        );


    } catch (error) {

        console.error(
            "Asset loading error:",
            error
        );

        assetName.textContent =
            "Unable to load asset.";

    }

}


// ==========================
// CHECK REVISION PERMISSION
// ==========================

function canSubmitRevision() {

    if (
        !currentUser ||
        !window.currentCampaign
    ) {

        return false;

    }


    const campaign =
        window.currentCampaign;


    // ==========================
    // CHECK CAMPAIGN MEMBERS
    // ==========================

    if (
        campaign.members &&
        campaign.members.length > 0
    ) {

        const member =
            campaign.members.find(
                member => {

                    if (!member.user) {
                        return false;
                    }

                    const memberId =
                        typeof member.user === "object"
                            ? member.user._id
                            : member.user;

                    return (
                        String(memberId) ===
                        String(
                            currentUser.id ||
                            currentUser._id
                        )
                    );

                }
            );


        if (member) {

            return (
                member.role ===
                "Lead"
            );

        }

    }


    // ==========================
    // OWNER = SOLO CONTENT CREATOR
    // ==========================

    if (
        campaign.owner ===
        currentUser.username
    ) {

        return true;

    }


    return false;

}


// ==========================
// DISPLAY ASSET
// ==========================

function displayAsset(
    asset
) {

    assetName.textContent =
        asset.name ||
        "Untitled Asset";


    assetDescription.textContent =
        asset.description ||
        "No description.";


    // ==========================
    // STATUS
    // ==========================

    assetStatus.textContent =
        asset.status ||
        "Pending Review";


    assetStatus.className =
        "asset-status status-badge " +
        getStatusClass(
            asset.status
        );


    if (assetStatusDetails) {

        assetStatusDetails.textContent =
            asset.status ||
            "Pending Review";

    }


    // ==========================
    // VERSION
    // ==========================

    assetVersion.textContent =
        `v${asset.currentVersion || 1}`;


    // ==========================
    // UPLOADED BY
    // ==========================

    if (
        asset.uploadedBy
    ) {

        uploadedBy.textContent =
            asset.uploadedBy.username ||
            "-";

    } else {

        uploadedBy.textContent =
            "-";

    }


    // ==========================
    // IMAGE PREVIEW
    // ==========================

    const fileType =
        String(
            asset.fileType || ""
        ).toLowerCase();


    const fileUrl =
        asset.fileUrl ||
        "";


    const isImage =
        fileType === "image";


    if (
        isImage &&
        fileUrl
    ) {

        assetImage.src =
            fileUrl;

        assetImage.alt =
            asset.name ||
            "Asset Preview";

        assetImage.style.display =
            "block";

        filePreview.style.display =
            "none";


    } else {

        assetImage.removeAttribute(
            "src"
        );

        assetImage.style.display =
            "none";

        filePreview.innerHTML =
            fileUrl
                ? `<a href="${fileUrl}" target="_blank">Open Asset File</a>`
                : "No preview available.";

        filePreview.style.display =
            "flex";

    }

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


    if (
        status === "Revision Requested" ||
        status === "Changes Requested"
    ) {

        return "status-revision";

    }


    return "status-pending";

}


// ==========================
// LOAD CAMPAIGN
// ==========================

async function loadCampaign(
    campaignId
) {

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
                    campaignId
            );


        if (!campaign) {

            return;

        }


        window.currentCampaign =
            campaign;


        campaignName.textContent =
            campaign.name;


        campaignDescription.textContent =
            campaign.description ||
            "No description.";


        // ==========================
        // REVISION PERMISSION
        // ==========================

        if (
            canSubmitRevision()
        ) {

            revisionSubmitSection.style.display =
                "block";

        } else {

            revisionSubmitSection.style.display =
                "none";

        }


    } catch (error) {

        console.error(
            "Campaign loading error:",
            error
        );

    }

}


// ==========================
// LOAD COMMENTS
// ==========================

async function loadComments() {

    try {

        const response =
            await fetch(
                `/api/assets/${selectedAssetId}/comments`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const comments =
            await response.json();


        if (!response.ok) {

            console.error(
                comments
            );

            return;

        }


        displayComments(
            comments
        );


    } catch (error) {

        console.error(
            "Comment loading error:",
            error
        );

    }

}


// ==========================
// DISPLAY COMMENTS
// ==========================

function displayComments(
    comments
) {

    commentsList.innerHTML =
        "";


    if (
        comments.length ===
        0
    ) {

        commentsList.innerHTML =
            `<p class="empty-comments">
                No comments yet.
            </p>`;

        return;

    }


    comments.forEach(
        comment => {

            const commentElement =
                document.createElement(
                    "div"
                );

            commentElement.className =
                "comment";


            const header =
                document.createElement(
                    "div"
                );

            header.className =
                "comment-header";


            const username =
                document.createElement(
                    "span"
                );

            username.className =
                "comment-user";


            username.textContent =
                comment.user
                    ? comment.user.username
                    : "Unknown User";


            const date =
                document.createElement(
                    "span"
                );

            date.className =
                "comment-date";


            date.textContent =
                comment.createdAt
                    ? new Date(
                        comment.createdAt
                    ).toLocaleString()
                    : "";


            header.appendChild(
                username
            );

            header.appendChild(
                date
            );


            const text =
                document.createElement(
                    "p"
                );

            text.className =
                "comment-text";


            text.textContent =
                comment.comment;


            commentElement.appendChild(
                header
            );

            commentElement.appendChild(
                text
            );


            commentsList.appendChild(
                commentElement
            );

        }
    );

}


// ==========================
// ADD COMMENT
// ==========================

if (commentButton) {

    commentButton.addEventListener(
        "click",
        async () => {

            const comment =
                commentInput.value.trim();


            commentMessage.textContent =
                "";


            if (!comment) {

                commentMessage.textContent =
                    "Please enter a comment.";

                return;

            }


            try {

                const response =
                    await fetch(
                        `/api/assets/${selectedAssetId}/comments`,
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
                                    comment:
                                        comment
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    commentMessage.textContent =
                        data.message ||
                        "Unable to add comment.";

                    return;

                }


                commentInput.value =
                    "";


                await loadComments();

                await loadAsset();


            } catch (error) {

                console.error(
                    error
                );

                commentMessage.textContent =
                    "Unable to connect to server.";

            }

        }
    );

}


// ==========================
// LOAD REVISIONS
// ==========================

async function loadRevisions() {

    try {

        const response =
            await fetch(
                `/api/assets/${selectedAssetId}/versions`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const revisions =
            await response.json();


        if (!response.ok) {

            console.error(
                revisions
            );

            return;

        }


        displayRevisions(
            revisions
        );


    } catch (error) {

        console.error(
            "Revision loading error:",
            error
        );

    }

}


// ==========================
// SUBMIT NEW REVISION
// ==========================

if (submitRevisionButton) {

    submitRevisionButton.addEventListener(
        "click",
        async () => {

            const fileUrl =
                revisionFileUrl.value.trim();


            const notes =
                revisionNotes.value.trim();


            revisionMessage.textContent =
                "";


            if (!fileUrl) {

                revisionMessage.textContent =
                    "Please enter the new file URL.";

                return;

            }


            submitRevisionButton.disabled =
                true;

            submitRevisionButton.textContent =
                "SUBMITTING...";


            try {

                const response =
                    await fetch(
                        `/api/assets/${selectedAssetId}/versions`,
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
                                    fileUrl:
                                        fileUrl,

                                    notes:
                                        notes
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    revisionMessage.textContent =
                        data.message ||
                        "Unable to submit revision.";

                    return;

                }


                // ==========================
                // CLEAR FORM
                // ==========================

                revisionFileUrl.value =
                    "";

                revisionNotes.value =
                    "";


                revisionMessage.textContent =
                    "New revision submitted successfully.";


                // ==========================
                // REFRESH
                // ==========================

                await loadAsset();

                await loadRevisions();


            } catch (error) {

                console.error(
                    "Revision submission error:",
                    error
                );

                revisionMessage.textContent =
                    "Unable to connect to server.";

            } finally {

                submitRevisionButton.disabled =
                    false;

                submitRevisionButton.textContent =
                    "SUBMIT REVISION";

            }

        }
    );

}


// ==========================
// DISPLAY REVISIONS
// ==========================

function displayRevisions(
    revisions
) {

    revisionList.innerHTML =
        "";


    if (
        revisions.length ===
        0
    ) {

        revisionList.innerHTML =
            `<p class="empty-revisions">
                No revision history.
            </p>`;

        return;

    }


    revisions.forEach(
        revision => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "revision";


            const information =
                document.createElement(
                    "div"
                );


            const version =
                document.createElement(
                    "strong"
                );


            version.textContent =
                `Version ${revision.version}`;


            const notes =
                document.createElement(
                    "p"
                );


            notes.textContent =
                revision.notes ||
                "No revision notes.";


            information.appendChild(
                version
            );

            information.appendChild(
                notes
            );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                revision.fileUrl;

            link.target =
                "_blank";

            link.textContent =
                "View";


            item.appendChild(
                information
            );

            item.appendChild(
                link
            );


            revisionList.appendChild(
                item
            );

        }
    );

}


// ==========================
// INITIAL LOAD
// ==========================

loadAsset();