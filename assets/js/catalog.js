function visitProduct(rockId) {
    const url = `product.html?id=${encodeURIComponent(rockId)}`;
    window.location.href = url;
}

function setActiveCard(cardElement) {
    document.querySelectorAll('.catalogContainer .card').forEach(card => {
        card.classList.remove('active');
    });
    cardElement.classList.add('active');
}

//FROM HERE AND BELOW, GEMINI 3.8 FLASH
function renderCatalog(items, container) {
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card active';
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
        btn.style.opacity = '1';
        btn.textContent = 'Visitar';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            visitProduct(index);
        });

        cardContent.append(title, img, btn);
        card.appendChild(cardContent);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.catalogContainer');
    const searchInput = document.querySelector('.betterSearch');
    const form = document.querySelector('#search form');

    if (form) {
        form.addEventListener('submit', (e) => e.preventDefault());
    }

    try {
        const response = await fetch('./assets/data.json');
        if (!response.ok) throw new Error(`Couldn't get JSON!: ${response.status}`);
        const items = await response.json();

        renderCatalog(items, container);

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.trim().toLowerCase();
                const cards = container.querySelectorAll('.card');

                cards.forEach((card) => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    card.style.display = title.includes(query) ? '' : 'none';
                });
            });
        }
    } catch (error) {
        console.error('Failed to load catalog data:', error);
        container.innerHTML = '<p>Error al cargar el catálogo de productos.</p>';
    }
});