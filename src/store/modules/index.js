/**
 * Este arquivo importa todos os vuex modules no diretorio
 */

const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  // Ignora este proprio arquivo
  if (key === "./index.js") return;

  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default modules;
