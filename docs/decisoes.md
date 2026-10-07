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

## 2026-09-25 · Direção visual
Schibsted Grotesk (sans) + IBM Plex Mono (mono), via `next/font/google` (baixadas no build, servidas pelo site).
Paleta light: bg `#FAFAFA`, surface `#F0F0F0`, fg `#0A0A0A`, muted `#5E5E5E`, faint `#8A8A8A`, line `#D9D9D9`.
Paleta dark: bg `#0B0B0B`, surface `#161616`, fg `#EDEDED`, muted `#A1A1A1`, faint `#6E6E6E`, line `#2B2B2B`.
`--faint` só para texto >= 24px ou decoração. Foco: `outline 2px var(--fg)`.
Hovers: linha de projeto inverte fg↔bg com seta deslocando 6px; links com sublinhado de 1px que entra pela esquerda e sai pela direita.

## 2026-09-25 · Tema
Script inline no `<head>` aplica `data-theme` salvo antes da pintura. Sem escolha salva, CSS segue `prefers-color-scheme`. Toggle é `<button aria-pressed>` com `useSyncExternalStore`.

## 2026-09-25 · Projetos como `<details>`
Estudos de caso em `<details>`/`<summary>`: sem JS, acessível por teclado, conteúdo no HTML. O primeiro vem aberto.

## 2026-09-25 · Mensagens tipadas
`src/i18n/global.d.ts` tipa as chaves a partir de `messages/pt.json`. Chave errada quebra o typecheck.

## 2026-09-25 · 404 global
`global-not-found.tsx` (flag `experimental.globalNotFound`) gera `out/404.html` com a mensagem nos 4 idiomas, já que a URL não indica o idioma.

## 2026-09-25 · Linha do tempo do projeto
Todo pedido, com ou sem mudança de código, é registrado em `docs/linha-do-tempo.md`: data, pedido, o que foi feito e o que ficou pendente. Entradas novas no topo, antigas nunca reescritas.

## 2026-09-25 · Projetos em JSON
Um arquivo por projeto em `content/projects/<slug>.json`, com os 4 idiomas e as 4 seções (contexto, problema, o que fiz, resultado) em blocos tipados (`p`, `h`, `list`, `quote`, `code`, `image`). Lido com `fs` no build por `src/lib/projects.ts`, que valida o formato sem dependência nova e derruba o build com arquivo e campo do erro. `projects.items` saiu de `messages/`. `i18n:check` também verifica os JSONs.

## 2026-09-25 · URLs traduzidas para projetos
`/pt/projetos/`, `/en/projects/`, `/fr/projets/`, `/es/proyectos/`; slug do projeto igual nos 4 idiomas. Rotas `[locale]/[section]` e `[locale]/[section]/[slug]` com `generateStaticParams` gerando só as combinações válidas e `dynamicParams = false`. Segmentos em `src/lib/routes.ts`. x-default das páginas internas aponta para a versão em inglês.

## 2026-09-25 · Home com lista de projetos em links
O acordeão saiu. Cada linha da home leva ao artigo; "Todos os projetos" leva à página de projetos. O item "Projetos" do menu também. O seletor de idioma troca para a mesma página no outro idioma.

## 2026-09-25 · Página de projetos fala com dois públicos
Empresas (o que entrego em produção) e pequenos negócios (BEKNO, VamosMarcar). Prazo, escopo e preço: [PREENCHER].

## 2026-09-25 · Página de projetos com um bloco só
Os blocos "Para empresas" e "Para pequenos negócios" viraram um único "O que entrego", com texto corrido e lista de entregas. CTA "Ver projetos" na abertura leva a `#cases`. Substitui a decisão "Página de projetos fala com dois públicos".

## 2026-09-25 · Galeria de imagens por projeto
Campo `images` opcional no JSON do projeto: `src` em `public/projects/<slug>/`, `width` e `height` obrigatórios (sem layout shift), `alt` e `caption` nos 4 idiomas. Renderizada com `<img>` direto (export estático sem otimização de imagem). No dev, o loader relê os JSONs a cada requisição.

## 2026-09-25 · Carrossel na galeria
A grade de imagens virou carrossel. Base sem JS: faixa com CSS scroll-snap (rola com toque, trackpad e teclado; foco na faixa) e miniaturas como âncoras. Um componente client (`Carousel`) adiciona botões anterior/próximo, contador `01 / 03` anunciado a leitores de tela e miniatura ativa; é o segundo `"use client"` do site, justificado pela navegação. Moldura com proporção fixa 16:10 e `object-fit: contain`, para imagens de tamanhos diferentes não mudarem a altura. Rolagem suave só sem `prefers-reduced-motion`.

