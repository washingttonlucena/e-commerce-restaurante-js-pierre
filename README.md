🍽️ O Grande Mestre — Sistema de Cardápio Online

Este projeto é um site de restaurante com cardápio digital, carrinho de compras e checkout, desenvolvido em HTML, CSS e JavaScript puro.

📌 Funcionalidades

🔹 Estrutura de páginas
	•	Início (index.html)
	•	Apresentação do restaurante.
	•	Bloco de promoções semanais com preços originais e promocionais.
	•	Seção “Formas de pagamento” com ícones (Pix, cartões e outros).
	•	Estilo customizado com textos centralizados e blocos responsivos.
	•	Produtos (products.html)
	•	Catálogo organizado em categorias (pratos, sucos, refrigerantes).
	•	Botão “Adicionar ao carrinho” em cada item.
	•	Atualização automática da quantidade de produtos no carrinho.
	•	Carrinho (cart.html)
	•	Exibe os produtos selecionados, quantidade e valor total.
	•	Botão para prosseguir para o checkout.
	•	Checkout (checkout.html)
	•	Formulário de finalização de pedido.
	•	Integração com API ViaCEP para preenchimento automático de endereço.

⸻

🔹 Funcionalidades do carrinho
	•	Carrinho armazenado em LocalStorage (persistência entre páginas).
	•	Contador dinâmico da quantidade de produtos.
	•	Ícone flutuante/feedback de carrinho que redireciona para cart.html.
	•	Atualização sincronizada entre produtos, carrinho e checkout.

⸻

🔹 Promoções
	•	Cards personalizados com:
	•	Nome do produto.
	•	Imagem.
	•	Preço antigo (tachado).
	•	Preço promocional (em verde).
	•	Layout responsivo e estilização diferenciada:
	•	Fundo escuro (#14110f).
	•	Textos brancos.
	•	Sombra para destaque.

⸻

🎨 Estilização (CSS)
	•	Cabeçalho e blocos de texto centralizados.
	•	Navegação responsiva (flex + column no mobile).
	•	Cards de promoções com estilo diferenciado (background escuro + textos brancos).
	•	Ajustes de responsividade para diferentes telas.

⸻

🚀 Tecnologias usadas
	•	HTML5 para estrutura das páginas.
	•	CSS3 para estilização e responsividade.
	•	JavaScript (ES6) para interatividade:
	•	Manipulação do DOM.
	•	Eventos de clique.
	•	Atualização de carrinho.
	•	LocalStorage.
	•	API ViaCEP no checkout.