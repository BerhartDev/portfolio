# Linha do tempo

Registro de cada pedido e do que foi feito. Entradas novas no topo. Entradas antigas não são editadas; correções entram como nova entrada.

Formato:

```
## AAAA-MM-DD · Título curto
- Pedido: o que foi pedido.
- Feito: o que mudou (arquivos, commits).
- Pendente: o que ficou para depois, se houver.
```

## 2026-10-04 · Favicon "BK"
- Pedido: usar `Ativo 2.svg` como favicon sem quebrar a proporção.
- Feito: o SVG (monograma "BK" sobre disco branco, quadrado) foi rasterizado pelo canvas do Edge em tamanhos quadrados: `src/app/favicon.ico` (16, 32 e 48px), `src/app/icon.png` (512px) e `src/app/apple-icon.png` (180px, fundo branco por causa do iOS). O Next gera as tags no `<head>` da home, da raiz `/` e do 404, conferido no `out/`. Fecha a pendência do erro em `/favicon.ico`. `docs/status.md` e `docs/decisoes.md` atualizados.

## 2026-10-02 · Verificação no navegador travou
- Pedido: a checagem no navegador demorou demais.
- Feito: parei essa checagem. O código já estava pronto: `<Analytics />` e `<SpeedInsights />` no layout de idioma. `typecheck`, `lint` e `build` tinham passado. Sem mudança de código.
- Pendente: ativar os dois no painel da Vercel e publicar.

## 2026-10-02 · Web Analytics e Speed Insights
- Pedido: adicionar o Speed Insights da foto e o Web Analytics.
- Feito: `@vercel/analytics` e `@vercel/speed-insights` no layout de idioma. README, `docs/status.md` e `docs/decisoes.md` atualizados. Sem commit.
- Pendente: ativar os dois no painel da Vercel e publicar. Sem isso o painel continua vazio.

## 2026-10-02 · Speed Insights da Vercel
- Pedido: se o passo do painel da Vercel (pacote `@vercel/speed-insights` e componente `<SpeedInsights />`) já está no portfólio.
- Feito: conferido `package.json` e o código. Não está instalado nem importado. Sem mudança de código.
- Pendente: nada.

## 2026-10-02 · O que falta para o domínio
- Pedido: se ainda falta alguma coisa para o site usar bernardoknoblauch.com.
- Feito: explicado que o código já grava essa URL no build. O que falta é o domínio ligado no provedor e um deploy com esse código. Sem mudança de código.
- Pendente: apontar o DNS e publicar.

## 2026-10-02 · URL pública sem variável no provedor
- Pedido: corrigir a pendência de definir `NEXT_PUBLIC_SITE_URL` na Vercel ou no Cloudflare Pages para o deploy publicar em bernardoknoblauch.com.
- Feito: `src/lib/site.ts` usa `https://bernardoknoblauch.com` no build de produção quando a variável não existe. O build deixa de falhar por URL ausente. README, `docs/status.md` e `docs/decisoes.md` atualizados. Sem commit.
- Pendente: nada.

## 2026-10-02 · SEO e domínio bernardoknoblauch.com
- Pedido: preparar metadados e dados estruturados para o Google indexar o portfólio. URL nova: bernardoknoblauch.com.
- Feito: `NEXT_PUBLIC_SITE_URL=https://bernardoknoblauch.com` em `.env.example` e `.env.local`. Metadados de página com autor e robots (`max-image-preview:large`). JSON-LD em `src/lib/jsonld.ts` e `src/components/JsonLd.tsx`, ligado no layout de idioma, na home, na página de projetos e no artigo. README, `docs/status.md` e `docs/decisoes.md` atualizados. Sem commit.
- Pendente: definir a mesma variável no provedor e apontar o DNS. Sem isso o deploy não publica esse domínio.

## 2026-10-02 · Endereço de volta na landing
- Pedido: manter o endereço Ipanema, RJ.
- Feito: local voltou ao contato da `bekno-landing-page`, nos três idiomas. O e-mail pessoal continua fora. Sem commit.
- Pendente: nada.

