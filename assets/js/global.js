function logout() {
    localStorage.removeItem('pieca_user');
    window.location.reload();
}

function renderFooter() {
    const footers = document.querySelectorAll('footer');
    const user = localStorage.getItem('pieca_user');
    
    const links = user
        ? `<a href="catalog.html" class="prettyLink">Catálogo</a>
           <a href="cart.html" class="prettyLink">Carrito</a>
           <a href="receipt.html" class="prettyLink">Mis Pedidos</a>
           <a href="blog.html" class="prettyLink">Blog</a>
           <a href="admin.html" class="prettyLink">Admin</a>
           <a href="#" onclick="logout()" class="prettyLink">Cerrar Sesión</a>`
        : `<a href="catalog.html" class="prettyLink">Catálogo</a>
           <a href="register.html" class="prettyLink">Registrarse</a>
           <a href="login.html" class="prettyLink">Iniciar Sesión</a>
           <a href="blog.html" class="prettyLink">Blog</a>`;

    const footerContent = `
        <h2><a href="index.html" class="prettyLink">Pieca&reg;</a></h2>
        <p>&copy; 2026 Pieca&reg;. Todos los derechos reservados.</p>
        <nav class="navList">${links}</nav>
    `;

    for (let i = 0; i < footers.length; i++) {
        footers[i].innerHTML = footerContent;
    }
}

document.addEventListener('DOMContentLoaded', renderFooter);