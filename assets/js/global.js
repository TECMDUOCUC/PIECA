function logout() {
    localStorage.removeItem('pieca_user');
    window.location.reload();
}
//Gemini 3.8 Flash
function renderNavigation() {
    const user = localStorage.getItem('pieca_user');

    const topNavLinks = user
        ? `<a href="catalog.html" class="prettyLink">Catálogo</a>
           <a href="cart.html" class="prettyLink">Carrito</a>
           <a href="receipt.html" class="prettyLink">Mis Pedidos</a>
           <a href="#" onclick="logout()" class="prettyLink">Cerrar Sesión</a>`
        : `<a href="catalog.html" class="prettyLink">Catálogo</a>
           <a href="login.html" class="prettyLink">Iniciar Sesión</a>
           <a href="register.html" class="prettyLink">Registrarse</a>`;

    const headers = document.querySelectorAll('header');
    headers.forEach(header => {
        if (header.id === 'ignore') return;
        let nav = header.querySelector('nav');
        
        if (!nav) {
            nav = document.createElement('nav');
            header.appendChild(nav);
        }
        nav.className = 'navList';
        nav.innerHTML = topNavLinks;
    });

    const footerNavLinks = user
        ? `<a href="blog.html" class="prettyLink">Blog</a>
           <a href="contact.html" class="prettyLink">Contáctanos</a>`
        : `<a href="blog.html" class="prettyLink">Blog</a>
           <a href="contact.html" class="prettyLink">Contáctanos</a>`;

    const footers = document.querySelectorAll('footer');
    const footerContent = `
        <h2><a href="index.html" class="prettyLink">Pieca&reg;</a></h2>
        <p>&copy; 2026 Pieca&reg;. Todos los derechos reservados.</p>
        <nav class="navList">${footerNavLinks}</nav>
    `;

    footers.forEach(footer => {
        footer.innerHTML = footerContent;
    });
}

document.addEventListener('DOMContentLoaded', renderNavigation);