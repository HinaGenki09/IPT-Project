const token =
    localStorage.getItem("token");

const selectedCampaignId =
    localStorage.getItem(
        "selectedCampaign"
    );


const monthYear =
    document.getElementById(
        "monthYear"
    );

const calendarGrid =
    document.getElementById(
        "calendarGrid"
    );

const selectedDateElement =
    document.getElementById(
        "selectedDate"
    );

const itemCount =
    document.getElementById(
        "itemCount"
    );

const selectedDayItems =
    document.getElementById(
        "selectedDayItems"
    );


/* ==========================
   NOTE ELEMENTS
========================== */

const noteModal =
    document.getElementById(
        "noteModal"
    );

const noteTitle =
    document.getElementById(
        "noteTitle"
    );

const noteDetails =
    document.getElementById(
        "noteDetails"
    );

const noteDate =
    document.getElementById(
        "noteDate"
    );

const noteMessage =
    document.getElementById(
        "noteMessage"
    );


/* ==========================
   CALENDAR STATE
========================== */

let currentDate =
    new Date();

let selectedDate =
    new Date();

let tasks = [];

let notes = [];


/* ==========================
   LOAD NOTES
========================== */

function loadNotes() {

    if (!selectedCampaignId) {

        notes = [];

        return;
    }


    const savedNotes =
        localStorage.getItem(
            `calendarNotes_${selectedCampaignId}`
        );


    if (savedNotes) {

        try {

            notes =
                JSON.parse(
                    savedNotes
                );

        } catch (error) {

            notes = [];

        }

    } else {

        notes = [];

    }
}


/* ==========================
   SAVE NOTES
========================== */

function saveNotes() {

    if (!selectedCampaignId) {
        return;
    }


    localStorage.setItem(
        `calendarNotes_${selectedCampaignId}`,
        JSON.stringify(notes)
    );
}


/* ==========================
   LOAD TASKS
========================== */

async function loadTasks() {

    if (!selectedCampaignId) {

        console.error(
            "No campaign selected."
        );

        return;
    }


    try {

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
                "Unable to load tasks:",
                data
            );

            return;
        }


        tasks = data;


        renderCalendar();

        renderSelectedDay();


    } catch (error) {

        console.error(
            "Calendar task error:",
            error
        );

    }
}


/* ==========================
   DATE HELPERS
========================== */

function getTaskDate(task) {

    if (!task.dueDate) {
        return null;
    }


    const date =
        new Date(
            task.dueDate
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return null;
    }


    return date;
}


function isSameDate(
    date1,
    date2
) {

    return (

        date1.getFullYear() ===
        date2.getFullYear()

        &&

        date1.getMonth() ===
        date2.getMonth()

        &&

        date1.getDate() ===
        date2.getDate()

    );
}


function formatDateForInput(
    date
) {

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


function getNoteDate(
    note
) {

    const date =
        new Date(
            `${note.date}T00:00:00`
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return null;
    }


    return date;
}


/* ==========================
   GET ITEMS FOR DATE
========================== */

function getTasksForDate(
    date
) {

    return tasks.filter(
        task => {

            const taskDate =
                getTaskDate(task);

            return (
                taskDate &&
                isSameDate(
                    taskDate,
                    date
                )
            );

        }
    );
}


function getNotesForDate(
    date
) {

    return notes.filter(
        note => {

            const noteDate =
                getNoteDate(note);

            return (
                noteDate &&
                isSameDate(
                    noteDate,
                    date
                )
            );

        }
    );
}


/* ==========================
   RENDER CALENDAR
========================== */

function renderCalendar() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    monthYear.textContent =
        new Intl.DateTimeFormat(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        ).format(
            currentDate
        );


    calendarGrid.innerHTML =
        "";


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


    /* Empty spaces */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const emptyDay =
            document.createElement(
                "div"
            );

        emptyDay.className =
            "calendar-day empty";

        calendarGrid.appendChild(
            emptyDay
        );
    }


    /* Dates */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const dayElement =
            document.createElement(
                "div"
            );


        dayElement.className =
            "calendar-day";


        /* Today */

        const today =
            new Date();


        if (
            isSameDate(
                date,
                today
            )
        ) {

            dayElement.classList.add(
                "today"
            );
        }


        /* Selected */

        if (
            isSameDate(
                date,
                selectedDate
            )
        ) {

            dayElement.classList.add(
                "selected"
            );
        }


        const number =
            document.createElement(
                "div"
            );


        number.className =
            "day-number";


        number.textContent =
            day;


        const dots =
            document.createElement(
                "div"
            );


        dots.className =
            "event-dots";


        const dayTasks =
            getTasksForDate(
                date
            );


        const dayNotes =
            getNotesForDate(
                date
            );


        /* Task dots */

        dayTasks.forEach(
            task => {

                const dot =
                    document.createElement(
                        "span"
                    );


                dot.className =
                    "event-dot";


                if (
                    task.status ===
                    "Done"
                ) {

                    dot.style.background =
                        "#2f80ed";

                } else {

                    dot.style.background =
                        "#7435e8";

                }


                dots.appendChild(
                    dot
                );

            }
        );


        /* Note dots */

        dayNotes.forEach(
            () => {

                const dot =
                    document.createElement(
                        "span"
                    );


                dot.className =
                    "event-dot";


                dot.style.background =
                    "#16a34a";


                dots.appendChild(
                    dot
                );

            }
        );


        dayElement.appendChild(
            number
        );


        dayElement.appendChild(
            dots
        );


        dayElement.addEventListener(
            "click",
            () => {

                selectedDate =
                    new Date(
                        date
                    );


                renderCalendar();

                renderSelectedDay();

            }
        );


        calendarGrid.appendChild(
            dayElement
        );

    }
}


