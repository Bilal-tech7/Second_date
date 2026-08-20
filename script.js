const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const questionSection =
    document.getElementById("questionSection");

const dateSection =
    document.getElementById("dateSection");

const confirmationSection =
    document.getElementById("confirmationSection");

const noMessage =
    document.getElementById("noMessage");

const dateForm =
    document.getElementById("dateForm");

const selectedDate =
    document.getElementById("selectedDate");

const selectedTime =
    document.getElementById("selectedTime");

const selectedActivities =
    document.getElementById("selectedActivities");

const messageDisplay =
    document.getElementById("messageDisplay");



/* ==========================================
   YES BUTTON
========================================== */

yesButton.addEventListener(
    "click",
    function () {

        questionSection
            .classList
            .add("hidden");

        dateSection
            .classList
            .remove("hidden");

    }
);



/* ==========================================
   RUNAWAY NO BUTTON
========================================== */

let moveCount = 0;

let lastMoveTime = 0;


/*
    Move the NO button away from the cursor.
*/

function moveNoButton(mouseX, mouseY) {


    const now =
        Date.now();


    /*
        Prevent the button from
        moving hundreds of times
        per second.
    */

    if (
        now - lastMoveTime < 220
    ) {

        return;

    }


    lastMoveTime =
        now;


    moveCount++;


    const buttonRect =
        noButton.getBoundingClientRect();


    /*
        Current centre of button.
    */

    const buttonX =
        buttonRect.left +
        buttonRect.width / 2;


    const buttonY =
        buttonRect.top +
        buttonRect.height / 2;


    /*
        Work out the direction
        from the mouse towards
        the button.
    */

    let directionX =
        buttonX - mouseX;


    let directionY =
        buttonY - mouseY;


    const distance =
        Math.sqrt(
            directionX * directionX +
            directionY * directionY
        );


    /*
        If the mouse is directly
        on top of the button,
        choose a random direction.
    */

    if (distance < 1) {

        directionX =
            Math.random() - 0.5;

        directionY =
            Math.random() - 0.5;

    }


    /*
        Normalise the direction.
    */

    const length =
        Math.sqrt(
            directionX * directionX +
            directionY * directionY
        );


    directionX /=
        length;

    directionY /=
        length;


    /*
        The more she chases it,
        the further it jumps.
    */

    const escapeDistance =
        Math.min(
            300 + moveCount * 12,
            550
        );


    /*
        Add a little randomness
        so it doesn't follow
        a predictable pattern.
    */

    const randomAngle =
        (Math.random() - 0.5) *
        1.2;


    const cos =
        Math.cos(randomAngle);

    const sin =
        Math.sin(randomAngle);


    const newDirectionX =
        directionX * cos -
        directionY * sin;


    const newDirectionY =
        directionX * sin +
        directionY * cos;


    let newX =
        buttonX +
        newDirectionX *
        escapeDistance -
        buttonRect.width / 2;


    let newY =
        buttonY +
        newDirectionY *
        escapeDistance -
        buttonRect.height / 2;


    /*
        Keep the button inside
        the browser window.
    */

    const margin =
        15;


    newX =
        Math.max(
            margin,
            Math.min(
                newX,
                window.innerWidth -
                buttonRect.width -
                margin
            )
        );


    newY =
        Math.max(
            margin,
            Math.min(
                newY,
                window.innerHeight -
                buttonRect.height -
                margin
            )
        );


    /*
        Make it fixed so it can
        move anywhere on screen.
    */

    noButton.style.position =
        "fixed";


    noButton.style.left =
        newX + "px";


    noButton.style.top =
        newY + "px";


    /*
        Change the message.
    */

    const messages = [

        "Nope! 😂",

        "Too slow! 🏃",

        "You almost got me! 😭",

        "Nice try! 😂",

        "Keep chasing... 👀",

        "I'm not making this easy! 😌",

        "You really thought I'd stay there? 😂",

        "Still NO! 😭",

        "Catch me if you can! 🏃‍♂️",

        "The plushies said YES! 🧸💚",

        "Why are you still trying? 😂",

        "You're getting closer... 👀"

    ];


    const randomIndex =
        Math.floor(
            Math.random() *
            messages.length
        );


    noMessage.textContent =
        messages[randomIndex];

}