## 2026-09-25 · Barra de navegação no modelo da landing da BEKNO
Funcionamento copiado de `BerhartDev/bekno-landing-page` (`Header.tsx`): barra fixa no topo, links, idioma em dropdown, CTA de contato e, abaixo de 64rem, botão de menu com painel que fecha ao seguir um link. Adaptado à identidade do portfólio: fundo sólido com linha de 1px (sem blur, sombra, cantos arredondados nem bandeiras), CTA com borda de 1px e inversão, ícone de menu com três linhas de 1px que viram X. Base em `<details>` (funciona sem JS); o componente client `Disclosure` só fecha com clique fora, Esc (devolve o foco) e clique em link. O CTA aponta para `#contact`, que existe em todas as páginas. `--header-h` desconta a barra nas âncoras.

## 2026-09-26 · Escuro por padrão
Substitui "segue o sistema". Sem tema salvo, o site abre escuro para todo mundo: a paleta escura está em `:root` e a clara em `:root[data-theme="light"]`; saiu o `prefers-color-scheme`. O script do `<head>` continua aplicando o tema salvo antes da pintura. O botão de tema virou quadrado só com ícone do tema atual (lua crescente no escuro, bolinha cheia no claro); os dois SVGs vêm no HTML e o CSS escolhe, então o ícone certo aparece antes da hidratação. Nome acessível pelo rótulo `nav.theme` oculto + `aria-pressed`.

## 2026-09-26 · Ícones de redes sociais
Ícones no topo da home (abaixo da apresentação, quadrados de 1px como os controles da barra) e no rodapé de todas as páginas (menores, sem borda). A seção Contato continua em texto. Redes em `socialLinks` (`src/lib/profile.ts`), na ordem LinkedIn, GitHub, Instagram, LeetCode, Hack The Box; sem URL, a rede não aparece. Traços do Simple Icons (CC0) copiados para `src/components/social-icons.ts`, sem dependência; LinkedIn da v13, porque a marca saiu das versões seguintes. Links com `rel="me"`.

## 2026-09-26 · Ícones provisórios levam à home
Instagram, LeetCode e Hack The Box aparecem já, com `HOME_PLACEHOLDER` no lugar da URL: o link vai para a home no idioma atual e não leva `rel="me"`. Trocar pela URL real em `socialLinks` quando houver.

## 2026-09-26 · Link do blog na navegação
"Blog ↗" é o último link da barra e do menu mobile, apontando para a versão do idioma atual (`blogUrl` em `src/lib/profile.ts`: pt-BR, en-US, fr-FR, es-ES em beknologia.up.railway.app). Com um link a mais, a barra vira menu abaixo de 72rem (antes 64rem), para não quebrar em duas linhas em francês.

## 2026-09-26 · Barra só com Projetos, Stack, Contato e Blog
Trajetória e Agora saíram da barra e do menu mobile (as seções continuam na home). Com isso, a barra volta a virar menu só abaixo de 64rem e cabe numa linha em 1024px nos 4 idiomas. Substitui o ponto de corte de 72rem da decisão do blog.

## 2026-09-26 · Foto ao fundo do topo e imagem de Open Graph
A foto de perfil (P&B) fica atrás do topo da home: metade direita no desktop (alinhada à borda do conteúdo), largura toda no mobile, com `object-fit: cover`, opacidade por token (`--photo-opacity`: 0.55 no escuro, 0.28 no claro) e textura de linhas de 1px a cada 3px na cor de `--bg` (máscara SVG, sem gradiente). O texto do topo fica sobre faixas sólidas de `--bg` (`box-decoration-break: clone`), que garantem a leitura sem gradiente nem blur. Arquivos WebP 640 e 1086px gerados pelo canvas do Edge, sem ferramenta nova; carregam com `fetchpriority="high"`. `public/og.jpg` (1200×630) usa a mesma linguagem, com texto neutro entre idiomas; `pageMetadata` passa a incluir `og:image` e `twitter:card=summary_large_image` em todas as páginas, com `alt` por idioma (`meta.ogAlt`).

## 2026-09-26 · Foto do topo menor
A foto do topo passou a 40% da largura anterior, em retrato 3:4 sem corte, no canto direito e alinhada ao topo do nome (desktop: `0.4 × min(44rem, 55%)`, cerca de 232×310px em 1400px; mobile: 40% da largura). Continua ao fundo, com a mesma opacidade, textura e faixas de leitura.

