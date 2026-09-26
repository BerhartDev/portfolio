# Linha do tempo

Registro de cada pedido e do que foi feito. Entradas novas no topo. Entradas antigas não são editadas; correções entram como nova entrada.

Formato:

```
## AAAA-MM-DD · Título curto
- Pedido: o que foi pedido.
- Feito: o que mudou (arquivos, commits).
- Pendente: o que ficou para depois, se houver.
```

## 2026-09-26 · Link do blog na navegação
- Pedido: link na nav para o blog, na versão do idioma atual.
- Feito: `blogUrl` em `src/lib/profile.ts`; "Blog ↗" no fim da barra e do menu mobile (`SiteHeader`), com `hrefLang`; `nav.blog` nos 4 idiomas; menu mobile passa a valer abaixo de 72rem. Medido no Edge em 1152px: links numa linha só em pt, en, fr e es.

## 2026-09-26 · Git push
- Pedido: `git push`.
- Feito: tentativa falhou com `Permission denied (publickey)`: o shell do Claude não tem a chave SSH. Orientado a rodar `! git push origin main` no prompt.

## 2026-09-26 · Ícones provisórios de Instagram, LeetCode e Hack The Box
- Pedido: mostrar os ícones que faltavam, por enquanto levando para a home.
- Feito: `HOME_PLACEHOLDER` em `src/lib/profile.ts`; `SocialLinks` recebe o `locale` e troca o marcador pela home no idioma atual (`/pt/`, `/fr/`…), sem `rel="me"`. Os 5 ícones aparecem no topo e no rodapé.
- Pendente: trocar `HOME_PLACEHOLDER` pelas URLs reais.

## 2026-09-26 · Ícones de redes sociais
- Pedido: ícones de LinkedIn, GitHub, Instagram, LeetCode e HackTheBox onde fizer sentido; ignorar os que não estiverem disponíveis.
- Escolhas: GitHub confirmado como github.com/BerhartDev.
- Feito: `SocialLinks` + `social-icons.ts` (traços do Simple Icons, CC0); ícones no `Hero` e no `SiteFooter`; `socialLinks` em `profile.ts` com LinkedIn e GitHub preenchidos; GitHub também passa a aparecer no Contato; rótulo `social.label` nos 4 idiomas; `docs/perfil.md` com GitHub e os outros como `[PREENCHER]`. Os 5 ícones conferidos em print com URLs temporárias, depois removidas.
- Pendente: URLs de Instagram, LeetCode e Hack The Box (ficam ocultos até lá). No desktop, o link do LinkedIn no Contato quebra no meio da palavra (anterior a esta mudança).

## 2026-09-26 · Escuro por padrão e ícone no botão de tema
- Pedido: dark mode como padrão; botão alternando entre bolinha cheia (claro) e meia lua (escuro).
- Escolhas: o ícone mostra o tema atual; lua crescente.
- Feito: `tokens.css` com a paleta escura em `:root` e a clara em `[data-theme="light"]`, sem `prefers-color-scheme`; `ThemeToggle` quadrado só com ícone SVG (lua/bolinha escolhidos por CSS), sem `matchMedia`; comentário de `theme-script.ts`; regra do `CLAUDE.md` e decisão atualizadas. Testado no Edge via CDP com o sistema em modo claro: abre escuro com a lua; um clique vai para o claro com a bolinha e grava `light`; ao recarregar continua claro.

## 2026-09-26 · Rodar o projeto
- Pedido: rodar o projeto.
- Feito: `npm run dev` na porta 3000; `/pt/`, `/pt/projetos/` e `/pt/projetos/lance/` respondem 200. Sem mudança de código.
- Pendente: favicon (o dev ainda loga erro em `/favicon.ico`).

## 2026-09-25 · Botões da barra com o mesmo tamanho
- Pedido: deixar os botões da barra com tamanho mais parecido.
- Feito: token `--control-h` (2.5rem); idioma, tema, CTA e menu com 40px de altura, fonte mono `--text-sm` e borda de 1px (idioma e tema em `--line`, CTA e menu em `--fg`); espaço entre controles reduzido. Medido no Edge via CDP: todos com 40px no desktop e no mobile.

## 2026-09-25 · Barra de navegação da BEKNO
- Pedido: copiar o funcionamento da barra de navegação da landing da BEKNO, mantendo a identidade visual do portfólio.
- Feito: `SiteHeader` fixo no topo com CTA "Entrar em contato" e menu mobile; `LocaleSwitcher` virou dropdown; novo `Disclosure` (client) para fechar painéis; token `--header-h` e `scroll-margin-top` ajustados; `nav.cta` e `nav.menu` nos 4 idiomas. Testado no Edge via CDP: barra fixa ao rolar, menu abre e fecha (link, Esc com foco de volta, clique fora), dropdown de idioma.
- Pendente: `/favicon.ico` dá 500 no dev (não existe favicon e a URL cai em `[locale]`); problema anterior a esta mudança.

## 2026-09-25 · Carrossel de imagens
- Pedido: visualização melhor para as imagens, tipo carrossel.
- Feito: `src/components/Carousel.tsx` (client) + `Carousel.module.css`; `Gallery.tsx` passa a resolver textos no servidor e entregar ao carrossel; rótulos `article.gallery` nos 4 idiomas; `Gallery.module.css` removido. Conferido por screenshot no desktop e em 500px.
- Pendente: testar no navegador real a navegação por botões, miniaturas e teclado.

## 2026-09-25 · Imagens de exemplo nos projetos
- Pedido: gerar imagens de exemplo para os projetos.
- Feito: 3 wireframes SVG em tons de cinza por projeto (`public/projects/<slug>/exemplo-{1,2,3}.svg`: página desktop 1600×1000, painel 1200×900, mobile 1200×900), com a faixa "IMAGEM DE EXEMPLO". Registrados em `images` nos 4 JSONs, com alt nos 4 idiomas dizendo que não é tela real e legenda "Imagem de exemplo. [PREENCHER]".
- Pendente: trocar pelas capturas reais de cada projeto e apagar os `exemplo-*.svg`.

## 2026-09-25 · CTA, bloco único e galeria de imagens
- Pedido: CTA "Ver projetos" na página de projetos; lugar para várias imagens por projeto; tirar a separação "para empresas / para clientes" e fazer um texto completo.
- Feito: CTA na abertura de `/<idioma>/<segmento>/` levando à lista de estudos de caso; bloco único "O que entrego" (texto corrido com o que já estava no perfil, lista de 6 entregas, linha de formato de trabalho `[PREENCHER]`); campo `images` nos JSONs, validado no loader, com componente `Gallery` no artigo; pastas `public/projects/<slug>/`; loader sem cache no dev; `content/projects/README.md`, `docs/decisoes.md` e `docs/status.md` atualizados.
- Pendente: as imagens de cada projeto; formato de trabalho e disponibilidade.

## 2026-09-25 · Como rodar o projeto
- Pedido: por que precisa de Python para ver o build; depois, rodar o projeto.
- Feito: explicado que o Python era só um servidor estático (alternativas: `npm run dev` ou `npx serve out`). Dev server iniciado na porta 3001, porque a 3000 estava ocupada por outro `next-server`. Sem mudança de código.

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
