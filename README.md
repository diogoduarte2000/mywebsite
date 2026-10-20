# Portfólio Diogo Duarte

Aplicação Nuxt 4 com renderização no servidor e deploy preparado para Vercel.
Interface disponível em português e inglês através do seletor na navegação.
O inglês é o idioma principal.

## Desenvolvimento

Requer Node.js 22.22.3 ou superior.

```sh
npm install
npm run dev
```

## Produção e Vercel

```sh
npm run build
```

Importe o repositório na Vercel e escolha **Nuxt** como framework. A configuração Nuxt/Nitro usa o preset Vercel e publica também o endpoint `/api/github-pinned`, que consulta os repositórios fixados no GitHub. Se o serviço de pins estiver indisponível, a página mostra a cópia de segurança existente.

O site não precisa de variáveis de ambiente para funcionar.
