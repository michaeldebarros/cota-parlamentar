const csv = require('fast-csv');
const fs = require('fs');
const express = require('express');
const app = express();
var secondResult;


app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/build/index.html')
});
app.get('/api/:ano/:nome/:despesa', (req, res, next) => {
	let stopSign = null;
	const results = [];
	const ano = req.params.ano;
	const nome = req.params.nome;
	const despesa = req.params.despesa;
	const stream = fs.createReadStream(`Ano-${ano}.csv`, { start: 0 });

	stream.on('error', () => {
		next(new Error('there was an error'));
	});
	csv
		.fromStream(stream, {
			delimiter: ';',
			headers: [
				'nome',
				,
				'numeroCarteiraDeputado',
				,
				'estado',
				'partido',
				,
				,
				'tipoDespesa',
				,
				'desricaoEspecifica',
				'fornecedor',
				'cnpjFornecedor',
				,
				,
				'data',
				,
				,
				'valor',
				,
				,
				,
				,
				,
				,
				'numeroRestituicao',
				,
				,
				,
			],
		})
		.on('data', data => {
			if (data.nome === nome && data.tipoDespesa === despesa) {
				results.push(data);
				stopSign = false;
			} else if (stopSign === false) {
				res.json(results);
				secondResult = results;
				stopSign = true;
			}
		})
		.on('end', () => {
			if (results.length === 0) res.send('Não há dados para essa requisição.');
		});
});

app.get('/api/second', (req, res) => {
	res.json(secondResult);
});

//Error handler
app.use((err, req, res, next) => {
	if (err) {
		console.log(err);
		res.status(500).send('Internal Error');
	};
});

app.listen(process.env.PORT || 3001, () => {
	console.log(`Express is seving on port ${process.env.PORT || 3001}`);
});
