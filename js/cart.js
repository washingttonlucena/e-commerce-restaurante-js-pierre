
//Usando Progamação Orientada a Objetos (POO) para criar o carrinho de compras
//Classe Cart para gerenciar o carrinho de compras
//Métodos para adicionar, remover itens e calcular totais


export class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  add(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
    this.save();
  }

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  totalQty() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  }

  totalPrice() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }
}
