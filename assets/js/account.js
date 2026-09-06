function handleAuthSubmit(e) {
    e.preventDefault();
    const formId = e.target.id;

    if (formId === 'register') {
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());
        localStorage.setItem('pieca_user', JSON.stringify(user));
        alert('¡Registro exitoso!');
        window.location.href = 'index.html';
    } else if (formId === 'login') {
        const user = localStorage.getItem('pieca_user');
        if (!user) {
            alert('La cuenta no existe.');
        } else {
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html';
        }
    }
}

function redirectTo(uri, newPage){
    if (uri) {
        if (newPage){
            window.open(uri, "_blank", "noopener,noreferrer");
        } else {
            window.location.href = uri;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', handleAuthSubmit);
    }
});