## 2026-09-26 · Ajustes da foto do topo
No desktop, a foto fica a 10% da borda direita do conteúdo (fora do canto, sem centralizar). No mobile, o topo usa container query (`container-type: inline-size`) e o nome reserva `40cqw` de altura, para a descrição cobrir só o quarto de baixo da foto. Opacidade no tema claro subiu de 0.28 para 0.7 (`--photo-opacity`), porque a foto quase sumia.

## 2026-09-26 · Ordem da home para recrutadores
Home: topo → stack → projetos → trajetória → agora → contato (antes: projetos → trajetória → stack). A barra segue a mesma ordem: Stack, Projetos, Contato, Blog.

## 2026-09-26 · Sem seção "Agora"
A seção "Agora" saiu da home (componente `Now`, namespace `now` nos 4 idiomas e a seção do `docs/perfil.md`). Home: topo → stack → projetos → trajetória → contato.

## 2026-09-26 · Tema sempre visível na barra
O botão de tema fica na barra também no mobile (nome, idioma, tema, menu) e saiu do painel do menu, que ficou com links e CTA. Cabe em 390px sem rolagem horizontal.

## 2026-09-26 · Seção de reconhecimentos
Nova seção "Reconhecimentos" (04) entre trajetória e contato, com os 3 prêmios do LinkedIn. Mesmo formato de linha do tempo da trajetória (reaproveita `Experience.module.css`): data à esquerda; prêmio · evento, instituição em mono e descrição à direita. Nomes de eventos e instituições ficam no original em todos os idiomas; tipo do prêmio, datas e descrições são traduzidos. Não entra na barra.

## 2026-09-26 · Trajetória mais técnica
Cada experiência mostra: período mês/ano, local e modalidade (coluna da esquerda); cargo como no LinkedIn · empresa; resumo de uma frase; 3 destaques técnicos (`points.p1..p3`, marcador em travessão); stack em mono. Conteúdo tirado do LinkedIn, reescrito curto e técnico; sem métricas inventadas. Intercâmbio em Brisbane (certificado B2) entrou em Formação.

## 2026-09-26 · Trajetória com detalhes recolhidos
A modalidade (presencial/remoto/híbrido) saiu do site; continua só no `docs/perfil.md`. Por padrão cada experiência mostra período, local, cargo · empresa e resumo; destaques e stack ficam num `<details>` "Mais detalhes" (sinal + que vira −, feito com linhas de 1px), aberto só no clique e sem JS.

## 2026-09-26 · Posicionamento Node.js full stack
O Bernardo busca vagas de Node.js. O site passa a se apresentar como "Desenvolvedor Node.js full stack": `<title>`, meta description, `og:image:alt`, papel no topo, `public/og.jpg` (Node.js em destaque na linha de baixo). Stack com Back-end primeiro (Node.js à frente, com filas, cache, JWT/OAuth2). Na Lance! e na Auto Avaliar, o cargo exibido é "Desenvolvedor Node.js Full Stack" (sem o "II", a pedido; o título oficial fica registrado no `docs/perfil.md`), e resumos, destaques e stack começam por Node. "O que entrego" abre com APIs e serviços em Node.js/TypeScript. Nas experiências de infra e LAMP (Auberge, Jerimum, CIM3, IFF), Node não é atribuído.

## 2026-09-29 · Stack da home atualizada
A lista da home passou a ser a enviada pelo Bernardo: dois grupos novos (Dados, Mídia programática) e Confiabilidade renomeada para Confiabilidade e qualidade. Back-end continua primeiro, como em 2026-09-26. Nomes de produto ficam iguais nos quatro idiomas; só as frases soltas são traduzidas.

## 2026-10-02 · Imagens de exemplo ficam
Os wireframes `exemplo-*.svg` permanecem nos artigos até haver captura real. Lance!, Auto Avaliar e VamosMarcar já tinham os três. `/bek.no.lo.ˈʒi.a/` entra com o mesmo conjunto, rotulado BEKNOLOGY. A lista da home e a página de projetos continuam sem miniatura.

## 2026-10-02 · Ícones no contato
A seção de contato não lista e-mail, LinkedIn e GitHub em texto. Ficam os ícones de WhatsApp, LinkedIn, GitHub e Discord. O Discord também entra na fileira do topo e do rodapé. Sem URL, o ícone do Discord leva à home até o link ser preenchido.

## 2026-10-02 · Formulário só com contato legível
O formulário exige assunto (vaga, projeto ou outra), nome (2–80), e-mail e mensagem (20–2000). E-mail de provedor conhecido passa; domínio de empresa passa; caixa temporária (Mailinator, Yopmail e os mais usados) não. Espera de 3 segundos e 3 envios por hora neste navegador (`localStorage`). Links `http` e `www` saem do texto enviado. Sem captcha. A chave pública do Web3Forms e o número no JavaScript continuam fora desse filtro.

