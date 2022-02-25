const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.listen('3000', () => {
    console.log('Server is running on port 3000');
});

//body parser
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //views é o nome da pasta
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index', {
        'nome': 'Michaela',
        'idade': '22',
        'lista': [{'telefone' : '493-487-4817'}, {'telefone' : '596-877-7531'}, {'telefone' : '711-699-7985'}]
    });
})

app.get('/sobre', function(req, res) {
    res.render('sobre', {})
})