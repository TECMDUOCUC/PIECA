const ALLOWED_DOMAINS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function isValidDomain(email) {
    const lowerEmail = email.trim().toLowerCase();
    return ALLOWED_DOMAINS.some(domain => lowerEmail.endsWith(domain));
}

//GEMINI 3.8 FLASH
function validateRUT(rut) {
    // Clean formatting dots and hyphens
    const cleanRUT = rut.replace(/[\.\-]/g, '').trim().toUpperCase();

    // Minimum valid RUT format: 7 numbers + 1 digit/K (e.g. 1000000-K)
    if (cleanRUT.length < 8) return false;

    const body = cleanRUT.slice(0, -1);
    const dv = cleanRUT.slice(-1);

    // Body must contain digits only
    if (!/^\d+$/.test(body)) return false;

    // Modulo 11 calculation
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = 11 - (sum % 11);
    let expectedDV;

    if (remainder === 11) {
        expectedDV = '0';
    } else if (remainder === 10) {
        expectedDV = 'K';
    } else {
        expectedDV = remainder.toString();
    }

    return dv === expectedDV;
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const formId = e.target.id;
    const formData = new FormData(e.target);
    const email = formData.get("email") || "";

    if (!isValidDomain(email)) {
        alert("Dominio de e-mail no permitido.");
        return;
    }

    if (formId === 'register') {
        const formData = new FormData(e.target);
        const rut = formData.get("RUT") || "";

        if (!validateRUT(rut)) {
            alert("El RUT ingresado no es válido.");
            return;
        }

        const email = formData.get("email") || "";
        if (!isValidDomain(email)) {
            alert("Solo se permiten correos de @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        const user = Object.fromEntries(formData.entries());
        localStorage.setItem('pieca_user', JSON.stringify(user));
        alert('¡Registro exitoso!');
        window.location.href = 'index.html';
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