
//Usando Progamação Orientada a Objetos (POO) para criar a página de produto
//Classe para gerenciar a página de produto e interações com o carrinho
//Classe para feedback visual ao usuário


import { Cart } from "./cart.js";

// Classe para feedback visual
class FeedbackUI {
  static show(message, type = "success") {
    const feedback = document.getElementById("feedback");
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.display = "block";

    setTimeout(() => {
      feedback.style.display = "none";
    }, 3000);
  }
}

// Classe principal da página de produto
class ProductPage {
  constructor() {
    this.cart = new Cart();
    this.cartCount = document.getElementById("cart-count");
    this.container = document.getElementById("product-container");

    const params = new URLSearchParams(window.location.search);
    this.productId = Number(params.get("id"));
    this.product = findProductById(this.productId);

    this.init();
  }

  init() {
    this.updateCartUI();
    this.renderProduct();
  }

  updateCartUI() {
    if (this.cartCount) {
      this.cartCount.textContent = this.cart.totalQty();
    }
  }

  renderProduct() {
    if (this.product && this.container) {
      this.container.innerHTML = `
        <article class="product-detail">
          <img src="${this.product.img}" alt="${this.product.name}" class="product-image">
          <div class="product-info">
            <h2>${this.product.name}</h2>
            <p><strong>Preço:</strong> R$ ${this.product.price.toFixed(2)}</p>
            <p>${this.product.description}</p>
            <button id="btn-add">Adicionar ao Carrinho</button>
          </div>
        </article>
      `;

      document
        .getElementById("btn-add")
        .addEventListener("click", () => this.addToCart());
    } else if (this.container) {
      this.container.innerHTML = "<p>Produto não encontrado.</p>";
    }
  }

  addToCart() {
    this.cart.add(this.product);
    this.updateCartUI();
    FeedbackUI.show(`${this.product.name} foi adicionado ao carrinho!`);
  }
}

// Inicializa a página
new ProductPage();
