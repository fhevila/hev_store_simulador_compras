# Hev Store – Simulador de Compras

**Aluna:** Hevila Sousa de Freitas
**Trilha:** Desenvolvimento Mobile – Programa Trilhas 2026
**Atividade:** Desafio 1 – Minha Loja: Simulador de Compras


## Sobre a loja

A **Hev Store** é uma hamburgueria artesanal fictícia, com pão macio, carne suculenta e um toque nordestino. A página apresenta os hambúrgueres disponíveis. O usuário pode **simular uma compra** informando a quantidade de cada produto, e o sistema calcula o valor de cada item e o total.

Também há um **carrinho lateral**: o usuário adiciona produtos pelo ícone de sacola, aumenta ou diminui as quantidades e acompanha o total em tempo real.

## Produtos e preços

| Produto | Descrição | Preço |
|---|---|---|
| Triplo Carne e Cheddar | Três carnes suculentas com muito cheddar derretido | R$ 50,00 |
| Salada, Bacon e Cheddar | Carne, bacon crocante, cheddar, alface e tomate | R$ 30,00 |
| Cebola Caramelizada e Picles | Carne com cebola caramelizada, picles e molho da casa | R$ 35,00 |
| Duplo Queijo e Bacon | Duas carnes, queijo em dobro e bacon crocante | R$ 45,00 |
| Podrão X Tudo | Carne, ovo, presunto, queijo, bacon, salada e batata palha | R$ 40,00 |
| Frango com Salada | Filé de frango grelhado com alface, tomate e maionese temperada | R$ 30,00 |
| Carne e Queijo Coalho | Carne com queijo coalho na chapa e um fio de melaço de cana | R$ 40,00 |

## Tecnologias utilizadas

- **HTML5**: estrutura da página
- **CSS3**: estilo, layout em grid e responsividade
- **JavaScript**: simulação de compra (`prompt()`, `Number()`, `alert()`) e carrinho
- **Remix Icon**: ícones de sacola, lixeira e fechar
- **Google Fonts (Poppins)**: tipografia

## Estrutura do projeto

```
├── index.html     # Estrutura da página
├── style.css      # Estilos
├── script.js      # Lógica da simulação e do carrinho
├── images/        # Imagens dos produtos, ícone e captura de tela
└── README.md      # Documentação
```

## Como executar

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no arquivo **`index.html`** para abrir no navegador.

Não é preciso instalar nada. Para os ícones e a fonte aparecerem, é necessário estar conectado à internet.

## Como usar

1. Clique no botão **"Simular compra"**.
2. Digite a quantidade de cada hambúrguer. Digite **0** para não comprar o produto.
3. No final, aparece um resumo com as quantidades, o valor de cada produto (preço × quantidade) e o **total**.

Se todas as quantidades forem 0, aparece a mensagem **"Nenhum produto foi selecionado."**

## Testes realizados

| Teste | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Nenhum produto | 0 em todos | "Nenhum produto foi selecionado." | OK |
| Dois produtos | 2 Triplo Carne e Cheddar + 1 Cebola Caramelizada (resto 0) | R$ 100,00 + R$ 35,00 = **R$ 135,00** | OK |
| Um de cada | 1 em todos | **R$ 270,00** | OK |
| Um produto só | 3 Podrão X Tudo (resto 0) | **R$ 120,00** | OK |
| Carrinho | Adicionar itens, usar + e −, remover | Total atualizado na hora | OK |
| Carrinho vazio | Clicar em "Comprar" sem itens | Aviso de carrinho vazio | OK |
| Preços | Comparar página e `script.js` | Mesmos valores nos dois | OK |

---