## 2026-10-01 · Contato com formulário
A seção de contato ganha um formulário com nome, e-mail e mensagem, abaixo dos links. WhatsApp abre `wa.me/5521973692691` com o texto pronto; o visitante ainda toca em Enviar. E-mail faz POST para o Web3Forms (chave pública em `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, caixa bekno.adm@gmail.com, que não aparece no site). Sem dependência nova e sem rota de API. O componente client só monta o envio; os textos chegam por props.

## 2026-10-02 · Domínio e dados estruturados
O site público é `https://bernardoknoblauch.com`, sem barra final, em `NEXT_PUBLIC_SITE_URL`. Cada página de idioma leva JSON-LD: `Person` e `WebSite` (o `@id` não muda com o idioma); `ProfilePage` na home; `CollectionPage`, `ItemList` e `BreadcrumbList` na página de projetos; `Article`, `WebPage` e `BreadcrumbList` no artigo. Sem data de publicação. `sameAs` só com link real: LinkedIn, GitHub, Discord e o blog do idioma. E-mail fica de fora até existir. A raiz `/` continua `noindex`.

## 2026-10-02 · Web Analytics e Speed Insights
`@vercel/analytics` e `@vercel/speed-insights` no layout de `/pt /en /fr /es`. A raiz `/` não entra, porque só redireciona. Os scripts são os da Vercel (`/_vercel/insights/script.js` e o de Speed Insights) e só enviam dados no site publicado, com os dois produtos ligados no painel. Sem banner: os dois são sem cookie.

## 2026-10-02 · URL pública no código
`https://bernardoknoblauch.com` fica em `src/lib/site.ts`. O build de produção usa essa URL mesmo sem `NEXT_PUBLIC_SITE_URL` na Vercel ou no Cloudflare Pages. A variável, se existir, substitui. Em desenvolvimento, sem a variável, o fallback continua `http://localhost:3000`.

## 2026-10-04 · Favicon "BK"
O favicon vem do monograma "BK" (`Ativo 2.svg`, viewBox quadrado de 1025px com um PNG de 1024px embutido). O SVG não é usado direto porque pesa 270KB. Ele foi rasterizado pelo canvas do Edge, sem ferramenta nova e sem distorcer (saídas quadradas): `src/app/favicon.ico` (PNGs de 16, 32 e 48px dentro do ICO, 4,6KB), `src/app/icon.png` (512px, fundo transparente) e `src/app/apple-icon.png` (180px, fundo branco, porque o iOS troca transparente por preto e o "BK" sumiria). O Next gera as tags `<link rel="icon">` e `apple-touch-icon` em todas as páginas, inclusive na raiz e no 404.

## 2026-10-07 · Home indexável em /
`/` é a home em português que o Google indexa: canonical, hreflang `pt` e `x-default` apontam para ela. `/pt/` continua existindo, com `noindex` e o mesmo canonical, para não competir. O seletor em português liga `/`. O JSON-LD da home é `ProfilePage` com o `Person` dentro de `mainEntity` (nome, cargo, frase visível, foto do topo e perfis reais). Sem seguidores, data ou nota. Rastreador não é redirecionado da raiz. Idioma continua na rota, não em parâmetro.

## 2026-10-07 · Raiz fica em português
`/` renderiza a home em português e não redireciona para `/pt/`. O script da raiz só faz `location.replace` para `/en/`, `/fr/` ou `/es/`, quando a escolha salva ou o idioma do navegador é um desses. Sem escolha e sem idioma conhecido, fica em português. Sem JavaScript não há refresh. `/` continua `noindex`, com canonical em `/pt/`. As rotas `/pt /en /fr /es` não mudam.

## 2026-10-07 · Consentimento antes da medição
O banner segue o do blog (`cookie-consent` no `localStorage`, aceite ou recusa). Vercel Analytics, Speed Insights e GA4 só montam com aceite. Sem `NEXT_PUBLIC_GA_ID` no formato `G-…`, o GA4 não entra. A frase "Site estático, sem rastreamento." saiu do rodapé. No lugar, o selo oficial "Protected by Cloudflare" (`public/cloudflare-badge.png`, sem alteração), com link para cloudflare.com.

## 2026-10-04 · Favicon centralizado
No `Ativo 2.svg` original o disco branco estava em `cx=502.7` (centro do viewBox: 512.74). A cópia usada para gerar os ícones teve o `cx` corrigido para 512.74; o "BK" já estava centrado. Medido no `icon.png`: área opaca de 22 a 489px nos dois eixos, centro em 255,5. O arquivo original em Downloads não foi alterado.
