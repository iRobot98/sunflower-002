const k = require("crypto").randomBytes(64).toString("hex");

console.log('\nJWT_SECRET="%s"', k);

const d = new Date();
console.log(d.toDateString(), "\n", d.getTime());
console.log(
    "2023-07-26T10:48:22.085+00:00\n",
    new Date("2023-07-26T10:48:22.085+00:00")
);
