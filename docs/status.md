# Status

## Etapa atual
5. Página de projetos e artigos por projeto concluídos. Falta conteúdo real (`[PREENCHER]`) e validação visual/Lighthouse num navegador.

## Feito
1. `CLAUDE.md`, `docs/perfil.md`, `docs/status.md`, `docs/decisoes.md`.
2. Estrutura e i18n estático.
3. Direção visual: Schibsted Grotesk + IBM Plex Mono, paleta de cinzas, hover por inversão e sublinhado desenhado.
4. Setup, i18n + redirecionamento da raiz, tema sem flash, seções, SEO (canonical, hreflang, OG, sitemap, robots, 404), README de deploy.
5. Projetos em `content/projects/*.json`, página de projetos com URLs traduzidas, artigo por projeto, home com lista em links, seletor de idioma que mantém a página. Página de projetos com bloco único "O que entrego" e CTA; galeria de imagens em carrossel; barra de navegação fixa com menu mobile e idioma em dropdown.

## Próximos passos
1. Preencher os `[PREENCHER]` em `docs/perfil.md` e depois em `content/projects/*.json`, `messages/*.json` e `src/lib/profile.ts` (e-mail, GitHub).
2. Definir o domínio e configurar `NEXT_PUBLIC_SITE_URL`.
3. Rodar Lighthouse na home, na página de projetos e num artigo, e revisar no navegador (dark/light, teclado, mobile).
4. Opcional: imagem Open Graph.
5. Adicionar favicon (hoje `/favicon.ico` dá 500 no dev).

## Pendências de conteúdo
E-mail, GitHub, domínio, resultados de Lance! e Auto Avaliar, problema de cada projeto, stack e números do VamosMarcar e motivo do envio manual no WhatsApp, BEKNO, resumos de CIM3 e IFF, seção "agora", formato de trabalho e disponibilidade, imagens dos projetos, stack do VamosMarcar e da BEKNO nos JSONs.
