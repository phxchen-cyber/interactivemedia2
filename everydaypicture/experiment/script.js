(function () {
    "use strict";

    console.log('reading JS');

    const images = ['everyday-1.jpg', 'apartment.jpeg', 'moped.jpeg', 'street.jpeg'];

    let currentImage = 0;

    const slide = document.querySelector('#myimage');

    document.querySelector('#next').addEventListener('click', nextPhoto);
    document.querySelector('#previous').addEventListener('click', previousPhoto);

    function nextPhoto() {
        currentImage++;
        if (currentImage > images.length - 1) {
            currentImage = 0;
        }
        slide.src = `images/${images[currentImage]}`;
    }

    function previousPhoto() {
        currentImage--;

        if (currentImage < 0) {
            currentImage = images.length - 1;
        }
        slide.src = `images/${images[currentImage]}`;
    }

})();