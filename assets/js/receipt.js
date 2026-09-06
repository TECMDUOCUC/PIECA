//Gemini 3.1 PRO
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('receipt-container');
    const raw = localStorage.getItem('pieca_receipt');
    
    if (!raw) {
        container.innerHTML = '<p>No hay pedidos recientes.</p>';
        return;
    }

    const receipt = JSON.parse(raw);
    container.innerHTML = `
        <h3 style="color: #4CAF50;">Estado: ${receipt.status}</h3>
        <p>Fecha: ${new Date(receipt.date).toLocaleString()}</p>
        <hr style="border-color: #333;">
        <p>El detalle del pedido ha sido guardado. Los productos llegarán pronto a su destino.</p>
        <button class="buyButton" onclick="window.location.href='index.html'" style="margin-top: 15px;">Volver al Inicio</button>
    `;
});