// Roda no <head> antes da primeira pintura: aplica o tema salvo e evita flash.
// Sem tema salvo, o CSS segue prefers-color-scheme.
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
