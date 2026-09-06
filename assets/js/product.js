const changable = {
    "name" : {
      "change" : "textContent",
      "item" : document.getElementById("rock-name")
    },
    "imgdir" : {
      "change" : "src",
      "item" : document.getElementById("product-image")
    },
    "price" : {
      "change" : "textContent",
      "item" : document.getElementById("price")
    },
    "shipping-fee" : {
      "change" : "textContent",
      "item" : document.getElementById("shipping-fee")
    },
    "weight" : {
      "change" : "textContent",
      "item" : document.getElementById("weight")
    },
    "height" : {
      "change" : "textContent",
      "item" : document.getElementById("height")
    },
    "width" : {
      "change" : "textContent",
      "item" : document.getElementById("width")
    },
    "length" : {
      "change" : "textContent",
      "item" : document.getElementById("length")
    },
    "volume" : {
      "change" : "textContent",
      "item" : document.getElementById("volume")
    },
    "color" : {
      "change" : "textContent",
      "item" : document.getElementById("color")
    }
}
const CART_KEY = "pieca_cart";
const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP"
});

const emptyData = {
        "name":"Not Found",
        "price": "N/A",
        "shipping-fee": "N/A",
        "weight": "N/A",
        "height": "N/A",
        "width": "N/A",
        "length": "N/A",
        "volume": "N/A",
        "imgdir": "assets/images/attachment.gif"
}

let allItems = [];
let currentId = null;

async function fetchData() {
  try {
      const response = await fetch("./assets/data.json");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      allItems = data;
    } catch (error) {
      console.error("Failed to load data:", error);
  }
}

function displayItem(item) {
    for (const [key, value] of Object.entries(item)) {
        if (key in changable) {
            if (key == "price"){
              updatePrice(value)
            } else {
              changable[key].item[changable[key].change] = value;
            }
        }
    }
}

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function comprar(){
    const user = localStorage.getItem('pieca_user');
    if (!user) {
        alert("Debe iniciar sesión para añadir productos al carrito.");
        return window.location.href = 'login.html';
    }

    if (currentId && currentId >= 0 && currentId < allItems.length) {
        const cart = getCart();
        const existing = cart.find(entry => entry.id === currentId);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id: currentId, quantity: 1 });
        }
        saveCart(cart);
        alert("Añadido al carrito!");
    } else {
        alert("Error! ID Inexistente");
    }
}

//Gemini generated with 3.8 FLASH
function updatePrice(value) {
  const priceElement = document.getElementById("price");
  if (!priceElement) return;

  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    priceElement.value = "";
    priceElement.textContent = "N/A";
    return;
  }

  priceElement.value = numericValue;
  priceElement.textContent = priceFormatter.format(numericValue);
}

(async function init() {
    await fetchData();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const item = allItems[id];
    currentId = id;
    if (item) {
      displayItem(item);
    } else {
      displayItem(emptyData);
    }

})();