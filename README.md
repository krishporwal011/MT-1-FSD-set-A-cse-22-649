# Books API

This is a simple Books REST API made with Node.js and Express.js. Books are stored in a JavaScript array in memory, so no database is used. The data is reset when the server stops.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- In-memory array

## Installation

Open a terminal in this project folder and run:

```bash
npm install
```

## Start the Server

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## Book Request Body

Use this JSON body when creating or updating a book:

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

Returns the new book with status `201`.

### 2. Get all books

```text
GET /api/books
```

Optional author filter:

```text
GET /api/books?author=Robert
```

### 3. Get one book

```text
GET /api/books/1
```

Replace `1` with the required book ID.

### 4. Update a book

```text
PUT /api/books/1
```

Send the title, author, and year in the JSON body.

### 5. Delete a book

```text
DELETE /api/books/1
```

Replace `1` with the required book ID.

## Testing with Postman or Thunder Client

1. Run `npm install` and then `npm start`.
2. Create a `POST` request to `http://localhost:3000/api/books`.
3. Select **Body**, choose **raw** and **JSON**, and send:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
}
```

4. Add another book, for example:

```json
{
  "title": "Clean Code",
  "author": "Robert Martin",
  "year": 2008
}
```

5. Test these requests:

```text
GET    http://localhost:3000/api/books
GET    http://localhost:3000/api/books?author=Robert%20Martin
GET    http://localhost:3000/api/books/1
PUT    http://localhost:3000/api/books/1
DELETE http://localhost:3000/api/books/1
```

For the `PUT` request, send this type of JSON body:

```json
{
  "title": "The Alchemist Updated",
  "author": "Paulo Coelho",
  "year": 1990
}
```

## Error Examples

### Missing data - status 400

```json
{
  "title": "Book without author",
  "year": 2024
}
```

Response:

```json
{
  "message": "Title, author, and year are required. Year must be a number."
}
```

### Duplicate title - status 409

Send a title that already exists.

Response:

```json
{
  "message": "A book with this title already exists."
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
  "message": "Book not found."
}
```

## Simple Code Explanation

- `express()` creates the Express application.
- `express.json()` reads JSON data sent by the client.
- `books` stores all books in memory.
- `nextId` gives every new book a different ID.
- `find()` searches for a book.
- `filter()` finds books by author.
- `push()` adds a new book to the array.
- `splice()` removes a book from the array.
- Each route sends the required HTTP status code.

