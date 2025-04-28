const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

app.get('/', (req, res) => {
    res.send("Welcome to API Building");
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {  // <-- fixed here
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));  // <-- fixed here
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