/* ==========================
   SELECTED DAY
========================== */

function renderSelectedDay() {

    const formattedDate =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        ).format(
            selectedDate
        );


    selectedDateElement.textContent =
        formattedDate;


    const dayTasks =
        getTasksForDate(
            selectedDate
        );


    const dayNotes =
        getNotesForDate(
            selectedDate
        );


    const totalItems =
        dayTasks.length +
        dayNotes.length;


    itemCount.textContent =
        `${totalItems} ${
            totalItems === 1
                ? "item"
                : "items"
        }`;


    selectedDayItems.innerHTML =
        "";


    /* Tasks */

    dayTasks.forEach(
        task => {

            createTaskItem(
                task
            );

        }
    );


    /* Notes */

    dayNotes.forEach(
        note => {

            createNoteItem(
                note
            );

        }
    );


    if (
        totalItems === 0
    ) {

        selectedDayItems.innerHTML = `
            <div class="no-items">
                No tasks scheduled for this day.
            </div>
        `;

    }
}


/* ==========================
   TASK ITEM
========================== */

function createTaskItem(
    task
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "calendar-item";


    const dot =
        document.createElement(
            "div"
        );


    dot.className =
        "item-dot";


    if (
        task.status ===
        "Done"
    ) {

        dot.style.background =
            "#2f80ed";

    } else {

        dot.style.background =
            "#f39c12";

    }


    const information =
        document.createElement(
            "div"
        );


    const name =
        document.createElement(
            "div"
        );


    name.className =
        "item-name";


    name.textContent =
        task.name ||
        "Untitled Task";


    const info =
        document.createElement(
            "div"
        );


    info.className =
        "item-info";


    info.textContent =
        `Content deadline · ${
            task.status ||
            "In Progress"
        }`;


    information.appendChild(
        name
    );


    information.appendChild(
        info
    );


    const openButton =
        document.createElement(
            "button"
        );


    openButton.className =
        "open-item-button";


    openButton.textContent =
        "Open";


    openButton.addEventListener(
        "click",
        () => {

            alert(
                `Task: ${task.name}\n\n` +
                `Status: ${task.status}\n\n` +
                `Due: ${task.dueDate}`
            );

        }
    );


    item.appendChild(
        dot
    );


    item.appendChild(
        information
    );


    item.appendChild(
        openButton
    );


    selectedDayItems.appendChild(
        item
    );
}


/* ==========================
   NOTE ITEM
========================== */

function createNoteItem(
    note
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "calendar-item";


    const dot =
        document.createElement(
            "div"
        );


    dot.className =
        "item-dot";


    dot.style.background =
        "#16a34a";


    const information =
        document.createElement(
            "div"
        );


    const name =
        document.createElement(
            "div"
        );


    name.className =
        "item-name";


    name.textContent =
        note.title;


    const info =
        document.createElement(
            "div"
        );


    info.className =
        "item-info";


    info.textContent =
        note.details ||
        "Calendar note";


    information.appendChild(
        name
    );


    information.appendChild(
        info
    );


    const openButton =
        document.createElement(
            "button"
        );


    openButton.className =
        "open-item-button";


    openButton.textContent =
        "Open";


    openButton.addEventListener(
        "click",
        () => {

            alert(
                `${note.title}\n\n${note.details || "No additional details."}`
            );

        }
    );


    item.appendChild(
        dot
    );


    item.appendChild(
        information
    );


    item.appendChild(
        openButton
    );


    selectedDayItems.appendChild(
        item
    );
}


