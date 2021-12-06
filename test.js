const MD5 = require("crypto-js/md5");

const senha = "bolaAzul";
const senhaCriptografada = MD5(senha);
console.log(senha, senhaCriptografada)