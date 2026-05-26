(function () {
    "use strict";

    const camera = document.getElementById("camera");
    const layout = document.querySelector(".layout");
    const endOverlay = document.getElementById("end-overlay");
    const resetBtn = document.getElementById("reset-btn");

    // image, positioning, and the respective text
    const inventory = [
        { img: "images/apartment.jpeg", x: 70, y: 40, story: "July 9, 2025. I was standing outside on my aunt's balcony and it felt like the perfect moment to take a photo. My aunt has around 25 cats that she's rescued and I think I want to make a little booklet of them with their picture, name, and backstories the next chance I get." },
        { img: "images/lake.jpg", x: 70, y: 40, story: "July 11, 2025. Hac Sa Beach. On this evening, I spent quite a bit of time meandering around on the coast of Coloane in Macau. I remember this was the day before I attended Irene and Seulgi's concert and it felt so special because I quite literally traveled across the world to see them. Though my trip wasn't purely for that, I was really happy that they coincided with my plans." },
        { img: "images/moped.jpeg", x: 70, y: 40, story: "July 2, 2025. Somewhere in Haizhu, Guangzhou. This was a pretty laidback day. I had a nice, slow morning and petted my aunt's many cats before leaving with her to explore a nearby mall. There, I met up one of my aunt's friends, had amazing sushi, watched a movie out at that time, and had a matcha ice cream from the McDonald's right outside. I also bought a Tsingtao beer on the way back for the novelty of being over China's alcohol purchasing age." },
        { img: "images/street.jpeg", x: 70, y: 40, story: "Juy 7, 2025. I was on my way back to my aunt's apartment after meeting up with my dad's side of the family after a long period of time. We went to yumcha and afterwards I hung out with my cousin. for the first time. Even though she's 38, she was somehow super up-to-date with media culture. Within a few hours, we were able to connect really well and she shared with me her yaoi tablet (where I learned that she was a total fujoshi)." },
    ];

    // camera interaction
    let isAnimating = false;
    let currentIndex = 0;


    camera.addEventListener("click", function () {
        if (isAnimating) return;

        if (currentIndex >= inventory.length) {
            endOverlay.style.display = "flex";
            return;
        }

        isAnimating = true;

        const data = inventory[currentIndex];


        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");
        itemContainer.innerHTML = `<div class="story-overlay">${data.story}</div>
        <img src="${data.img}" class="item-img">`;

        itemContainer.style.left = "70%";
        itemContainer.style.top = "50%";
        itemContainer.style.transform = "translate(-50%, 50%) scale(0)";
        itemContainer.style.opacity = "0";

        layout.appendChild(itemContainer);

        setTimeout(() => {
            itemContainer.style.left = `${data.x}%`;
            itemContainer.style.top = `${data.y}%`;
            itemContainer.style.transform = "translate(-50%, -50%) scale(1)";
            itemContainer.style.opacity = "1";
        }, 20);

        currentIndex++;

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    });

    // close all
    resetBtn.addEventListener("click", function () {
        endOverlay.style.display = "none";

        const items = document.querySelectorAll(".item-container");

        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.left = "50%";
                item.style.top = "50%";
                item.style.transform = "translate(-50%, -50%) scale(0)";
                item.style.opacity = "0";
            }, index * 40);
        });

        // reset counter
        setTimeout(() => {
            items.forEach(el => el.remove());
            currentIndex = 0;
        }, 800 + (items.length * 40));
    });

})();