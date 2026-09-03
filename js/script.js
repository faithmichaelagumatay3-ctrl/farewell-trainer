/* =====================================
   LOGIN SETTINGS
===================================== */

// CHANGE THESE

const correctName = "Vector";
const correctPassword = "wave13";


/* =====================================
   ELEMENTS
===================================== */

const loginScreen =
    document.getElementById("loginScreen");

const accessScreen =
    document.getElementById("accessScreen");

const mainSite =
    document.getElementById("mainSite");

const loginForm =
    document.getElementById("loginForm");

const username =
    document.getElementById("username");

const password =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");


/* =====================================
   LOGIN
===================================== */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const enteredName =
        username.value.trim();

    const enteredPassword =
        password.value;


    /*
    Name is NOT case sensitive.

    Example:

    Trainer
    trainer
    TRAINER

    all work.
    */

    const nameCorrect =
        enteredName.toLowerCase() ===
        correctName.toLowerCase();


    /*
    Password IS case sensitive.
    */

    const passwordCorrect =
        enteredPassword ===
        correctPassword;


    if (nameCorrect && passwordCorrect) {

        loginError.textContent = "";

        openMission();

    } else {

        loginError.textContent =
            "ACCESS DENIED — FILE REMAINS SEALED.";

        username.classList.add("shake");

        setTimeout(() => {

            username.classList.remove("shake");

        }, 400);

    }

});


/* =====================================
   OPEN MISSION
===================================== */

function openMission() {

    // Prevent scrolling during access animation
    document.body.classList.add("no-scroll");


    // Hide login
    loginScreen.classList.add("hidden");


    // Show ACCESS GRANTED
    accessScreen.classList.add("active");


    // =========================
    // START MUSIC
    // =========================

    const backgroundMusic =
        document.getElementById("bgMusic");

    if (backgroundMusic) {

        backgroundMusic.volume = 0.35;

        backgroundMusic.play().catch(function(error) {

            console.log("Music error:", error);

        });

    }


    // =========================
    // OH YEAHHH VIDEO
    // =========================

    const ohYeahVideo =
        document.getElementById("ohYeahVideo");

    if (ohYeahVideo) {

        ohYeahVideo.currentTime = 0;

        ohYeahVideo.play().catch(function(error) {

            console.log("Video error:", error);

        });

    }


    // =========================
    // AFTER ACCESS SEQUENCE
    // =========================

    setTimeout(function() {

        /*
        Stop OH YEAHH video
        */

        if (ohYeahVideo) {
            ohYeahVideo.pause();
        }


        /*
        Fade out access screen
        */

        accessScreen.classList.remove("active");


        /*
        Wait for fade-out to finish
        */

        setTimeout(function() {

            /*
            COMPLETELY REMOVE
            ACCESS SCREEN
            */

            accessScreen.classList.add("finished");


            /*
            Show main website
            */

            mainSite.classList.add("visible");


            /*
            Enable scrolling
            */

            document.body.classList.remove("no-scroll");


            /*
            VERY IMPORTANT:
            Put website at the absolute top.
            */

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

        }, 800);

    }, 4000);

}


/* =====================================
   LETTER MODAL
===================================== */

const letterCards =
    document.querySelectorAll(".letter-card");

const letterModal =
    document.getElementById("letterModal");

const modalName =
    document.getElementById("modalName");

const modalMessage =
    document.getElementById("modalMessage");

const modalPictureContainer =
    document.getElementById("modalPictureContainer");

const modalPicture =
    document.getElementById("modalPicture");

const modalVideos =
    document.getElementById("modalVideos");

const closeModal =
    document.getElementById("closeModal");


letterCards.forEach(function(card) {

    card.addEventListener("click", function(event) {

        /*
        Prevent the button click from
        triggering anything twice.
        */

        const name =
            card.dataset.name;

        const message =
            card.dataset.message;

        const picture =
            card.dataset.picture;

        const video1 =
            card.dataset.video1;

        const video2 =
            card.dataset.video2;

        const video3 =
            card.dataset.video3;


        /* =========================
           NAME
        ========================== */

        modalName.textContent =
            name.toUpperCase();


        /* =========================
           MESSAGE
        ========================== */

        modalMessage.textContent =
            message;


        /* =========================
           PICTURE
        ========================== */

        modalPictureContainer.style.display = "none";

        modalPicture.src = "";

        if (picture) {

            modalPicture.src = picture;

            modalPictureContainer.style.display =
                "block";

        }


        /* =========================
           VIDEOS
        ========================== */

        // Remove previous videos

        modalVideos.innerHTML = "";


        const videos = [
            video1,
            video2,
            video3
        ];


        videos.forEach(function(videoSource) {

            if (!videoSource) {
                return;
            }


            const video =
                document.createElement("video");


            video.controls = true;

            video.playsInline = true;

            video.preload = "metadata";

            video.src = videoSource;


            modalVideos.appendChild(video);

        });


        /* =========================
           OPEN MODAL
        ========================== */

        letterModal.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});

/* =====================================
   CLOSE MODAL
===================================== */

closeModal.addEventListener(
    "click",
    closeLetter
);


letterModal.addEventListener(
    "click",
    function(event) {

        if (event.target === letterModal) {

            closeLetter();

        }

    }
);


function closeLetter() {

    letterModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

    // Stop and remove all videos
    const videos = modalVideos.querySelectorAll("video");

    videos.forEach(function(video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
    });

    modalVideos.innerHTML = "";

    // Remove picture
    modalPicture.src = "";

    modalPictureContainer.style.display = "none";
}


/* =====================================
   ESCAPE KEY
===================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeLetter();

    }

});


/* =====================================
   REPLAY
===================================== */

const replayButton =
    document.getElementById("replayButton");

replayButton.addEventListener("click", function() {

    location.reload();

});


/* =====================================
   SIMPLE SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(
        ".trainer-grid, .letters-grid, .video-grid, .idle-section"
    );


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(function(element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});