## 2026-10-02 · Contato da landing sem dados pessoais
- Pedido: empresa opcional; opção Outros; tirar o e-mail da foto e outras menções que não são dados profissionais.
- Feito: empresa deixa de ser obrigatória; serviço `other` (Outros / Other / Autre). Saíram `bernardoknob@gmail.com` e Ipanema do contato e do rodapé. Ficou o telefone. Arquivos em `bekno-landing-page`. Sem commit.
- Pendente: nada.

## 2026-10-02 · Telefone da landing da BEKNO
- Pedido: atualizar o número para +5521973692691.
- Feito: telefone nos três idiomas e WhatsApp do formulário em `bekno-landing-page`. Sem commit.
- Pendente: nada.

## 2026-10-02 · Chave do Web3Forms da BEKNO
- Pedido: usar a access key `d6c386a3-ef43-4334-acc5-9a70122c4630` na landing da BEKNO.
- Feito: troca em `.env.local` e nos workflows `.github/workflows/{deploy,ci,nextjs}.yml` de `bekno-landing-page`. A chave do portfólio não mudou. Sem commit.
- Pendente: nada.

## 2026-10-02 · Formulário na landing da BEKNO
- Pedido: aplicar o mesmo formulário de contato na `bekno-landing-page`, com as regras e os dois botões, mantendo empresa e serviço.
- Feito: `src/lib/contact.ts` e `src/components/ContactForm.tsx` na landing. Textos em `src/locales/{pt,en,fr}.json`. Formspree saiu. WhatsApp no número já publicado (`5522988071682`). E-mail via Web3Forms; a chave entrou em `.env.local` e nos workflows `.github/workflows/{deploy,ci,nextjs}.yml`. Sem commit e sem push.
- Pendente: a caixa que recebe o e-mail continua a do portfólio (`bekno.adm@gmail.com`), não o endereço escrito na página.

## 2026-10-02 · Manter imagens de exemplo
- Pedido: manter as imagens de exemplo por enquanto.
- Feito: as de Lance!, Auto Avaliar e VamosMarcar ficam. `/bek.no.lo.ˈʒi.a/` ganhou os três wireframes em `public/projects/beknologia/` e em `images` de `content/projects/beknologia.json`. `docs/decisoes.md`, `docs/status.md`. Sem commit.
- Pendente: trocar por capturas reais quando existirem.

## 2026-10-02 · Problema do blog para quem escreve
- Pedido: o problema do blog é uma solução fácil para redatores e editores, cobrindo publicação, analytics, autenticação e o que vai nesse sentido; evitar texto repetido.
- Feito: problema reescrito nos 4 idiomas em `content/projects/beknologia.json`. Resumo, contexto e resultado deixam de repetir cache, ISR e a data das fases. `docs/perfil.md`. Sem commit.
- Pendente: nada desta tarefa.

## 2026-10-02 · Por que os projetos estão sem imagem de exemplo
- Pedido: por que os projetos estão sem imagem de exemplo.
- Feito: nada no site. A lista da home e de `/projetos/` é só texto. Lance!, Auto Avaliar e VamosMarcar têm 3 wireframes no artigo. `/bek.no.lo.ˈʒi.a/` foi criado com `images` vazio, então a seção não aparece.
- Pendente: imagens reais, e as de exemplo do blog, se forem pedidas.

## 2026-10-02 · Jira fica para depois
- Pedido: deixar a parte do Jira para depois.
- Feito: nada no site. O card da tradução automática não será aberto nesta sessão.
- Pendente: conectar o Jira e criar o card.

## 2026-10-02 · Data e defeitos fora do texto do blog
- Pedido: não colocar a data em que o blog foi feito nem defeitos (exemplo: “a tradução não é automática”); criar um card desse problema no Jira e dizer como conectar.
- Feito: saíram o parágrafo de julho de 2026, o campo `period` e a frase de que a tradução não é automática, nos 4 idiomas, em `content/projects/beknologia.json`. A versão por locale no CMS ficou. `docs/perfil.md` sem a data e sem “não máquina”.
- Pendente: o card no Jira. Não há conector Atlassian nesta sessão; o card espera a conexão.

