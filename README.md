# Teste para vaga de Desenvolvedor(a) Fullstack JR

## Estrutura do projeto

```plaintext
src/
├── app/              # Rotas e Páginas (App Router)
│   ├── layout.tsx    # Layout global (Header/Footer)
│   ├── page.tsx      # Listagem de Notícias (Home)
│   └── article/
│       └── [id]/     # Página de Detalhes Dinâmica
│           └── page.tsx
├── components/       # Componentes de UI
│   ├── Header/
│   ├── Footer/
│   ├── NewsCard/     # Cards de notícias
│   └── Sidebar/      # Coluna a direita do layout
├── data/             # Camada de dados
│   └── articles.json
├── types/            # Definições de TypeScript
│   └── article.ts
└── styles/           # CSS Global e variáveis
    └── globals.css
```
