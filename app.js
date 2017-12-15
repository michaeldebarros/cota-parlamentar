const csv = require("fast-csv");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Obrigado por usar a API Cota Parlamentar");
});
app.get("/:ano/:nome/:despesa", (req, res) => {
  let stopSign = null;
  const results = [];
  const ano = req.params.ano;
  const nome = req.params.nome;
  const despesa = req.params.despesa;
  const stream = fs.createReadStream(`Ano-${ano}.csv`, { start: 0 });

  csv
    .fromStream(stream, {
      delimiter: ";",
      headers: [
        "nome",
        ,
        "numeroCarteiraDeputado",
        ,
        "estado",
        "partido",
        ,
        ,
        "tipoDespesa",
        ,
        "desricaoEspecifica",
        "fornecedor",
        "cnpjFornecedor",
        ,
        ,
        "data",
        ,
        ,
        "valor",
        ,
        ,
        ,
        ,
        ,
        ,
        "numeroRestituicao",
        ,
        ,
        ,
      ]
    })
    .on("data", data => {
      if (data.nome === nome && data.tipoDespesa === despesa) {
        results.push(data);
        stopSign = false;
      } else if (stopSign === false) {
        res.json(results);
        stopSign = true;
      }
    })
    .on("end", () => {
      if (results.length === 0) res.send("No data found.");
    });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Express is seving on port ${process.env.PORT || 3001}`);
});
