const express = require('express');
const exphbl = require('express-handlebars');
const axios = require('axios');

const app = express();
const hbs = exphbl.create({ extname: 'hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist/'));

app.post('/delete/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    axios.delete(`http://localhost:3000/products/delete/${uuid}`);
    res.status(200).redirect('/itenscadastrados');
});

app.get('/', (req, res) => {
    res.status(200).render('home');
});

app.get('/cadastro', (req, res) => {
    res.status(200).render('cadastro');
});

app.post('/cadastro/send', (req, res) => {
    console.log(req.body);
    const data = req.body;
    axios
        .post('http://localhost:3000/products/create', data)
        .then()
        .catch((err) => console.log(err));
    res.status(200).redirect('/');
});

app.get('/itenscadastrados', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/products/all');
        res.status(200).render('produtos', { produtos: response.data['produtos'] });
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ error: err });
    }
});

app.listen(5000);
