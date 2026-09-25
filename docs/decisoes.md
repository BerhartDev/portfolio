# Decisões

## 2026-09-25 · Site 100% estático
`output: 'export'`, sem middleware. Rotas `/pt /en /fr /es` geradas no build com `generateStaticParams` + `setRequestLocale`. `trailingSlash: true` para hospedagem estática servir `/pt/` a partir de `pt/index.html`.

## 2026-09-25 · Redirecionamento da raiz no cliente
`/` é HTML estático com script inline: idioma salvo em `localStorage` → `navigator.languages` → fallback `en`. Sem JS: meta refresh para `/en/` e links visíveis. `/` tem `noindex`; hreflang `x-default` aponta para ela.

## 2026-09-25 · Seletor de idioma
Links `<a>` normais. Um componente client mínimo grava `localStorage.locale` só no clique: a escolha explícita é lembrada, a visita por link compartilhado não.

## 2026-09-25 · Estilo: CSS Modules + variáveis CSS
Nenhuma dependência extra. Tema inteiro em variáveis CSS (`src/styles/tokens.css`).

## 2026-09-25 · Mensagens só no servidor
Textos via `getTranslations` em Server Components. Componentes client recebem rótulos por props. Sem enviar JSON de mensagens para o cliente.

## 2026-09-25 · URL base por env
`NEXT_PUBLIC_SITE_URL` define canonical, hreflang e sitemap. Domínio: [PREENCHER].

## 2026-09-25 · Sem framework de testes
`npm run i18n:check` (Node puro) verifica paridade de chaves nos 4 idiomas, palavras proibidas e emojis.
