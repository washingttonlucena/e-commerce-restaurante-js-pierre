import { products } from "./data.js";
import { Cart } from "./cart.js";

const cart = new Cart();

// ========================
// Atualiza contador no header e ícone flutuante
// ========================
function updateCartUI() {
  const totalQty = cart.totalQty();

  // Atualiza header se existir
  const cartCountHeader = document.getElementById("cart-count");
  if (cartCountHeader) cartCountHeader.textContent = totalQty;

  const cartCountNav = document.getElementById("cart-count-nav");
  if (cartCountNav) cartCountNav.textContent = totalQty;

  // Atualiza ícone flutuante se existir
  const floatingCartCount = document.getElementById("floating-cart-count");
  if (floatingCartCount) floatingCartCount.textContent = totalQty;
}

// ========================
// Cria o ícone flutuante
// ========================
function createFloatingCart() {
  if (document.getElementById("floating-cart")) return;

  const cartDiv = document.createElement("div");
  cartDiv.id = "floating-cart";
  cartDiv.innerHTML = `🛒 <span id="floating-cart-count">${cart.totalQty()}</span>`;
  document.body.appendChild(cartDiv);

  cartDiv.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

// ========================
// Renderiza catálogos de produtos
// ========================
function renderCatalogo(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filtered = products.filter(p => p.category === category);
  container.innerHTML = filtered.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>R$ ${p.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${p.id}">Adicionar</button>
    </div>
  `).join("");

  container.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const product = products.find(p => p.id == id);
      cart.add(product, 1);
      updateCartUI();
      showFeedback(`${product.name} adicionado ao carrinho!`);
    });
  });
}

// ========================
// Feedback / toast
// ========================
function showFeedback(message, type = "success") {
  const feedback = document.getElementById("feedback") || createFeedbackDiv();
  feedback.textContent = message;
  feedback.className = `feedback ${type} show`;
  feedback.style.display = "block";

  setTimeout(() => {
    feedback.style.display = "none";
    feedback.className = "feedback";
  }, 3000);
}

function createFeedbackDiv() {
  const div = document.createElement("div");
  div.id = "feedback";
  div.className = "feedback";
  document.body.appendChild(div);
  return div;
}

// ========================
// Inicialização
// ========================
document.addEventListener("DOMContentLoaded", () => {
  createFloatingCart();
  updateCartUI();

  // Renderiza catálogos se existirem
  renderCatalogo("pratos", "catalogo-pratos");
  renderCatalogo("sucos", "catalogo-sucos");
  renderCatalogo("refrigerantes", "catalogo-refrigerantes");
});

// ========================
// Função para criar o ícone do carrinho
// ========================
function createFloatingCart() {
  if (document.getElementById("floating-cart")) return; // evita duplicar

  // Cria o elemento
  const cartDiv = document.createElement("div");
  cartDiv.id = "floating-cart";
  cartDiv.innerHTML = `🛒 <span id="floating-cart-count">0</span>`;

  document.body.appendChild(cartDiv);

  // Ao clicar, vai para cart.html
  cartDiv.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  updateCartCount();
}

// Atualiza a contagem de produtos no carrinho
function updateCartCount() {
  const el = document.getElementById("floating-cart-count");
  if (!el) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
  el.textContent = totalQty;
}

// Inicializa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  createFloatingCart();
});


const feedback = document.getElementById("feedback");
const cartCount = document.getElementById("cart-count") || document.getElementById("cart-count-nav");

// Atualiza contador do carrinho
function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
  if (cartCount) cartCount.textContent = totalQty;
}

// Mostra feedback com botão “Ver Carrinho”
function showFeedback(message, type = "success") {
  feedback.innerHTML = `
    ${message}
    <a href="cart.html" class="view-cart-btn">Ver Carrinho</a>
  `;
  feedback.className = `feedback ${type} show`;
  feedback.style.display = "block";

  setTimeout(() => {
    feedback.style.display = "none";
    feedback.className = "feedback";
    feedback.innerHTML = ""; // limpa conteúdo
  }, 3000);
}

// Adiciona produto ao carrinho
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ name, price: parseFloat(price), quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  showFeedback(`${name} foi adicionado ao carrinho!`, "success");
}

// Detecta todos os botões com a classe .btn-add
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = btn.dataset.price;
    addToCart(name, price);
  });
});

// Inicializa contador ao carregar página
document.addEventListener("DOMContentLoaded", updateCartUI);




