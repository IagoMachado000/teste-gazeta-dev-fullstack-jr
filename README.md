# Gazeta do Povo - Portal de Notícias (Teste Técnico)

Esta é uma aplicação web de alto desempenho desenvolvida para o desafio técnico da **Gazeta do Povo**. O projeto simula um portal de notícias real, com foco em legibilidade, performance e uma experiência de usuário (UX) fluida em todos os dispositivos.

---

## Como Rodar o Projeto

A aplicação foi totalmente configurada utilizando **Docker**, garantindo que o ambiente de execução seja isolado e idêntico em qualquer máquina.

### Pré-requisitos

-   **Docker** e **Docker Compose** instalados.

### Passo a Passo

1. **Clone o repositório:**

```bash
git clone https://github.com/IagoMachado000/teste-gazeta-dev-fullstack-jr.git
cd teste-gazeta-dev-fullstack-jr

```

2. **Suba os containers:**

```bash
docker-compose up -d --build

```

3. **Acesse a aplicação:**
   Abra o navegador em: [http://localhost:3000](http://localhost:3000)

---

## Decisões Técnicas e Arquitetura

### 1. Tecnologias Utilizadas

-   **Next.js 16 (App Router):** Escolhido pela excelência em renderização no servidor (SSR), o que é vital para SEO em portais de notícias.
-   **TypeScript:** Implementado para garantir segurança de tipos e facilitar a manutenção e escalabilidade do código.
-   **CSS Modules (CSS Puro):** Optei por não utilizar frameworks de utilitários (como Tailwind) para demonstrar domínio sólido de CSS puro, garantindo escopo isolado por componente.
-   **Context API:** Utilizada para gerenciar o estado global do menu lateral (Sidebar), permitindo a comunicação entre o `Header` e o corpo da página.

### 2. Estrutura de Pastas

A organização segue o padrão de componentes isolados para garantir o princípio da responsabilidade única:

-   `src/app/`: Rotas, layouts e a lógica de páginas dinâmicas (`[id]`).
-   `src/components/`: Componentes reutilizáveis (Header, NewsCard, Sidebar, FilterBar).
-   `src/context/`: Provedores de estado global.
-   `src/data/`: Fonte de dados (`articles.json` com 100 registros).
-   `src/types/`: Definições de interfaces TypeScript.
-   `src/utils/`: Funções auxiliares (ex: formatador de data).

### 3. Gestão de Dados

Em vez de uma API externa, utilizei um arquivo JSON com **100 registros**.

-   **Paginação:** Implementei a lógica de "Load More" (Carregar Mais) para otimizar a renderização inicial do DOM.
-   **Ordenação e Filtros:** Desenvolvi uma lógica customizada com `useMemo` que permite ordenar simultaneamente por Data ou Visualizações (Asc/Desc) e filtrar por categorias extraídas dinamicamente do JSON.

---

## Melhorias de UX e Performance

-   **Hidratação e Fuso Horário:** Implementei uma função utilitária de formatação de data que trata a string ISO de forma local. Isso evita o erro comum de _Hydration Mismatch_ e impede que notícias retrocedam um dia devido ao fuso horário UTC do container Docker.
-   **LCP (Largest Contentful Paint):** As imagens "acima da dobra" (as primeiras da lista e a da página de detalhes) utilizam a propriedade `priority` e `sizes` do Next.js para carregamento imediato.
-   **Responsividade Avançada:** Abaixo de 992px, a Sidebar deixa de ser uma coluna lateral e se torna um _Navigation Drawer_ (menu lateral) acionado pelo Header, garantindo que os filtros não fiquem "presos" no final da página após o carregamento de muitas notícias.

---

## Documentação de IA

Conforme as diretrizes do desafio, utilizei auxílio de IA (Gemini) para acelerar o desenvolvimento de infraestrutura, lógica de dados e refinamento de UX. Abaixo estão os prompts principais utilizados em cada etapa:

### 1. Infraestrutura

-   "Como criar um arquivo `Dockerfile` e um `docker-compose.yml` para um projeto Next.js 16 que permitam rodar a aplicação sem que eu precise ter o Node.js instalado na minha máquina física (Linux Mint)?"
-   "Como configurar o volume no Docker Compose para que as alterações no código (Hot Reload) sejam refletidas imediatamente no navegador mesmo rodando dentro do container?"
-   "Como resolver o erro de conexão recusada ao tentar acessar `localhost:3000` sendo que o container está rodando, mas o bind está apenas em `127.0.0.1`?"

### 2. Debug de Hidratação

-   "Estou recebendo o erro: 'Hydration failed because the server rendered text didn't match the client'. Como resolver isso no Next.js ao trabalhar com datas?"
-   "A solução de ignorar o aviso de hidratação deixou a data inconsistente. No servidor ela renderiza uma data, mas no cliente ela aparece com um dia a menos por causa do fuso horário. Como criar um formatador de data que ignore o fuso horário UTC e mantenha a data original do JSON?"

### 3. Lógica de Ordenação e Dados

-   "Preciso alterar minha ordenação simples para um cenário múltiplo: um `select` para escolher entre Data ou Visualizações e um botão para alternar a direção entre Crescente e Decrescente. Como estruturar o `useMemo` para isso?"
-   "Como extrair de forma dinâmica as categorias únicas de um arquivo JSON com 100 registros para alimentar os filtros da Sidebar, evitando repetições?"
-   "Como implementar um ranking de 'Mais Lidas' que filtre as 5 notícias com o maior valor na chave `views` do meu JSON?"

### 4. UX Responsiva e Performance

-   "Em telas menores que 992px, o layout de duas colunas quebra. Como transformar a Sidebar em um Navigation Drawer (menu lateral) que só aparece ao clicar em um botão no Header?"
-   "Como utilizar a React Context API para que o botão hambúrguer que está no componente Header (dentro do layout) consiga abrir e fechar a Sidebar que está dentro da página principal?"
-   "O componente FilterBar está encavalando em telas menores que 576px. Como fazer o CSS para que os filtros se empilhem verticalmente no mobile e ocupem a largura total da tela?"
-   "Como remover os avisos de performance do `next/image` relacionados ao LCP (Largest Contentful Paint) e à falta da propriedade `sizes` em imagens que usam o modo `fill`?"
