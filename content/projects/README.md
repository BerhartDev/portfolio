# Projetos

Um arquivo por projeto. O nome do arquivo é o slug da URL: `lance.json` → `/pt/projetos/lance/`, `/en/projects/lance/`, `/fr/projets/lance/`, `/es/proyectos/lance/`.

Para adicionar um projeto, crie um arquivo novo. Para tirar um projeto do site, apague o arquivo.

## Formato

```jsonc
{
  "order": 1,                         // posição nas listas (menor primeiro)
  "period": "2025–",                  // opcional, igual em todos os idiomas
  "stack": ["Next.js", "AWS"],        // opcional
  "links": [{ "url": "https://…" }],  // opcional
  "images": [ /* galeria, ver abaixo */ ],  // opcional
  "pt": {
    "title": "Lance!",
    "tag": "Full-Stack II · 2025–atual",
    "summary": "Uma frase. Aparece nas listas, na meta description e no Open Graph.",
    "sections": {
      "context": [ /* blocos */ ],
      "problem": [ /* blocos */ ],
      "work":    [ /* blocos */ ],
      "result":  [ /* blocos */ ]
    }
  },
  "en": { … }, "fr": { … }, "es": { … }
}
```

Os 4 idiomas e as 4 seções são obrigatórios. Cada seção precisa de pelo menos um bloco.

## Imagens (galeria)

Coloque os arquivos em `public/projects/<slug>/` e liste em `images`. Elas aparecem numa seção "Imagens" no topo do artigo, na ordem da lista; a primeira ocupa a largura toda. Sem imagens, a seção não aparece.

```jsonc
"images": [
  {
    "src": "/projects/lance/home.png",
    "width": 1600,
    "height": 1000,
    "alt": { "pt": "…", "en": "…", "fr": "…", "es": "…" },
    "caption": { "pt": "…", "en": "…", "fr": "…", "es": "…" }  // opcional
  }
]
```

`src`, `width`, `height` (em pixels, do arquivo real) e `alt` nos 4 idiomas são obrigatórios. O `alt` descreve o que a imagem mostra, para quem não a vê.

## Blocos

| Tipo | Campos | Uso |
|---|---|---|
| `p` | `text` | parágrafo |
| `h` | `text` | subtítulo dentro da seção |
| `list` | `items` (lista de textos) | lista com marcadores |
| `quote` | `text`, `cite` (opcional) | citação |
| `code` | `code`, `lang` (opcional) | trecho de código |
| `image` | `src`, `alt`, `caption`, `width`, `height` (os três últimos opcionais) | imagem; arquivo em `public/projects/<slug>/`, `src` começa com `/`. Informe `width` e `height` em pixels para a página não pular ao carregar |

Os textos são texto puro, sem HTML nem Markdown. Faltou um dado, escreva `[PREENCHER]`.

## Checagens

- `npm run i18n:check`: os 4 idiomas presentes, sem termos proibidos e sem emojis.
- `npm run build`: falha com o arquivo e o campo quando o JSON está fora do formato.
