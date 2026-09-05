const params = new URLSearchParams(window.location.search);
const id = params.get("id"); //1-19

let allItems = [];

async function fetchData() {
  try {
      const response = await fetch("./assets/data.json");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      allItems = data;
      return data;
    } catch (error) {
      console.error("Failed to load data:", error);
      return [];
  }
}

function getItemById(id) {
  return allItems.find(item => item.id === Number(id));
}

function displayItem(item) {
  if (!item) {
    document.getElementById("rock-name").textContent = "Not found";
    document.getElementById("product-image").src = item.imgdir;
    document.getElementById("price").textContent = "N/A";
    document.getElementById("shipping-fee").textContent = "N/A";
    document.getElementById("height").textContent = "N/A";
    document.getElementById("width").textContent = "N/A";
    document.getElementById("length").textContent = "N/A";
    document.getElementById("volume").textContent = "N/A";
    return;
  }
  document.getElementById("rock-name").textContent = item.name;
    document.getElementById("product-image").src = item.imgdir;
    document.getElementById("price").textContent = item.price;
    document.getElementById("shipping-fee").textContent = item['shipping-fee'];
    document.getElementById("height").textContent = item.height;
    document.getElementById("width").textContent = item.width;
    document.getElementById("length").textContent = item.length;
    document.getElementById("volume").textContent = item.volume;

    const img = document.getElementById("product-image");
    img.src = item.image || item.imgdir || "assets/images/placeholder.png";
    item.style.display = "block";
    img.alt = item.name 
}

(async function init() {
  await fetchData();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    const item = getItemById(id);
    displayItem(item);
  } else {
    displayItem(null);
  }
})();