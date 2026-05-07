(function () {
    "use strict";
    console.log("reading js");


    const images = [
        'images/interior-bg.jpg',
        'images/interior-bg-2.jpg',
        'images/pool-bg.jpg',
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url('${randomImage}')`;

    const madLibForm = document.querySelector('#madlib-form');
    const overlay = document.querySelector('#overlay');
    const fullNote = document.querySelector('#full-note');
    const closeBtn = document.querySelector('#close-btn');

    madLibForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const verb1 = document.querySelector('#verb1').value;
        const adj1 = document.querySelector('#adj1').value;
        const food1 = document.querySelector('#food1').value;
        const food2 = document.querySelector('#food2').value;
        const drink = document.querySelector('#drink').value;
        const item = document.querySelector('#item').value;
        const pluralNoun = document.querySelector('#pluralNoun').value;
        const pluralNoun2 = document.querySelector('#pluralNoun2').value;
        const actionverb = document.querySelector('#actionverb').value;
        const city = document.querySelector('#city').value;
        const adj2 = document.querySelector('#adj2').value;
        const pluralNoun3 = document.querySelector('#pluralNoun3').value;
        const artist = document.querySelector('#artist').value;
        const verb3 = document.querySelector('#verb3').value;


        const fullText = `Day 1 in Hong Kong! I went to this cha chaan teng that everyone’s been <span>${verb1}</span> about online. <br><br>

        It was pretty easy to find and when I went inside, it was so <span>${adj1}</span>. I ordered a <span>${food1}</span>, <span>${food2}</span>, and <span>${drink}</span>. <br><br>

        Since this is their grand opening, they’re also giving out <span>${item}</span> as prizes! While waiting, I decided to review the photos I took on my camera today. I took so many photos of <span>${pluralNoun}</span> and <span>${pluralNoun2}</span>. <br><br>

        I shouldn’t be planning so far ahead but I’m already <span>${actionverb}</span> about traveling to <span>${city}</span> to experience their <span>${adj2}</span> <span>${pluralNoun3}</span>. In the meantime, I’m going to max out my opportunities here by attending <span>${artist}</span>'s concert and go <span>${verb3}</span>. <br><br>`;

        fullNote.innerHTML = fullText;
        overlay.className = 'showing';
    });

    closeBtn.addEventListener('click', function () {
        overlay.className = 'hidden';
    });
})();