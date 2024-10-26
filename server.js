const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // Middleware para tratar JSON

// Rota simples para teste
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Importar as rotas dos módulos
const livrosRoutes = require('./routes/livros');
const alunosRoutes = require('./routes/alunos');
const emprestimosRoutes = require('./routes/emprestimos');

// Usar as rotas
app.use('/livros', livrosRoutes);
app.use('/alunos', alunosRoutes);
app.use('/emprestimos', emprestimosRoutes);

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
