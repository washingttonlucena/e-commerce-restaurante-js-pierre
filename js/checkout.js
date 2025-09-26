import { Cart } from "./cart.js";

const cart = new Cart();
const form = document.getElementById("checkout-form");
const feedback = document.getElementById("feedback");

// ========================
// Bloqueio do checkout se carrinho vazio
// ========================
if (cart.items.length === 0) {
  showFeedback("Carrinho vazio! Adicione produtos antes de finalizar.", "error");
  setTimeout(() => { window.location.href = "product.html"; }, 3000);
}

// ========================
// Renderizar resumo do pedido
// ========================
function renderResumo() {
  const resumo = document.getElementById("resumo");
  if (!resumo) return;

  if (cart.items.length === 0) {
    resumo.innerHTML = "<p>Carrinho vazio.</p>";
    return;
  }

  resumo.innerHTML = `
    <h2>Resumo do Pedido</h2>
    <ul>
      ${cart.items.map(item => `<li>${item.qty}x ${item.name} - R$ ${(item.qty * item.price).toFixed(2)}</li>`).join("")}
    </ul>
    <p><strong>Total:</strong> R$ ${cart.totalPrice().toFixed(2)}</p>
  `;
}
renderResumo();

// ========================
// Função de feedback
// ========================
function showFeedback(message, type = "success") {
  feedback.textContent = message;
  feedback.className = `feedback ${type} show`;
  feedback.style.display = "block";
  setTimeout(() => feedback.style.display = "none", 3000);
}

// ========================
// Validação de CEP
// ========================
document.getElementById("cep").addEventListener("input", async e => {
  const cep = e.target.value.replace(/\D/g, "");
  if (cep.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        showFeedback("CEP inválido. Preencha manualmente.", "error");
        document.getElementById("rua").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("uf").value = "";
        return;
      }
      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("uf").value = data.uf || "";
      document.getElementById("numero").focus();
      showFeedback("Endereço preenchido com sucesso!");
    } catch {
      showFeedback("Erro na busca do CEP. Preencha manualmente.", "error");
    }
  }
});

// ========================
// Validação e envio do formulário
// ========================
form.addEventListener("submit", e => {
  e.preventDefault();

  // Verifica se o carrinho tem produtos
  if (cart.items.length === 0) {
    showFeedback("Não é possível finalizar sem produtos no carrinho.", "error");
    return;
  }

  // Validação número da casa
  const numero = parseInt(document.getElementById("numero").value, 10);
  if (!numero || numero <= 0) {
    showFeedback("Número da casa inválido. Deve ser maior que 0.", "error");
    return;
  }

  // Tudo ok, finaliza pedido
  localStorage.removeItem("cart");
  showFeedback("Pedido realizado com sucesso!", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
});
