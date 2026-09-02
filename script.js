const openGiftButton = document.getElementById("openGift");

const giftContent = document.getElementById("giftContent");

const music = document.getElementById("birthdayMusic");

const surpriseButton = document.getElementById("surpriseButton");

const surpriseMessage = document.getElementById("surpriseMessage");


// Saat tombol "buka kadonya" ditekan
openGiftButton.addEventListener("click", function () {

    giftContent.classList.remove("hidden");

    giftContent.style.animation = "fadeUp 1s ease";

    music.volume = 0.35;

    music.play().catch(function () {
        console.log("Music belum bisa diputar.");
    });


    setTimeout(function () {

        giftContent.scrollIntoView({
            behavior: "smooth"
        });

    }, 300);

});


// Tombol surprise
surpriseButton.addEventListener("click", function () {

    surpriseMessage.classList.remove("hidden");

    surpriseButton.style.display = "none";

    createHearts();

});


// Membuat hati beterbangan
function createHearts() {

    for (let i = 0; i < 30; i++) {

        setTimeout(function () {

            const heart = document.createElement("div");

            heart.innerHTML = "❤";

            heart.style.position = "fixed";

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.bottom = "-30px";

            heart.style.fontSize =
                Math.random() * 25 + 15 + "px";

            heart.style.color = "#ff8fab";

            heart.style.zIndex = "9999";

            heart.style.pointerEvents = "none";

            heart.style.transition =
                "transform 4s linear, opacity 4s linear";

            document.body.appendChild(heart);


            setTimeout(function () {

                heart.style.transform =
                    `translateY(-110vh)
                     rotate(${Math.random() * 360}deg)`;

                heart.style.opacity = "0";

            }, 100);


            setTimeout(function () {

                heart.remove();

            }, 4200);


        }, i * 100);

    }

}