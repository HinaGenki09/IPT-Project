
/* ==========================
   CLASS: CAMPAIGN HELP PANEL
========================== */

class HelpPanel {
    constructor(containerId, guides) {
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error("Campaign help container was not found.");
            return;
        }

        this.button = this.container.querySelector(".help-trigger");
        this.panel = this.container.querySelector(".help-panel");
        this.content = this.container.querySelector("#help-content");
        this.closeButton = this.container.querySelector("#helpCloseButton");


        this.guides = guides;

        if (!this.button || !this.panel || !this.content) {
            console.error("Campaign help elements are missing.");
            return;
        }

        this.renderGuides();
        this.initializeEvents();

    }

    // Display the guide information.
    
renderGuides() {
    this.content.innerHTML = this.guides.map(guide => `
        <section class="help-item">
            <div class="help-item-icon">
                ${this.getGuideIcon(guide.icon)}
            </div>

            <div class="help-item-text">
                <h4>${guide.title}</h4>
                <p>${guide.description}</p>
            </div>
        </section>
    `).join("");
}

getGuideIcon(icon) {
    const icons = {
        tasks: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 6-7"/></svg>',
        assets: '<svg viewBox="0 0 24 24"><path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
        calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M12 13v4m-2-2h2"/></svg>',
        brief: '<svg viewBox="0 0 24 24"><path d="M6 3h9l5 5v13H6z"/><path d="M14 3v6h6M9 13h7M9 17h7"/></svg>',
        references: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/></svg>'
    };

    return icons[icon] || '';
}


    // Show or hide the panel.
    togglePanel(show) {
        this.panel.hidden = !show;
        this.button.setAttribute("aria-expanded", String(show));
    }

    // Add click and keyboard interactions.
    initializeEvents() {
        // Open or close when the question-mark button is clicked.
        this.button.addEventListener("click", event => {
            event.stopPropagation();
            this.togglePanel(this.panel.hidden);
        });

        // Clicking inside the panel should not close it.
        this.panel.addEventListener("click", event => {
            event.stopPropagation();
        });

        // Close when clicking elsewhere on the page.
        document.addEventListener("click", event => {
            if (!this.container.contains(event.target)) {
                this.togglePanel(false);
            }
        });

        // Close when Escape is pressed.
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.togglePanel(false);
            }
        });

        // Close when the close button is clicked.
        if (this.closeButton) {
            this.closeButton.addEventListener("click", event => {
                event.stopPropagation();
                this.togglePanel(false);
            });
        }
    }

}


/* ==========================
   OBJECT: CAMPAIGN GUIDES
========================== */


const campaignGuides = [
    {
        icon: "tasks",
        title: "Tasks and Content",
        description: "Create tasks and update the progress of the campaign."
    },
    {
        icon: "assets",
        title: "Asset Library",
        description: "Upload the campaign's files and resources. Check asset details and review status when available."
    },
    {
        icon: "calendar",
        title: "Calendar",
        description: "Check scheduled campaign activities and upcoming deadlines to stay updated on the campaign timeline."
    },
    {
        icon: "brief",
        title: "Campaign Brief",
        description: "Refer to the campaign objective, target audience, and key message when reviewing campaign content."
    },
    {
        icon: "references",
        title: "References",
        description: "Use the provided references as guidance for the campaign's content, visual direction, and requirements. Refer to them when reviewing submitted assets."
    }
];

const campaignHelp = new HelpPanel("campaign-help", campaignGuides);

