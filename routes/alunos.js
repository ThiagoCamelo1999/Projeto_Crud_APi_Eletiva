const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - listar todos os alunos
router.get('/', (req, res) => {
    db.all('SELECT * FROM alunos', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST - adicionar um novo aluno
router.post('/', (req, res) => {
    const { nome, matricula } = req.body;
    db.run('INSERT INTO alunos (nome, matricula) VALUES (?, ?)', [nome, matricula], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// PUT - atualizar um aluno
router.put('/:id', (req, res) => {
    const { nome, matricula } = req.body;
    const { id } = req.params;
    db.run('UPDATE alunos SET nome = ?, matricula = ? WHERE id = ?', [nome, matricula, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: id });
    });
});

// DELETE - deletar um aluno
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM alunos WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deletedID: id });
    });
});

module.exports = router;
