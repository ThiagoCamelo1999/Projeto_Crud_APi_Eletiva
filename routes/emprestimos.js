const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - listar todos os empréstimos
router.get('/', (req, res) => {
    db.all('SELECT * FROM emprestimos', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST - registrar um empréstimo
router.post('/', (req, res) => {
    const { livro_id, aluno_id, data_emprestimo } = req.body;
    db.run('INSERT INTO emprestimos (livro_id, aluno_id, data_emprestimo) VALUES (?, ?, ?)', [livro_id, aluno_id, data_emprestimo], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// PUT - registrar a devolução de um livro
router.put('/:id/devolucao', (req, res) => {
    const { id } = req.params;
    const { data_devolucao } = req.body;
    db.run('UPDATE emprestimos SET data_devolucao = ? WHERE id = ?', [data_devolucao, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ devolvidoID: id });
    });
});

module.exports = router;
