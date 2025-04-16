const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno.js')
const Emprestimo = require('./controllers/emprestimo.js')
const Livro = require('./controllers/livro.js')


routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

routes.post('/aluno', Aluno.create);
routes.get('/aluno', Aluno.read);
routes.get('/aluno/:id', Aluno.readOne);
routes.patch('/aluno/:id', Aluno.update);
routes.delete('/aluno/:id', Aluno.remove);

routes.post('/emprestimo', Emprestimo.create);
routes.get('/emprestimo', Emprestimo.read);
routes.get('/emprestimo/:id', Emprestimo.readOne);
routes.patch('/emprestimo/:id', Emprestimo.update);
routes.delete('/emprestimo/:id', Emprestimo.remove);

routes.post('/livro', Livro.create);
routes.get('/livro', Livro.read);
routes.get('/livro/:id', Livro.readOne);
routes.patch('/livro/:id', Livro.update);
routes.delete('/livro/:id', Livro.remove);
module.exports = routes;