const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

// Configura o body parser para analisar requisições JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura a sessão
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configura um banco de dados simples em memória para armazenar usuários
const usuarios = {
  'maycon': { senha: 'senha123', nivel: 'diretor' },
  'leo': { senha: 'usuario123', nivel: 'gerente' },
  'tiago': { senha: 'pedragon2024@', nivel: 'vendedor' }
};

// Rota para a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ erro: 'Nome e senha são obrigatórios' });
  }

  const usuario = usuarios[username];
  if (!usuario || usuario.senha !== password) {
    return res.status(401).send({ erro: 'Nome ou senha inválidos' });
  }

  // Login bem-sucedido, armazena o nível do usuário na sessão
  req.session.nivel = usuario.nivel;
  res.redirect('/home');
});

// Middleware para verificar o nível de permissão
function verificarPermissao(req, res, next) {
  if (!req.session.nivel) {
    return res.redirect('/login');
  }
  next();
}

// Rota para obter o nível do usuário
app.get('/api/usuario', verificarPermissao, (req, res) => {
  res.json({ nivel: req.session.nivel });
});

// Rota para a página inicial (redireciona para /home)
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Rota para a página home
app.get('/home', verificarPermissao, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Rota para a página ata.html
app.get('/ata.html', verificarPermissao, (req, res) => {
  if (req.session.nivel === 'diretor' || req.session.nivel === 'gerente') {
    res.sendFile(path.join(__dirname, 'public', 'ata.html'));
  } else {
    res.status(403).send({ erro: 'Acesso negado' });
  }
});

// Rota para as outras páginas do site
app.get('/dashboard/:pagina', verificarPermissao, (req, res) => {
  if (req.session.nivel === 'diretor') {
    res.sendFile(path.join(__dirname, 'public', req.params.pagina));
  } else {
    res.status(403).send({ erro: 'Acesso negado' });
  }
});

// Inicia o servidor
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});
