const express = require('express');
const app = express();
const mysql = require('mysql');

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


//Coneção com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

db.connect(function(err) {
    if(err) console.log('Erro na conexão com o banco de dados');
    else console.log('Conexão com o banco de dados estabelecida');
})


app.get('/', function(req, res) {
    let sql = 'SELECT * FROM `clientes`';
    let query = db.query(sql, function(err, results) {
        res.render('index', {lista: results});
    })
})

app.get('/registrar', function(req, res) {
    res.render('cadastro', {});
})

app.post('/registrar', function(req, res) {
    console.log('Cadastro realizado com sucesso');
    let sql = 'INSERT INTO clientes (nome, sobrenome, empresa) VALUES (?,?,?)'
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let empresa = req.body.empresa;
    db.query(sql ,[nome, sobrenome, empresa], (err, results) => {})
    res.render('cadastro', {})
})