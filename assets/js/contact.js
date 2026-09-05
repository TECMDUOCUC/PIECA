document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            const data = Object.fromEntries(new FormData(e.target));
            alert("Dejenos tranquilos.")
            console.log('Form submission payload:', data);
            form.reset();
            window.location.href = "https://www.google.com/";
        }
    });
});