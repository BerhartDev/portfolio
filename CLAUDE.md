# Portfólio Bernardo Knoblauch

Portfólio pessoal estático em pt, en, fr, es.

- Etapa atual e próximos passos: `docs/status.md`. Leia no início de toda sessão.
- Dados reais (experiência, projetos, links): `docs/perfil.md`. Única fonte de verdade para conteúdo.
- Decisões já tomadas: `docs/decisoes.md`. Não reabra uma decisão registrada sem eu pedir.

## Comandos
`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run i18n:check`

## Técnico
- Next.js (App Router, última estável), TypeScript strict sem `any`, next-intl, next/font self-hosted.
- 100% estático: `output: 'export'`, sem middleware/proxy, sem API routes, sem nada que exija servidor.
- Rotas `/pt /en /fr /es` geradas com `generateStaticParams` + `setRequestLocale`. A raiz `/` detecta o idioma do navegador (escolha salva primeiro, depois `navigator.languages`, fallback `en`) e redireciona.
- Canonical, hreflang, `sitemap.xml` e `robots.txt` gerados no build.
- Server Components por padrão. `"use client"` só com motivo. Mínimo de JS no cliente. Meta: Lighthouse 100, acessível por teclado.
- Nenhum texto visível hardcoded: tudo em `messages/{pt,en,fr,es}.json`, escrito de forma nativa em cada idioma (francês com vouvoiement).
- Deploy: Vercel ou Cloudflare Pages, documentado no README.
- Não instalar dependência nova sem me dizer qual e por quê.

## Tom de escrita
- Primeira pessoa, direto, técnico, frases curtas, números sempre que existirem.
- Proibido em qualquer idioma: apaixonado/passionate, entusiasta, soluções inovadoras, transformar ideias em realidade, cutting-edge, seamless, leverage, "vamos construir algo incrível", "olá, eu sou 👋", emojis.
- Nunca invente métrica, cliente, depoimento ou experiência. Faltou dado → `[PREENCHER]`.

## Visual
- Só preto, branco e cinzas. `border-radius: 0` em tudo. Cores e espaçamentos sempre via variáveis CSS.
- Editorial/técnico: linhas de 1px, muito espaço em branco. Uma sans com personalidade + uma mono para detalhes. Nada de Inter, Poppins ou Roboto.
- Hover sóbrio com personalidade: inversão preto↔branco, sublinhado que se desenha, pequeno deslocamento. Respeitar `prefers-reduced-motion`.
- Dark e light: segue o sistema, toggle manual persistente, sem flash ao carregar. Contraste AA nos dois.
- Proibido: gradientes, glassmorphism, glow, sombras suaves, cards idênticos com ícone, barras de % de skill, fade-in em tudo ao rolar.

## Estrutura do site
Topo (nome, frase concreta, links, idioma, tema) → projetos (contexto → problema → o que fiz e por quê → resultado) → trajetória → stack agrupada por área → "agora" → contato sem formulário.

## Como trabalhar comigo
- Tarefa com mais de ~3 arquivos: plano curto e espere aprovação.
- Commits pequenos, em português, conventional (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`). Nomes de código em inglês.
- Antes de dizer que terminou: `typecheck`, `lint` e `build` passando. Se mexeu em textos, `i18n:check` também.
- Ao fechar uma etapa: atualize `docs/status.md` e registre decisões em `docs/decisoes.md`.
- Nunca faça `git push` nem deploy.
- Não leia `node_modules/`, `.next/`, `out/` nem lockfiles sem necessidade.
