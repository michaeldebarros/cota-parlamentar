const csv = require("fast-csv");
const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Obrigado por usar a API Cota Parlamentar");
});
app.get("/:ano/:numeroCarteiraDeputado/:despesa", (req, res) => {
  let stopSign = null;
  const results = [];
  const ano = req.params.ano;
  const numeroCarteiraDeputado = req.params.numeroCarteiraDeputado;
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
        ,
        ,
        ,
        ,
      ]
    })
    .on("data", data => {
      if (
        data.numeroCarteiraDeputado === numeroCarteiraDeputado &&
        data.tipoDespesa === despesa
      ) {
        results.push(data);
        stopSign = false;
      } else if (stopSign === false) {
        res.json(results);
        stopSign = true //this is really unnecessary
      }
    })
    .on("end", () => {
      //res.json(results);
      console.log("done");
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express is seving on port ${process.env.PORT || 3000}`);
});
