const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - listar todos os livros
router.get('/', (req, res) => {
    db.all('SELECT * FROM livros', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST - adicionar um novo livro
router.post('/', (req, res) => {
    const { titulo, autor, ano } = req.body;
    db.run('INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)', [titulo, autor, ano], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// PUT - atualizar um livro
router.put('/:id', (req, res) => {
    const { titulo, autor, ano } = req.body;
    const { id } = req.params;
    db.run('UPDATE livros SET titulo = ?, autor = ?, ano = ? WHERE id = ?', [titulo, autor, ano, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: id });
    });
});

// DELETE - deletar um livro
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM livros WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deletedID: id });
    });
});

module.exports = router;
