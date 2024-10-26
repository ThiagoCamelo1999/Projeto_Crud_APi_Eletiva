const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Usando banco de dados em memória, pode ser um arquivo também

// Criar tabelas para livros, alunos e empréstimos
db.serialize(() => {
    db.run(`
        CREATE TABLE livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            ano INTEGER
        )
    `);

    db.run(`
        CREATE TABLE alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            matricula TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE emprestimos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            livro_id INTEGER,
            aluno_id INTEGER,
            data_emprestimo DATE NOT NULL,
            data_devolucao DATE,
            FOREIGN KEY(livro_id) REFERENCES livros(id),
            FOREIGN KEY(aluno_id) REFERENCES alunos(id)
        )
    `);
});

module.exports = db;
