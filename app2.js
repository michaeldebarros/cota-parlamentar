const express = require('express');
const app = express();
const axios = require('axios');
const url = require('url');


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
    axios.get(`http://localhost:8080/api/${req.params.ano}/${req.params.nome}/${req.params.despesa}`)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(err => console.log(err));
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
