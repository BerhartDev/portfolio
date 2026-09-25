// Verifica os arquivos de messages/: mesmas chaves nos 4 idiomas, termos proibidos e emojis.
// Sai com código 1 se houver erro. [PREENCHER] é contado, mas não falha.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["pt", "en", "fr", "es"];
const DIR = join(import.meta.dirname, "..", "messages");

const FORBIDDEN = [
  /apaixonad/i, /apasionad/i, /passionn/i, /passionate/i,
  /entusiast/i, /enthousiast/i, /enthusias/i,
  /solu[çc][õo]es inovadoras/i, /soluciones innovadoras/i, /solutions innovantes/i, /innovative solutions/i,
  /transformar ideias em realidade/i, /transformar ideas en realidad/i, /transformer (des|vos) id[ée]es/i, /(turn|turning|transform) ideas into reality/i,
  /cutting[- ]edge/i, /seamless/i, /\bleverag/i,
  /algo incr[ií]vel/i, /algo incre[ií]ble/i, /something amazing/i, /quelque chose d['’]incroyable/i,
  /ol[áa], eu sou/i, /hola, soy/i, /\bhi, i['’]m\b/i, /bonjour, je suis/i,
];
const EMOJI = /\p{Extended_Pictographic}/u;

function flatten(obj, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") Object.assign(out, flatten(value, path));
    else out[path] = String(value);
  }
  return out;
}

const errors = [];
let placeholders = 0;
const byLocale = Object.fromEntries(
  LOCALES.map((l) => [l, flatten(JSON.parse(readFileSync(join(DIR, `${l}.json`), "utf8")))]),
);

const allKeys = new Set(LOCALES.flatMap((l) => Object.keys(byLocale[l])));
for (const key of allKeys) {
  const missing = LOCALES.filter((l) => !(key in byLocale[l]));
  if (missing.length) errors.push(`chave "${key}" ausente em: ${missing.join(", ")}`);
}

for (const locale of LOCALES) {
  for (const [key, text] of Object.entries(byLocale[locale])) {
    if (!text.trim()) errors.push(`${locale}: "${key}" vazio`);
    if (EMOJI.test(text)) errors.push(`${locale}: "${key}" contém emoji`);
    for (const re of FORBIDDEN) if (re.test(text)) errors.push(`${locale}: "${key}" contém termo proibido (${re.source})`);
    if (text.includes("[PREENCHER]")) placeholders++;
  }
}

console.log(`${allKeys.size} chaves × ${LOCALES.length} idiomas · ${placeholders} [PREENCHER]`);
if (errors.length) {
  console.error(errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("i18n ok");
