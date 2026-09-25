# Linha do tempo

Registro de cada pedido e do que foi feito. Entradas novas no topo. Entradas antigas não são editadas; correções entram como nova entrada.

Formato:

```
## AAAA-MM-DD · Título curto
- Pedido: o que foi pedido.
- Feito: o que mudou (arquivos, commits).
- Pendente: o que ficou para depois, se houver.
```

## 2026-09-25 · Página de projetos e artigo por projeto
- Pedido: página separada de projetos para "vender o peixe", falando com empresas e com pequenos negócios, e uma página por projeto em formato de artigo, carregando os dados de um JSON editável.
- Escolhas: um JSON por projeto com os 4 idiomas; home vira lista com links; URLs traduzidas (`/pt/projetos/`, `/en/projects/`, `/fr/projets/`, `/es/proyectos/`).
- Feito: `content/projects/*.json` (4 projetos migrados de `messages/`, sem texto novo inventado) e `content/projects/README.md`; loader validado em `src/lib/projects.ts`; `src/lib/routes.ts`; SEO por página (`pageMetadata`); sitemap com 24 URLs; rotas `[locale]/[section]` e `[locale]/[section]/[slug]`; componentes `ProjectList`, `PageIntro`, `Blocks`; header e seletor de idioma apontando para a página atual; `i18n:check` cobre os JSONs. A sessão caiu no meio; o trabalho foi retomado e concluído. Commits `fd05b34` e seguintes.
- Pendente: prazo/escopo/preço para pequenos negócios, conteúdo `[PREENCHER]` dos projetos, revisão visual e Lighthouse no navegador.

## 2026-09-25 · Regra da linha do tempo
- Pedido: documentar sempre pedidos e alterações, formando uma linha do tempo do projeto.
- Feito: criado `docs/linha-do-tempo.md`, com as entradas anteriores reconstruídas a partir do histórico do git e da sessão. Regra adicionada ao `CLAUDE.md` e registrada em `docs/decisoes.md`.

## 2026-09-25 · Domínio da Vercel
- Pedido: entender por que o domínio ficou `portfolio-nu-bay-a31qpohxfx.vercel.app` e como trocar.
- Feito: explicado que `portfolio.vercel.app` já estava ocupado e a Vercel gerou um nome. Troca em *Settings → Domains* (outro `.vercel.app` livre ou domínio próprio). Depois da troca: atualizar `NEXT_PUBLIC_SITE_URL` e fazer redeploy. Sem mudança de código.
- Pendente: escolher o domínio definitivo.

## 2026-09-25 · Erro de build na Vercel
- Pedido: build falhou com `NEXT_PUBLIC_SITE_URL não definida`.
- Feito: explicado que a falha é intencional (`src/lib/site.ts`). Solução: definir a variável em *Settings → Environment Variables* (Production e Preview) e fazer redeploy. Sem mudança de código.

## 2026-09-25 · Como fazer deploy na Vercel
- Pedido: passo a passo de deploy na Vercel.
- Feito: passos pelo painel e pela CLI, conforme o `README.md`. Sem mudança de código.

## 2026-09-25 · README de deploy
- Feito: `README.md` com deploy na Vercel e no Cloudflare Pages; `docs/status.md` e `docs/decisoes.md` atualizados. Commit `6a792d1`.

## 2026-09-25 · SEO
- Feito: canonical, hreflang, Open Graph, `sitemap.xml`, `robots.txt` e página 404. Commit `5830574`.

## 2026-09-25 · Seções do portfólio
- Feito: topo, projetos, trajetória, stack, agora e contato. Commit `258f78c`.

## 2026-09-25 · Textos nos 4 idiomas
- Feito: `messages/{pt,en,fr,es}.json` com mensagens tipadas. Commit `711e800`.

## 2026-09-25 · Tema e fontes
- Feito: tokens de tema, fontes self-hosted e tema sem flash. Commit `5961d63`.

## 2026-09-25 · i18n estático
- Feito: next-intl estático e redirecionamento da raiz pelo idioma do navegador. Commit `ce0f339`.

## 2026-09-25 · Setup
- Feito: Next.js com TypeScript strict, ESLint e checagem de i18n. Commit `a8a76ce`.

## 2026-09-25 · Início do projeto
- Feito: regras do projeto (`CLAUDE.md`), `docs/perfil.md`, `docs/status.md`, `docs/decisoes.md`. Commit `88605f4`.
