const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();
const pdfDirectory = path.join(__dirname, 'pdfs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const usuarios = {
  'diretor': {senha: 'diretor', nivel: 'diretor'},
  'maycon': { senha: 'Pedr@gon2024', nivel: 'diretor' },
  'leo.coelho': { senha: 'pedragon@2024', nivel: 'diretor' },
  'tiago.vilaca': { senha: 'pedragon2024@', nivel: 'diretor' },
  'vendedor': {senha: 'vendedor', nivel: 'vendedor'},
  'gerente': {senha: 'gerente', nivel: 'gerente'}
};

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ erro: 'Nome e senha são obrigatórios' });
  }

  const usuario = usuarios[username];
  if (!usuario || usuario.senha !== password) {
    return res.status(401).send({ erro: 'Nome ou senha inválidos' });
  }

  req.session.nivel = usuario.nivel;
  res.redirect('/home');
});

// O restante do código permanece o mesmo...

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});
