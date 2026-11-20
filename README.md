# Books API

Books API is a simple REST API made with Node.js and Express.js. It stores books in an array in memory, so no database is needed. The data is reset whenever the server is stopped.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- In-memory array (no database)

## Installation

Open a terminal in the project folder and run:

```bash
npm install
```

## Run the Server

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## Book Format

Each book has an automatically generated `id`, a `title`, an `author`, and a numeric `year`.

Example request body:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
}
```

## API Endpoints

### 1. Add a book

```text
POST /api/books
```

Send `title`, `author`, and `year` as JSON. A successful request returns status `201`.

### 2. Get all books

```text
GET /api/books
```

Optional author filter:

```text
GET /api/books?author=Paulo%20Coelho
```

The author filter matches the complete author name without considering upper/lower case.

### 3. Get one book

```text
GET /api/books/1
```

Replace `1` with the book ID.

### 4. Update a book

```text
PUT /api/books/1
```

Send all three fields as JSON:

```json
{
  "title": "The Alchemist - Updated",
  "author": "Paulo Coelho",
  "year": 1990
}
```

### 5. Delete a book

```text
DELETE /api/books/1
```

Replace `1` with the book ID. A successful request returns a confirmation message.

## Testing with Postman or Thunder Client

1. Start the server with `npm start`.
2. Create a `POST` request to `http://localhost:3000/api/books`.
3. Select **Body**, choose **raw** and **JSON**, and send:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
}
```

4. Create another `POST` request with a different book, for example:

```json
{
  "title": "Clean Code",
  "author": "Robert Martin",
  "year": 2008
}
```

5. Test the remaining requests:

```text
GET    http://localhost:3000/api/books
GET    http://localhost:3000/api/books?author=Robert%20Martin
GET    http://localhost:3000/api/books/1
PUT    http://localhost:3000/api/books/1
DELETE http://localhost:3000/api/books/1
```

For the `PUT` request, use the same JSON format as the `POST` request. Use the ID returned by the `POST` response.

## Error Response Examples

### Missing data - status 400

Request:

```json
{
  "title": "A book without an author",
  "year": 2024
}
```

Response:

```json
{
  "error": "Title, author, and year are required. Year must be a number."
}
```

### Duplicate title - status 409

Send a book with a title that already exists.

Response:

```json
{
  "error": "A book with this title already exists."
}
```

### Wrong ID - status 404

Request:

```text
GET http://localhost:3000/api/books/999
```

Response:

```json
{
  "error": "Book not found."
}
```

## How the Code Works

- `express()` creates the server application.
- `express.json()` reads JSON request bodies.
- The `books` array stores all books while the server is running.
- `nextId` generates a new ID for every created book.
- `POST` validates data, checks duplicate titles, and adds a book.
- `GET` returns all books or filters them by author.
- `PUT` finds a book and changes its title, author, and year.
- `DELETE` removes a book from the array.
- `404`, `400`, and `409` responses explain why a request could not be completed.

