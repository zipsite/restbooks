const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
let jsonParser = bodyParser.json();

app.get('/api/book', function (req, res) {
    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    res.send(books);
})

app.get('/api/book/:id', function (req, res) {
    let bookId = req.params.id;
    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let book;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookId) {
            book = books[i];
            break;
        }
    }
    if (book) {
        res.send(book)
    } else {
        res.status(404).send()
    }
});

app.post('/api/book/', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let book = {
	name: req.body.name,
	author: req.body.author,
	year: req.body.year
	};

    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let bookId = 0;
    for (let i = 0; i < books.length; i++) {
        bookId = bookId > books[i].id ? bookId : books[i].id;
    }

    book.id = isFinite(bookId) ? bookId + 1 : 0;

    books.push(book);

    fs.writeFileSync('db.json', JSON.stringify(books));
    res.send(book);
});

app.delete('/api/book/:id', function (req, res) {
    let bookId = req.params.id;
    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let index = -1;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookId) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        let book = books.splice(index, 1)[0];
        fs.writeFileSync('db.json', JSON.stringify(books));
        res.send(book);
    } else {
        res.status(404).send();
    }
});

app.put('/api/book/:id', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let bookId = req.params.id;

    let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let book;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookId) {
            book = books[i];
            break;
        }
    }

    if (book) {
	book.name = req.body.name;
        book.author = req.body.author;
        book.year = req.body.year;

        fs.writeFileSync('db.json', JSON.stringify(books));
        res.send(book);
    }
    else {
        res.status(404).send();
    }
});


app.listen(3000);
