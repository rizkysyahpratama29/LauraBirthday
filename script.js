/* =========================
   ELEMENTS
========================= */

const openGiftButton =
    document.getElementById("openGift");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const musicText =
    document.getElementById("musicText");

const songName =
    document.getElementById("songName");

const nextSongButton =
    document.getElementById("nextSongButton");


/* =========================
   PLAYLIST
========================= */

const playlist = [

    {
        title: "Shape of My Heart",
        src: "music/lagu1.mp3"
    },

    {
        title: "Begin Again",
        src: "music/lagu2.mp3"
    }

];


let currentSong = 0;


function loadSong(index) {

    currentSong = index;

    music.src =
        playlist[index].src;

    songName.textContent =
        playlist[index].title;

}

loadSong(currentSong);
const floatingHearts =
    document.getElementById("floatingHearts");



/* =========================
   OPEN GIFT
========================= */

openGiftButton.addEventListener(
    "click",
    function () {

        mainContent.classList.remove(
            "hidden-content"
        );


        music.volume = 0.35;


        music.play()
            .then(function () {

                musicButton.classList.add(
                    "playing"
                );

                musicText.textContent =
                    "playing";

            })
            .catch(function () {

                console.log(
                    "Autoplay diblokir browser."
                );

            });


        createHeartBurst();


        setTimeout(
            function () {

                mainContent.scrollIntoView({
                    behavior: "smooth"
                });

            },
            300
        );

    }
);



/* =========================
   MUSIC BUTTON
========================= */

musicButton.addEventListener(
    "click",
    function () {

        if (music.paused) {

            music.play();

            musicButton.classList.add(
                "playing"
            );

            musicText.textContent =
                "playing";

        } else {

            music.pause();

            musicButton.classList.remove(
                "playing"
            );

            musicText.textContent =
                "music";

        }

    }
);

/* =========================
   NEXT SONG
========================= */

function nextSong() {

    currentSong =
        (
            currentSong + 1
        )
        %
        playlist.length;


    loadSong(currentSong);


    music.play()
        .then(function () {

            musicButton.classList.add(
                "playing"
            );

            musicText.textContent =
                "playing";

        })
        .catch(function () {

            console.log(
                "Music belum bisa dimainkan."
            );

        });

}


nextSongButton.addEventListener(
    "click",
    function () {

        nextSong();

    }
);


/* otomatis pindah lagu */

music.addEventListener(
    "ended",
    function () {

        nextSong();

    }
);

/* =========================
   FLOATING HEARTS
========================= */

function createFloatingHeart() {

    const heart =
        document.createElement("span");

    heart.classList.add(
        "floating-heart"
    );

    const symbols =
        ["♡", "♥", "✦", "♡"];

    heart.textContent =
        symbols[
            Math.floor(
                Math.random()
                *
                symbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100
        + "vw";


    heart.style.fontSize =
        Math.random() * 18
        + 12
        + "px";


    const duration =
        Math.random() * 5
        + 6;


    heart.style.animationDuration =
        duration + "s";


    floatingHearts.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duration * 1000
    );

}


setInterval(
    createFloatingHeart,
    1100
);



/* =========================
   HEART BURST
========================= */

function createHeartBurst() {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(
            createFloatingHeart,
            i * 60
        );

    }

}



/* =========================
   MEMORY SLIDER
========================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );

const dots =
    document.querySelectorAll(
        ".dot"
    );

const prevMemory =
    document.getElementById(
        "prevMemory"
    );

const nextMemory =
    document.getElementById(
        "nextMemory"
    );


let currentSlide = 0;


function showSlide(index) {

    memoryCards.forEach(
        function (
            card,
            cardIndex
        ) {

            card.classList.toggle(
                "active",
                cardIndex === index
            );

        }
    );


    dots.forEach(
        function (
            dot,
            dotIndex
        ) {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        }
    );

}


nextMemory.addEventListener(
    "click",
    function () {

        currentSlide =
            (
                currentSlide + 1
            )
            %
            memoryCards.length;

        showSlide(
            currentSlide
        );

    }
);


prevMemory.addEventListener(
    "click",
    function () {

        currentSlide =
            (
                currentSlide
                -
                1
                +
                memoryCards.length
            )
            %
            memoryCards.length;

        showSlide(
            currentSlide
        );

    }
);


dots.forEach(
    function (dot) {

        dot.addEventListener(
            "click",
            function () {

                currentSlide =
                    Number(
                        this.dataset.slide
                    );

                showSlide(
                    currentSlide
                );

            }
        );

    }
);



/* =========================
   SWIPE MEMORY ON PHONE
========================= */

