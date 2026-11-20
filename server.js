const express = require("express");

const app = express();
const PORT = 3000;

// express.json() lets the server read JSON data from request bodies.
app.use(express.json());

// Books are stored in this array while the server is running.
let books = [];
let nextId = 1;

// Check that all required book data is present and valid.
function isValidBookData(title, author, year) {
  return (
    typeof title === "string" &&
    title.trim() !== "" &&
    typeof author === "string" &&
    author.trim() !== "" &&
    typeof year === "number" &&
    Number.isFinite(year)
  );
}

// POST /api/books - Add a new book.
app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;

  if (!isValidBookData(title, author, year)) {
    return res.status(400).json({
      error: "Title, author, and year are required. Year must be a number."
    });
  }

  const cleanTitle = title.trim();
  const cleanAuthor = author.trim();

  // Titles are compared without considering upper/lower case.
  const titleAlreadyExists = books.some(
    (book) => book.title.toLowerCase() === cleanTitle.toLowerCase()
  );

  if (titleAlreadyExists) {
    return res.status(409).json({
      error: "A book with this title already exists."
    });
  }

  const newBook = {
    id: nextId,
    title: cleanTitle,
    author: cleanAuthor,
    year
  };

  nextId += 1;
  books.push(newBook);

  return res.status(201).json(newBook);
});

// GET /api/books - Get all books, with optional author filtering.
app.get("/api/books", (req, res) => {
  const { author } = req.query;

  if (author) {
    const cleanAuthor = author.trim().toLowerCase();
    const filteredBooks = books.filter(
      (book) => book.author.toLowerCase() === cleanAuthor
    );

    return res.status(200).json(filteredBooks);
  }

  return res.status(200).json(books);
});

// GET /api/books/:id - Get one book by its ID.
app.get("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  return res.status(200).json(book);
});

// PUT /api/books/:id - Update all details of an existing book.
app.put("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((item) => item.id === bookId);
  const { title, author, year } = req.body;

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  if (!isValidBookData(title, author, year)) {
    return res.status(400).json({
      error: "Title, author, and year are required. Year must be a number."
    });
  }

  const cleanTitle = title.trim();
  const cleanAuthor = author.trim();

  const titleAlreadyExists = books.some(
    (item) =>
      item.id !== bookId &&
      item.title.toLowerCase() === cleanTitle.toLowerCase()
  );

  if (titleAlreadyExists) {
    return res.status(409).json({
      error: "A book with this title already exists."
    });
  }

  book.title = cleanTitle;
  book.author = cleanAuthor;
  book.year = year;

  return res.status(200).json(book);
});

// DELETE /api/books/:id - Delete a book by its ID.
app.delete("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex((item) => item.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found." });
  }

  books.splice(bookIndex, 1);

  return res.status(200).json({ message: "Book deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`Books API is running at http://localhost:${PORT}`);
});
