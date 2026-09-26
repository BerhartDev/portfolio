# Portfólio Bernardo Knoblauch

Portfólio pessoal estático em pt, en, fr, es.

- Etapa atual e próximos passos: `docs/status.md`. Leia no início de toda sessão.
- Dados reais (experiência, links): `docs/perfil.md`. Única fonte de verdade para conteúdo.
- Projetos: `content/projects/<slug>.json`, um arquivo por projeto com os 4 idiomas. Formato em `content/projects/README.md`.
- Decisões já tomadas: `docs/decisoes.md`. Não reabra uma decisão registrada sem eu pedir.
- Histórico de pedidos e alterações: `docs/linha-do-tempo.md`.

## Comandos
`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run i18n:check`

## Técnico
- Next.js (App Router, última estável), TypeScript strict sem `any`, next-intl, next/font self-hosted.
- 100% estático: `output: 'export'`, sem middleware/proxy, sem API routes, sem nada que exija servidor.
- Rotas `/pt /en /fr /es` geradas com `generateStaticParams` + `setRequestLocale`. A raiz `/` detecta o idioma do navegador (escolha salva primeiro, depois `navigator.languages`, fallback `en`) e redireciona.
- Canonical, hreflang, `sitemap.xml` e `robots.txt` gerados no build.
- Server Components por padrão. `"use client"` só com motivo. Mínimo de JS no cliente. Meta: Lighthouse 100, acessível por teclado.
- Nenhum texto visível hardcoded: interface em `messages/{pt,en,fr,es}.json`, projetos em `content/projects/*.json`, escritos de forma nativa em cada idioma (francês com vouvoiement).
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
- Dark e light: escuro por padrão (independente do sistema), toggle manual persistente com ícone do tema atual (lua crescente no escuro, bolinha cheia no claro), sem flash ao carregar. Contraste AA nos dois.
- Proibido: gradientes, glassmorphism, glow, sombras suaves, cards idênticos com ícone, barras de % de skill, fade-in em tudo ao rolar.

## Estrutura do site
Home: topo (nome, frase concreta, links, idioma, tema) → stack agrupada por área → projetos (lista com link para cada artigo) → trajetória → contato sem formulário. Ordem pensada para recrutadores.

Página de projetos (`/pt/projetos/`, `/en/projects/`, `/fr/projets/`, `/es/proyectos/`): abertura → para empresas → para pequenos negócios → estudos de caso → contato. Cada projeto tem um artigo em `/<idioma>/<segmento>/<slug>/`: contexto → problema → o que fiz e por quê → resultado.

## Como trabalhar comigo
- Tarefa com mais de ~3 arquivos: plano curto e espere aprovação.
- Commits pequenos, em português, conventional (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`). Nomes de código em inglês.
- Antes de dizer que terminou: `typecheck`, `lint` e `build` passando. Se mexeu em textos, `i18n:check` também.
- Ao fechar uma etapa: atualize `docs/status.md` e registre decisões em `docs/decisoes.md`.
- Todo pedido meu, inclusive dúvidas sem mudança de código, vira uma entrada em `docs/linha-do-tempo.md` na mesma sessão: data, pedido, o que foi feito (arquivos e commits) e o que ficou pendente. Entradas novas no topo. Nunca apague nem reescreva entradas antigas; correções entram como nova entrada.
- Nunca faça `git push` nem deploy.
- Não leia `node_modules/`, `.next/`, `out/` nem lockfiles sem necessidade.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