const memoryStage =
    document.querySelector(
        ".memory-stage"
    );


let touchStartX = 0;


memoryStage.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.touches[0].clientX;

    }
);


memoryStage.addEventListener(
    "touchend",
    function (event) {

        const touchEndX =
            event.changedTouches[0]
            .clientX;


        const distance =
            touchStartX
            -
            touchEndX;


        if (
            Math.abs(distance)
            <
            50
        ) {

            return;

        }


        if (
            distance > 0
        ) {

            currentSlide =
                (
                    currentSlide + 1
                )
                %
                memoryCards.length;

        } else {

            currentSlide =
                (
                    currentSlide
                    -
                    1
                    +
                    memoryCards.length
                )
                %
                memoryCards.length;

        }


        showSlide(
            currentSlide
        );

    }
);



/* =========================
   LOVE CARDS
========================= */

const loveCards =
    document.querySelectorAll(
        ".love-card"
    );


loveCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                this.classList.toggle(
                    "flipped"
                );

            }
        );

    }
);



/* =========================
   MINI QUESTION
========================= */

const choiceButtons =
    document.querySelectorAll(
        ".choice-button"
    );

const choiceResponse =
    document.getElementById(
        "choiceResponse"
    );


choiceButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const choice =
                    this.dataset.response;


                if (
                    choice === "peluk"
                ) {

                    choiceResponse.innerHTML =
                        "pelukk unlimited buat cantiknyaa akuuu 🤍";

                }


                if (
                    choice === "cium"
                ) {

                    choiceResponse.innerHTML =
                        "cium? sini ciummmmmmmmmm 😚";

                }


                if (
                    choice === "semua"
                ) {

                    choiceResponse.innerHTML =
                        "NAHHH ini baru pacarkuuu rawrrr HAHAH 🦖♡";

                    createHeartBurst();

                }

            }
        );

    }
);



/* =========================
   LETTER MODAL
========================= */

const envelopeButton =
    document.getElementById(
        "envelopeButton"
    );

const letterModal =
    document.getElementById(
        "letterModal"
    );

const closeLetter =
    document.getElementById(
        "closeLetter"
    );

const modalOverlay =
    document.querySelector(
        ".modal-overlay"
    );


function openLetter() {

    letterModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeLetterModal() {

    letterModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


envelopeButton.addEventListener(
    "click",
    openLetter
);


closeLetter.addEventListener(
    "click",
    closeLetterModal
);


modalOverlay.addEventListener(
    "click",
    closeLetterModal
);



/* =========================
   FINAL SURPRISE
========================= */

const finalSurprise =
    document.getElementById(
        "finalSurprise"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );


finalSurprise.addEventListener(
    "click",
    function () {

        finalMessage.classList.add(
            "show"
        );


        finalSurprise.style.display =
            "none";


        createFinalHearts();

    }
);



/* =========================
   FINAL HEARTS
========================= */

function createFinalHearts() {

    for (
        let i = 0;
        i < 60;
        i++
    ) {

        setTimeout(
            function () {

                const heart =
                    document.createElement(
                        "span"
                    );


                heart.textContent =
                    Math.random() > 0.5
                        ?
                        "♡"
                        :
                        "♥";


                heart.style.position =
                    "fixed";


                heart.style.left =
                    Math.random()
                    *
                    100
                    +
                    "vw";


                heart.style.bottom =
                    "-40px";


                heart.style.fontSize =
                    Math.random()
                    *
                    24
                    +
                    14
                    +
                    "px";


                heart.style.color =
                    Math.random() > 0.5
                        ?
                        "#ffb6cb"
                        :
                        "#ffffff";


                heart.style.zIndex =
                    "9999";


                heart.style.pointerEvents =
                    "none";


                heart.style.transition =
                    "transform 5s linear, opacity 5s linear";


                document.body.appendChild(
                    heart
                );


                setTimeout(
                    function () {

                        heart.style.transform =
                            `
                            translateY(-120vh)
                            rotate(
                                ${
                                    Math.random()
                                    *
                                    500
                                }deg
                            )
                            `;


                        heart.style.opacity =
                            "0";

                    },
                    50
                );


                setTimeout(
                    function () {

                        heart.remove();

                    },
                    5200
                );

            },
            i * 55
        );

    }

}



/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".timeline-card, .love-card, .intro-card, .question-card"
    );


revealElements.forEach(
    function (element) {

        element.classList.add(
            "reveal"
        );

    }
);


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList.add(
                                "visible"
                            );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    function (element) {

        observer.observe(
            element
        );

    }
);



/* =========================
   ESC TO CLOSE LETTER
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeLetterModal();

        }

    }
);