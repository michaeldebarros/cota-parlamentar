const express = require("express");
const app = express();
const fs = require("fs");

const rs = fs.createReadStream("./Ano-2016.json", {
  encoding: "latin1",
  start: 0
});



app.get("/:ano/:deputado/:despesa/:", (req, res) => {});
  let ano = req.params.ano;
  let deputado = req.params.deputado;
  let despesa = req.params.despesa;

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express is seving on port ${process.env.PORT || 3000}`);
});
