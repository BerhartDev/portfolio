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

## Blocos

| Tipo | Campos | Uso |
|---|---|---|
| `p` | `text` | parágrafo |
| `h` | `text` | subtítulo dentro da seção |
| `list` | `items` (lista de textos) | lista com marcadores |
| `quote` | `text`, `cite` (opcional) | citação |
| `code` | `code`, `lang` (opcional) | trecho de código |
| `image` | `src`, `alt`, `caption` (opcional) | imagem; arquivo em `public/projects/<slug>/`, `src` começa com `/` |

Os textos são texto puro, sem HTML nem Markdown. Faltou um dado, escreva `[PREENCHER]`.

## Checagens

- `npm run i18n:check`: os 4 idiomas presentes, sem termos proibidos e sem emojis.
- `npm run build`: falha com o arquivo e o campo quando o JSON está fora do formato.
