const crypto = require("crypto-js");

var hash = String(crypto.SHA1("asd"));
console.log(hash);
var hash = String(crypto.SHA3("asd"));
console.log(hash);

var hash = String(crypto.SHA256("asd123"));
console.log(hash);

var hash = String(crypto.SHA224("asd"));
console.log(hash);
