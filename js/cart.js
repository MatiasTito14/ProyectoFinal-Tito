// Variables de estado para el carrito
let cart = {}; // Almacena los productos en el carrito

// Verificar si hay un carrito almacenado en el Local Storage y cargarlo
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
}

// Función para guardar el carrito en el Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// JavaScript para agregar y quitar productos al carrito
document.addEventListener("DOMContentLoaded", function () {
  // Obtener todos los elementos con el ID "cart-item-X"
  const cartItems = document.querySelectorAll('[id^="cart-item-"]');

  // Actualizar el contenido de los elementos con la cantidad del producto correspondiente
  function updateCartCounters() {
    cartItems.forEach((cartItem) => {
      const productName = cartItem.id.replace("cart-item-", "");
      cartItem.textContent = cart[productName] ? cart[productName].quantity : "0";
    });
  }

  // Botones de sumar y quitar productos
  document.querySelectorAll(".cart-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = event.target.getAttribute("data-product");
      if (event.target.classList.contains("btn-success")) {
        addToCart(productName);
      } else if (event.target.classList.contains("btn-danger")) {
        removeFromCart(productName);
      }
      // Actualizar el carrito en el Local Storage y los contadores
      saveCartToLocalStorage();
      updateCartCounters();
    });
  });

  function addToCart(productName) {
    if (cart[productName]) {
      cart[productName].quantity++;
    } else {
      cart[productName] = {
        quantity: 1,
        price: parseFloat(document.querySelector(`[data-product="${productName}"]`).getAttribute("data-price"))
      };
    }
    updateCartTotal();
    updateCartCounters();
  }

  function removeFromCart(productName) {
    if (cart[productName] && cart[productName].quantity > 0) {
      cart[productName].quantity--;
      if (cart[productName].quantity === 0) {
        delete cart[productName];
      }
      updateCartTotal();
      updateCartCounters();
    }
  }

  function updateCartTotal() {
    const total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(1)}`;
  }

  // Obtener el elemento cartTotal
  const cartTotal = document.getElementById("cart-total");

  // Inicializar el carrito al cargar la página
  updateCartTotal();
  updateCartCounters();
});