## 2026-10-02 · Texto do blog a partir dos docs
- Pedido: a descrição não é “4 idiomas”, é multilíngue; ler os docs em `~/Github/blog-beknologia` e trazer mais informação para a home e para a página do projeto.
- Feito: resumo e artigo em `content/projects/beknologia.json` (4 idiomas) com o que está na spec e nos ADRs: i18n por campo, páginas, `proxy.ts`, `generateStaticParams`, Theme Settings, premium sem backfill, papel padrão na sessão, `notFound()` 200. `docs/perfil.md`. Sem commit. Sem recolocar a hospedagem no Railway.
- Pendente: nada desta tarefa.

## 2026-10-02 · Projetos: BEKNO e nome do blog
- Pedido: tirar o BEKNO; trocar Beknologia por `/bek.no.lo.ˈʒi.a/` e adaptar os outros idiomas (en beknology, fr beknologie, es também); tirar a hospedagem no Railway.
- Feito: apagado `content/projects/bekno.json` e as imagens de exemplo. Título e menções no artigo em `beknologia.json`. Espanhol ficou `beknología`. Saíram stack, link, seção de deploy e a linha “no ar em”. O texto “O que entrego” deixa de citar a BEKNO. `docs/perfil.md`, `docs/status.md`. Sem commit.
- Pendente: o link “Blog” da barra continua em `beknologia.up.railway.app`, porque é o endereço do site.

## 2026-10-02 · Link do Discord
- Pedido: usar o ID `1497263395781742663`.
- Feito: `profile.discord` em `src/lib/profile.ts` e `docs/perfil.md`. O ícone do topo, do contato e do rodapé aponta para `https://discord.com/users/1497263395781742663`. Sem commit.
- Pendente: nada desta tarefa.

## 2026-10-02 · URL do Discord
- Pedido: como fica a URL do perfil, com o nome de usuário `berh4rt`.
- Feito: nenhuma alteração no site. O Discord não monta o link com o nome de usuário; o formato é `https://discord.com/users/` mais o ID numérico.
- Pendente: o ID numérico, para trocar o ícone que hoje leva à home.

## 2026-10-02 · Ícones no contato
- Pedido: tirar a lista em texto e deixar ícones de WhatsApp, LinkedIn, GitHub e Discord; incluir o Discord também na primeira seção.
- Feito: `Contact.tsx` usa `SocialLinks` com `CONTACT_NETWORKS`. Discord no topo e no rodapé (`SOCIAL_NETWORKS`). Ícones do Simple Icons. URL do Discord continua `[PREENCHER]` e o ícone leva à home. `docs/perfil.md`, `docs/decisoes.md`, `docs/status.md`. Sem commit.
- Pendente: URL do Discord.

## 2026-10-02 · Texto do contato
- Pedido: tirar o parágrafo de regras acima dos links. Avisar só se o envio não passar, em texto pequeno sob o campo.
- Feito: removido `contact.lead` nos 4 idiomas e o parágrafo em `Contact.tsx`. Os avisos de campo continuam no `.hint`. Sem commit.
- Pendente: nada desta tarefa.

## 2026-10-02 · Filtro do formulário de contato
- Pedido: receber só contatos legítimos, com dados para responder, no que cabe num site estático.
- Feito: assunto obrigatório; validação de nome, e-mail e mensagem; recusa de caixa temporária; espera de 3 segundos; 3 envios por hora no `localStorage`; links `http`/`www` retirados do texto. Avisos nos 4 idiomas. `src/lib/contact.ts`, `ContactForm.tsx`, `messages/*.json`, `docs/perfil.md`, `docs/decisoes.md`. Sem commit.
- Pendente: Worker na Cloudflare para esconder a access key e limitar por IP.

