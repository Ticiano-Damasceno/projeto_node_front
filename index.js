const express = require('express');
const exphbl = require('express-handlebars');

const app = express();
const hbs = exphbl.create({ extname: 'hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist/'));

app.get('/', (req, res) => {
    res.status(200).render('home');
});

app.get('/cadastro', (req, res) => {
    res.status(200).render('cadastro');
});

app.listen(5000);