/* ==========================================
   DESKTOP MOUSE CHASING
========================================== */

document.addEventListener(
    "mousemove",
    function (event) {


        /*
            Don't do anything if the
            question isn't visible.
        */

        if (
            questionSection
                .classList
                .contains("hidden")
        ) {

            return;

        }


        const rect =
            noButton.getBoundingClientRect();


        const buttonCenterX =
            rect.left +
            rect.width / 2;


        const buttonCenterY =
            rect.top +
            rect.height / 2;


        const distanceX =
            event.clientX -
            buttonCenterX;


        const distanceY =
            event.clientY -
            buttonCenterY;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        /*
            If cursor gets close,
            RUN!
        */

        const dangerZone =
            110;


        if (
            distance < dangerZone
        ) {

            moveNoButton(
                event.clientX,
                event.clientY
            );

        }

    }
);



/* ==========================================
   MOBILE TOUCH
========================================== */

noButton.addEventListener(
    "touchstart",
    function (event) {


        event.preventDefault();


        const touch =
            event.touches[0];


        moveNoButton(
            touch.clientX,
            touch.clientY
        );


    },
    {
        passive: false
    }
);



/* ==========================================
   DATE FORM
========================================== */

dateForm.addEventListener(
    "submit",
    function (event) {


        event.preventDefault();


        const date =
            document
                .getElementById("date")
                .value;


        const time =
            document
                .getElementById("time")
                .value;


        const message =
            document
                .getElementById("message")
                .value;


        /*
            Get selected activities.
        */

        const activities =
            Array.from(
                document.querySelectorAll(
                    'input[name="activity"]:checked'
                )
            )
            .map(
                checkbox =>
                    checkbox.value
            );


        if (
            !date ||
            !time
        ) {

            alert(
                "Please choose a date and time 💚"
            );

            return;

        }


        /*
            Format date.
        */

        const dateObject =
            new Date(
                date + "T00:00:00"
            );


        const formattedDate =
            dateObject.toLocaleDateString(
                "en-AU",
                {
                    weekday:
                        "long",

                    day:
                        "numeric",

                    month:
                        "long",

                    year:
                        "numeric"
                }
            );


        /*
            Format time.
        */

        const timeObject =
            new Date(
                "2000-01-01T" +
                time
            );


        const formattedTime =
            timeObject.toLocaleTimeString(
                "en-AU",
                {
                    hour:
                        "numeric",

                    minute:
                        "2-digit"
                }
            );


        /*
            Display date.
        */

        selectedDate.textContent =
            formattedDate;


        selectedTime.textContent =
            formattedTime;


        /*
            Display activities.
        */

        if (
            activities.length > 0
        ) {

            selectedActivities.textContent =
                activities.join(", ");

        } else {

            selectedActivities.textContent =
                "Your choice! 💚";

        }


        /*
            Display message.
        */

        if (
            message.trim() !== ""
        ) {

            messageDisplay.innerHTML =
                "💌 <strong>Message:</strong> " +
                escapeHTML(message);

        } else {

            messageDisplay.textContent =
                "💌 No message... but she said YES! 💚";

        }


        /*
            Show confirmation.
        */

        dateSection
            .classList
            .add("hidden");


        confirmationSection
            .classList
            .remove("hidden");


        /*
            Save locally for now.
        */

        localStorage.setItem(
            "secondDate",
            JSON.stringify({

                date:
                    formattedDate,

                time:
                    formattedTime,

                activities:
                    activities,

                message:
                    message

            })
        );

    }
);



/* ==========================================
   SECURITY HELPER
========================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}