## 2026-10-01 · Formulário de contato
- Pedido: formulário funcional que manda os dados para o WhatsApp com a mensagem pronta, e também por e-mail gratuito.
- Feito: `ContactForm` na seção de contato (home, projetos e artigos). WhatsApp `5521973692691` via `wa.me`. E-mail via Web3Forms, chave em `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (`.env.example` e README). Textos nos 4 idiomas. `docs/perfil.md`, `docs/decisoes.md`, `CLAUDE.md`. Sem commit.
- Pendente: definir `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` no deploy; e-mail público continua `[PREENCHER]`.

## 2026-09-29 · Servidor de desenvolvimento no ar
- Pedido: rodar o projeto.
- Feito: `npm run dev` em http://localhost:3000.
- Pendente: nada desta tarefa.

## 2026-09-29 · Descrição do topo
- Pedido: trocar a descrição pelo texto sobre sistemas no ar, redes antes de programar, o portal do Lance! e o deploy que ninguém nota.
- Feito: `hero.role`, `hero.lead` e `hero.sub` em `messages/{pt,en,fr,es}.json`; `meta.description` com o primeiro parágrafo; `docs/perfil.md`. Sem commit.
- Pendente: nada desta tarefa.

## 2026-09-29 · Servidor de desenvolvimento parado
- Pedido: derrubar o projeto.
- Feito: encerrado o `next dev` que estava na porta 3000. A porta ficou livre.
- Pendente: nada desta tarefa.

## 2026-09-29 · Stack da home
- Pedido: atualizar a stack com a lista nova (front, back, dados, infra, confiabilidade e qualidade, segurança, mídia programática).
- Feito: `messages/{pt,en,fr,es}.json`, `STACK_GROUPS` em `src/lib/profile.ts` (grupos `data` e `media`), coluna do rótulo em `Stack.module.css` de 13rem para 16rem, `docs/perfil.md` e `docs/decisoes.md`. Back-end continua primeiro. Sem commit.
- Pendente: nada desta tarefa.

## 2026-09-26 · Lista de projetos quebrando no desktop
- Pedido: a lista de projetos da home quebrava no desktop (print: nomes longos por cima do resumo, resumo espremido).
- Causa: no grid desktop do `ProjectList`, a coluna da etiqueta era `auto` e crescia com etiquetas longas, e a do nome tinha mínimo fixo de 9rem, menor que "VamosMarcar" e "Beknologia".
- Feito: `ProjectList.module.css` com colunas `2.5rem minmax(min-content, 16rem) minmax(0, 1fr) 1.5rem`; resumo, etiqueta e meta empilhados na coluna larga; nome nunca quebra no meio no desktop. Conferido no Edge: home em 1040 e 800px, página de projetos em 1400px (fr), sem rolagem horizontal.

## 2026-09-26 · Estudo de caso do Beknologia
- Pedido: fazer o mesmo que no VamosMarcar para o repositório `blog-beknologia`; remover os outros projetos. No meio do trabalho, o pedido mudou: não remover os outros.
- Feito: lidos README, `CLAUDE.md`, `docs/TASKS.md`, spec de arquitetura e ADRs do blog (repositório só lido). Novo `content/projects/beknologia.json` nos 4 idiomas (Next.js 16 + Strapi 5 em Node.js, cache Redis com os dois bugs de falha real corrigidos, Firebase Auth, SEO por locale, Railway, próximos passos), sem imagens. A remoção de Lance!, Auto Avaliar e BEKNO chegou a ser feita e foi desfeita antes do commit; ordem final: Lance!, Auto Avaliar, VamosMarcar, Beknologia, BEKNO. `docs/perfil.md` com a seção do Beknologia.
- Pendente: imagens do Beknologia; números de uso.

## 2026-09-26 · Estudo de caso do VamosMarcar
- Pedido: ler o projeto VamosMarcar (repositório `sweeney`) e preencher a página dele; imagens ficam para depois.
- Feito: lidos README, `docs/` (visão geral, backend, banco, fluxo de booking, funcionalidades, comunicação, deploy), manifests e trechos do código (slots, transação de booking, auth). `content/projects/vamosmarcar.json` reescrito nos 4 idiomas: tag, resumo, período `2026–`, stack e as 4 seções (arquitetura, agendamento, segurança/operação, motivo do WhatsApp manual, resultado, próximos passos). Números só do que o repo comprova (111 commits, 11 módulos, 55 rotas, 8 modelos, 12 migrações); uso real `[PREENCHER]`; ausência de testes dita como próximo passo. Imagens não alteradas. `docs/perfil.md` atualizado.
- Pendente: imagens reais; número de negócios ativos e agendamentos.

## 2026-09-26 · Posicionamento Node.js full stack
- Pedido: trocar "Desenvolvedor Full-Stack II" por algo com Node no nome e ligar o site todo a Node, porque o foco são vagas de Node.
- Escolhas: cargo "Desenvolvedor Node.js Full Stack", sem o "II". Node só onde foi real (Lance!, Auto Avaliar).
- Feito: `messages/*.json` (meta title/description/ogAlt, `hero.role`, back-end da stack, pitch e item "APIs e serviços em Node.js" no "O que entrego", descrição da página de projetos, cargo/resumo/destaques/stack de Lance! e Auto Avaliar); `STACK_GROUPS` com back-end primeiro; `OFFERS` com `api`; tags e stack em `content/projects/{lance,autoavaliar}.json`; `public/og.jpg` regenerado com "Node.js" em destaque; `docs/perfil.md` com o foco e o título oficial. Conferido no Edge (topo e stack) e no `<title>` gerado.

## 2026-09-26 · Trajetória sem modalidade e com detalhes no clique
- Pedido: remover se é remoto ou presencial; mostrar mais informações só se a pessoa clicar.
- Feito: `mode` removido de `Experience.tsx` e dos 4 `messages/*.json`; destaques e stack dentro de `<details>` com o rótulo `experience.more` ("Mais detalhes", "More details", "Plus de détails", "Más detalles"). Conferido no Edge: 6 blocos recolhidos, o clique abre; sem rolagem horizontal em 500px.

## 2026-09-26 · Trajetória mais técnica
- Pedido: melhorar a trajetória com base nos prints do LinkedIn; textos curtos, técnicos e precisos (com permissão para inventar um pouco).
- Feito: nada inventado além de reescrever; o LinkedIn já tinha detalhe técnico suficiente, e métricas continuam `[PREENCHER]`. `messages/*.json`: cargos do LinkedIn, período mês/ano, `mode` (presencial/remoto/híbrido), resumo, `points` (3 por experiência) e `stack` por idioma; educação `ihb` (intercâmbio em Brisbane, B2). `Experience.tsx` e CSS com destaques e stack; `EDUCATION` com `ihb`; `docs/perfil.md` reescrito com os dados do LinkedIn. Conferido no Edge em 1400px (pt) e 500px (fr).

## 2026-09-26 · Seção de reconhecimentos
- Pedido: adicionar a seção "Reconhecimentos e prêmios" do LinkedIn (print com 3 itens).
- Feito: `src/components/Awards.tsx` + `Awards.module.css`, `AWARDS` em `profile.ts`, seção 04 na home (Contato vira 05); namespace `awards` nos 4 idiomas; seção no `docs/perfil.md`; estrutura no `CLAUDE.md`. Conferido no Edge em 1400 e 500px.

## 2026-09-26 · Locais na trajetória
- Pedido: adicionar os locais na trajetória: Lance! no Rio de Janeiro, Auberge já tinha, Auto Avaliar em São Paulo, o resto no Rio de Janeiro.
- Feito: campo novo `experience.items.<empresa>.place` nos 4 idiomas (país traduzido: Brasil/Brazil/Brésil/Brasil, "Río de Janeiro" em espanhol); o local que estava dentro de `when` na Auberge passou para `place`; `Experience.tsx` mostra o local numa linha própria abaixo do período, sem quebrar no meio; tabela de experiência do `docs/perfil.md` preenchida. Conferido no Edge em 1400 e 500px.

## 2026-09-26 · Tema visível na barra mobile
- Pedido: manter o botão de tema visível também na nav mobile.
- Feito: `ThemeToggle` fora do wrapper `desktopOnly` no `SiteHeader` e removido do painel do menu. Medido no Edge em 390px: um botão de tema visível, sem rolagem horizontal; no desktop continua um só.

## 2026-09-26 · CTA "Meu trabalho" no topo
- Pedido: CTA abaixo das redes sociais para ver todos os projetos; depois, trocar o texto para "Meu trabalho".
- Feito: link em `Hero.tsx` para a página de projetos do idioma atual, estilo de botão com borda de 1px sobre `--bg` (legível sobre a foto), inversão no hover e seta que anda; `hero.cta` nos 4 idiomas ("Meu trabalho", "My work", "Mon travail", "Mi trabajo"). No caminho, o CSS do CTA tinha entrado no meio da lista de seletores `.name, .role, .lead, .sub` e estilizou o nome como botão; corrigido antes do commit. Conferido no Edge em 1400 e 500px.

## 2026-09-26 · Seção "Agora" removida
- Pedido: remover a parte "Agora".
- Feito: `src/components/Now.tsx` e `Now.module.css` apagados; `page.tsx` sem a seção (Contato vira 04); namespace `now` removido dos 4 `messages/*.json`; seção "Agora" tirada de `docs/perfil.md`, da estrutura no `CLAUDE.md` e das pendências do `docs/status.md`.

## 2026-09-26 · Ordem da home para recrutadores
- Pedido: reordenar para recrutadores: 1 Stack, 2 Projetos, 3 Experiência.
- Feito: `src/app/[locale]/page.tsx` com Stack (01), Projetos (02), Trajetória (03), Agora (04), Contato (05); barra na ordem Stack, Projetos, Contato, Blog; estrutura do site no `CLAUDE.md` e decisão atualizadas.

## 2026-09-26 · Posição da foto, descrição no mobile e tema claro
- Pedido: deslocar a foto um pouco para a esquerda sem centralizar; no mobile, descer a descrição para não tampar a foto; no tema claro a foto quase não aparecia.
- Feito: `.photo` com `right: 10%` no desktop; `.hero` com `container-type: inline-size` e `.name` com `min-height: calc(40cqw - var(--space-6))` abaixo de 60rem; `--photo-opacity` do claro de 0.28 para 0.7. Conferido no Edge: 1400px nos dois temas; 500px e 390px com o rosto visível e a descrição cobrindo só a parte de baixo da foto.

## 2026-09-26 · Foto do topo 60% menor
- Pedido: reduzir o tamanho da imagem em 60%.
- Feito: interpretado como o tamanho exibido no topo. `.photo` em `Hero.module.css` passou a 40% da largura anterior com `aspect-ratio: 3/4`, no canto direito, alinhada ao topo do nome; `sizes` do `<img>` ajustado. Medido no Edge: 232×310px em 1400px; sem rolagem horizontal em 500px. A imagem de Open Graph não mudou.

## 2026-09-26 · Foto de perfil e imagem de compartilhamento
- Pedido: adicionar a foto de perfil (com dicas); depois, deixá-la atrás do topo, sem muito destaque, com nome e descrição por cima sobre um fundo que não prejudique a leitura, de um jeito diferente; usar a foto também no Open Graph.
- Dicas dadas: a foto P&B com fundo escuro combina com a paleta; a nitidez da pele fica forte em tamanho grande, então a exibição é contida e com textura; no tema claro vira bloco escuro, então a opacidade é menor.
- Feito: `public/profile/bernardo-{640,1086}.webp` (30KB e 77KB); `Hero` com a foto ao fundo, textura de linhas de 1px e faixas sólidas atrás do texto; token `--photo-opacity`; `hero.photoAlt` e `meta.ogAlt` nos 4 idiomas; `public/og.jpg` 1200×630 (70KB); `pageMetadata` com `og:image` e `summary_large_image`. Conferido no Edge em 1400, 1024 e 500px nos dois temas, sem rolagem horizontal.

## 2026-09-26 · Barra enxuta para caber em 1024px
- Pedido: tirar Agora e Trajetória da navbar para funcionar em 1024px.
- Feito: `SECTIONS` do `SiteHeader` reduzido a projetos, stack e contato (mais Blog); também sai do menu mobile. Ponto de corte do menu de volta a 64rem. Medido no Edge em 1024px: links numa linha em pt, en, fr e es; em 1000px aparece o botão de menu.

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