/* ==========================
   NOTE MODAL
========================== */

function openNoteModal(
    date = selectedDate
) {

    noteTitle.value =
        "";

    noteDetails.value =
        "";

    noteMessage.textContent =
        "";


    noteDate.value =
        formatDateForInput(
            date
        );


    noteModal.classList.add(
        "show"
    );


    noteTitle.focus();
}


function closeNoteModalFunction() {

    noteModal.classList.remove(
        "show"
    );

}


/* ==========================
   SAVE NOTE
========================== */

async function saveNote() {

    const title =
        document.getElementById(
            "noteTitle"
        ).value.trim();

    const details =
        document.getElementById(
            "noteDetails"
        ).value.trim();

    const date =
        document.getElementById(
            "noteDate"
        ).value;


    if (!title) {
        alert("Please enter a note title.");
        return;
    }


    if (!date) {
        alert("Please select a date.");
        return;
    }


    try {

        const response =
            await fetch(
                `/api/calendar/campaign/${selectedCampaignId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title,
                        details,
                        date
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to save note."
            );

            return;
        }


        // Add the returned note
        // to the current calendar.
        notes.push(
            data.note
        );


        renderCalendar();

        renderSelectedDay();


        // Close your existing modal
        const modal =
            document.getElementById(
                "noteModal"
            );

        if (modal) {
            modal.style.display = "none";
        }


        // Clear inputs
        document.getElementById(
            "noteTitle"
        ).value = "";

        document.getElementById(
            "noteDetails"
        ).value = "";

        document.getElementById(
            "noteDate"
        ).value = "";


    } catch (error) {

        console.error(
            "SAVE NOTE ERROR:",
            error
        );

        alert(
            "Unable to save calendar note."
        );
    }
}

/* ==========================
   NOTE BUTTONS
========================== */

document
    .getElementById(
        "addNoteButton"
    )
    .addEventListener(
        "click",
        () => {

            openNoteModal(
                selectedDate
            );

        }
    );


document
    .getElementById(
        "addDayNoteButton"
    )
    .addEventListener(
        "click",
        () => {

            openNoteModal(
                selectedDate
            );

        }
    );


document
    .getElementById(
        "closeNoteModal"
    )
    .addEventListener(
        "click",
        closeNoteModalFunction
    );


document
    .getElementById(
        "cancelNoteButton"
    )
    .addEventListener(
        "click",
        closeNoteModalFunction
    );


document
    .getElementById(
        "saveNoteButton"
    )
    .addEventListener(
        "click",
        saveNote
    );


noteModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            noteModal
        ) {

            closeNoteModalFunction();

        }

    }
);


/* ==========================
   MONTH NAVIGATION
========================== */

document
    .getElementById(
        "previousMonth"
    )
    .addEventListener(
        "click",
        () => {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


document
    .getElementById(
        "nextMonth"
    )
    .addEventListener(
        "click",
        () => {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


/* ==========================
   TODAY
========================== */

document
    .getElementById(
        "todayButton"
    )
    .addEventListener(
        "click",
        () => {

            const today =
                new Date();


            currentDate =
                new Date(
                    today
                );


            selectedDate =
                new Date(
                    today
                );


            renderCalendar();

            renderSelectedDay();

        }
    );


/* ==========================
   SIDEBAR
========================== */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );


/* ==========================
   SIDEBAR MENU
========================== */

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


sidebarMenuButton.addEventListener(
    "click",
    () => {

        sidebarAccountMenu.classList.toggle(
            "show"
        );

    }
);


/* Profile */

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


/* Log Out */

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


/* ==========================
   NOTIFICATIONS
========================== */

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
   NAVIGATION
========================== */


/* Dashboard */

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


/* Calendar */

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

/* Asset Library */

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


/* Campaign Brief */

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


/* References */

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

/* ==========================
   START
========================== */

loadNotes();

loadTasks();

renderCalendar();

renderSelectedDay();