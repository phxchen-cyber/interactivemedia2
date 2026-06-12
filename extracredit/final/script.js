(function () {
    "use strict";

    const photoStack = document.querySelector(".photo-stack");
    const endOverlay = document.querySelector(".end-overlay");
    const resetBtn = document.querySelector("#reset-btn");
    const clickHint = document.querySelector("#click-hint");
    const frameCounter = document.querySelector("#frame-counter");

    // shutter audio
    const shutterAudio = new Audio("audio/shutter.mp3");
    shutterAudio.preload = "auto";

    // flash overlay
    const flashEl = document.createElement("div");
    flashEl.classList.add("flash-overlay");
    photoStack.appendChild(flashEl);

    function triggerShutter() {
        shutterAudio.cloneNode().play().catch(() => { });

        flashEl.style.transition = "none";
        flashEl.style.opacity = "0.85";
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                flashEl.style.transition = "opacity 0.25s ease-out";
                flashEl.style.opacity = "0";
            });
        });
    }

    const inventory = [
        {
            img: "images/moped.jpeg",
            story: "July 2, 2025. Somewhere in Haizhu, Guangzhou. This was a pretty laidback day. I had a nice, slow morning and petted my aunt's many cats before leaving with her to explore a nearby mall. There, I met up one of my aunt's friends, had amazing sushi, watched a movie out at that time, and had a matcha ice cream from the McDonald's right outside. I also bought a Tsingtao beer on the way back for the novelty of being over China's alcohol purchasing age."
        },
        {
            img: "images/street.jpeg",
            story: "Juy 7, 2025. I was on my way back to my aunt's apartment after meeting up with my dad's side of the family after a long period of time. We went to yumcha and afterwards I hung out with my cousin for the first time. Even though she's 38, she was somehow super up-to-date with media culture. Within a few hours, we were able to connect really well and she shared with me her yaoi tablet (where I learned that she was a total fujoshi)."
        },
        {
            img: "images/apartment.jpeg",
            story: "July 9, 2025. I was standing outside on my aunt's balcony and it felt like the perfect moment to take a photo. My aunt has around 25 cats that she's rescued and I think I want to make a little booklet of them with their picture, name, and backstories the next chance I get."
        },
        {
            img: "images/lake.jpg",
            story: "July 11, 2025. Hac Sa Beach. On this evening, I spent quite a bit of time meandering around on the coast of Coloane in Macau. I remember this was the day before I attended Irene and Seulgi's concert and it felt so special because I quite literally traveled across the world to see them. Though my trip wasn't purely for that, I was really happy that they coincided with my plans."
        },
    ];

    let isAnimating = false;
    let currentIndex = 0;

    function updateCounter() {
        frameCounter.textContent = `${currentIndex} / ${inventory.length}`;
    }

    photoStack.addEventListener("click", function () {
        if (isAnimating) return;

        if (currentIndex >= inventory.length) {
            endOverlay.style.display = "flex";
            frameCounter.style.visibility = "hidden";
            return;
        }

        triggerShutter();
        isAnimating = true;

        if (currentIndex === 0) {
            clickHint.classList.add("hidden");
        }

        const data = inventory[currentIndex];

        const prevVisible = photoStack.querySelectorAll(".item-container.visible");
        prevVisible.forEach(el => {
            el.style.zIndex = "0";
        });

        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");
        itemContainer.style.zIndex = "1";
        itemContainer.innerHTML = `
            <img src="${data.img}" class="item-img" alt="memory">
            <div class="story-overlay">${data.story}</div>
        `;

        photoStack.appendChild(itemContainer);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                itemContainer.classList.add("visible");
            });
        });

        currentIndex++;
        updateCounter();

        setTimeout(() => {
            isAnimating = false;
        }, 550);
    });

    resetBtn.addEventListener("click", function () {
        endOverlay.style.display = "none";

        const items = photoStack.querySelectorAll(".item-container");
        items.forEach((item, i) => {
            setTimeout(() => {
                item.classList.remove("visible");
            }, i * 40);
        });

        setTimeout(() => {
            items.forEach(el => el.remove());
            currentIndex = 0;
            updateCounter();
            frameCounter.style.visibility = "visible";
            clickHint.classList.remove("hidden");
        }, 700 + items.length * 40);
    });

    updateCounter();
})();