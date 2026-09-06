const phrases = [
    "El que esté libre de pecado, que tire la primera...",
    "Una mirada a Medusa, te convertirá en...",
    "Metiendo David su mano en la bolsa, tomó de allí una...",
    "Eternamente empujando la ladera, Sísifo volvió a caer con la...",
    "Quien logre sacarla del pedestal, reclamará la espada en la...",
    "Y Dios le ordenó a Moisés que subiera la montaña y tomara los mandamientos escritos en...",
    "Tranquilo, que nunca se tropieza dos veces con la misma..."
];

let activeIndex = 1;

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel .card');
    const total = cards.length;

    if (total === 0 || !track || !carousel) return;

    const cardWidth = 280;
    const gap = 30;
    const moveDistance = cardWidth + gap;

    const containerCenter = carousel.offsetWidth / 2;
    const cardCenter = cardWidth / 2;
    const initialCenterOffset = containerCenter - cardCenter;

    const offset = initialCenterOffset - (activeIndex * moveDistance);
    track.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, index) => {
        card.classList.remove('active', 'side', 'far');

        if (index === activeIndex) {
            card.classList.add('active');
        } else if (index === activeIndex - 1 || index === activeIndex + 1) {
            card.classList.add('side');
        } else {
            card.classList.add('far');
        }
    });
}

function setActiveCard(cardElement) {
    const cards = Array.from(document.querySelectorAll('.carousel .card'));
    const index = cards.indexOf(cardElement);
    if (index !== -1) {
        activeIndex = index;
        updateCarousel();
    }
}

function redirectTo(uri, newPage) {
    if (uri) {
        if (newPage) {
            window.open(uri, "_blank", "noopener,noreferrer");
        } else {
            window.location.href = uri;
        }
    }
}

function visitProduct(rockId) {
    const url = `product.html?id=${encodeURIComponent(rockId)}`;
    window.location.href = url;
}

function renderText(items) {
    const text = document.getElementById("quote");
    const image = document.getElementById("stoned");

    if (text) {
        text.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    }

    if (image && items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        image.src = randomItem.imgdir;
    }
}

function renderCarousel(items, track) {
    track.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => setActiveCard(card));

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = item.name;

        const img = document.createElement('img');
        img.src = item.imgdir;
        img.className = 'card-img';
        img.alt = item.name;

        const btn = document.createElement('button');
        btn.className = 'visit-btn';
        btn.textContent = 'Visitar';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            visitProduct(index);
        });

        cardContent.append(title, img, btn);
        card.appendChild(cardContent);
        fragment.appendChild(card);
    });

    track.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', async () => {
    const track = document.querySelector('.carousel-track');

    try {
        const response = await fetch('./assets/data.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const items = await response.json();

        renderCarousel(items, track);
        renderText(items);
        updateCarousel();
    } catch (error) {
        console.error('Failed to load carousel data:', error);
    }

    window.addEventListener('resize', updateCarousel);
});

window.addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    if (!audio) return;

    audio.volume = 1.0;
    audio.play()
        .then(() => {
            console.log("Success! Audio is looping in the background.");
        })
        .catch(error => {
            console.error("Browser explicitly blocked playback:", error);
        });
}, { once: true });