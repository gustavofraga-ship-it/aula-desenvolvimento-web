const express = require('express');
const app = express();

app.use(express.json());

const usuarios = [
  { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
  { id: 2, nome: 'Bruno Souza', email: 'bruno@email.com' }
];

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  const novoUsuario = { id: usuarios.length + 1, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const email = req.body.email;
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
  if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  usuario.nome = nome;
  usuario.email = email;
  res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });
  usuarios.splice(index, 1);
  res.json({ mensagem: 'Usuário removido com sucesso' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});