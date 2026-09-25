# Portfólio Bernardo Knoblauch

Site estático em Next.js (App Router) com next-intl, em pt, en, fr e es.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local   # defina NEXT_PUBLIC_SITE_URL
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera o site estático em `out/` |
| `npm run typecheck` | TypeScript strict |
| `npm run lint` | ESLint |
| `npm run i18n:check` | mesmas chaves nos 4 idiomas, termos proibidos, emojis |

Para ver o build: sirva a pasta `out/` com qualquer servidor estático, por exemplo `python3 -m http.server -d out 3000`.

## Como funciona

- `output: 'export'`: sem servidor, sem middleware. Cada idioma vira `out/<locale>/index.html`.
- `/` é um HTML estático que redireciona: idioma escolhido antes no seletor → idioma do navegador → `en`. Sem JavaScript, vai para `/en/`.
- Textos em `messages/*.json`. Conteúdo de referência em `docs/perfil.md`.
- Contatos e links em `src/lib/profile.ts`.
- Canonical, hreflang, `sitemap.xml` e `robots.txt` usam `NEXT_PUBLIC_SITE_URL`.

## Deploy

A variável `NEXT_PUBLIC_SITE_URL` é obrigatória no deploy (ex.: `https://dominio.com`, sem barra final). O build falha na Vercel e no Cloudflare Pages se ela estiver vazia.

### Vercel

1. Importe o repositório. O framework é detectado como Next.js.
2. Em *Settings → Environment Variables*, defina `NEXT_PUBLIC_SITE_URL`.
3. Deploy. Com `output: 'export'`, a Vercel publica o conteúdo de `out/` como estático.
4. Domínio: *Settings → Domains*.

### Cloudflare Pages

1. *Workers & Pages → Create → Pages → Connect to Git*.
2. Build command: `npm run build` · Build output directory: `out`.
3. Variáveis de ambiente: `NEXT_PUBLIC_SITE_URL` e `NODE_VERSION=24`.
4. Domínio: *Custom domains*.

O Cloudflare Pages serve `out/404.html` para rotas inexistentes e `/pt/` a partir de `pt/index.html` (por isso `trailingSlash: true`).
