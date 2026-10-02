# Status

## Etapa atual
5. Página de projetos e artigos por projeto concluídos. Falta conteúdo real (`[PREENCHER]`) e validação visual/Lighthouse num navegador.

## Feito
1. `CLAUDE.md`, `docs/perfil.md`, `docs/status.md`, `docs/decisoes.md`.
2. Estrutura e i18n estático.
3. Direção visual: Schibsted Grotesk + IBM Plex Mono, paleta de cinzas, hover por inversão e sublinhado desenhado.
4. Setup, i18n + redirecionamento da raiz, tema sem flash, seções, SEO (canonical, hreflang, OG, sitemap, robots, JSON-LD, 404), README de deploy. Domínio: `https://bernardoknoblauch.com`.
5. Projetos em `content/projects/*.json`, página de projetos com URLs traduzidas, artigo por projeto, home com lista em links, seletor de idioma que mantém a página. Página de projetos com bloco único "O que entrego" e CTA; galeria de imagens em carrossel; barra de navegação fixa com menu mobile e idioma em dropdown; tema escuro por padrão com botão de ícone; ícones de redes no topo e no rodapé; foto de perfil ao fundo do topo; imagem de Open Graph.
6. Formulário de contato (WhatsApp e e-mail) com assunto obrigatório, validação no navegador, recusa de caixa temporária e 3 envios por hora.
7. Web Analytics e Speed Insights da Vercel no layout dos idiomas (`@vercel/analytics`, `@vercel/speed-insights`).

## Próximos passos
1. Preencher os `[PREENCHER]` em `docs/perfil.md` e depois em `content/projects/*.json`, `messages/*.json` e `src/lib/profile.ts` (e-mail, Instagram, LeetCode, Hack The Box).
2. Rodar Lighthouse na home, na página de projetos e num artigo, e revisar no navegador (dark/light, teclado, mobile).
3. Adicionar favicon (hoje `/favicon.ico` dá 500 no dev).

## Pendências de conteúdo
E-mail, GitHub, resultados de Lance! e Auto Avaliar, problema de cada projeto, stack e números do VamosMarcar e motivo do envio manual no WhatsApp, resumos de CIM3 e IFF, formato de trabalho e disponibilidade, capturas reais no lugar das imagens de exemplo, stack do VamosMarcar no JSON.
