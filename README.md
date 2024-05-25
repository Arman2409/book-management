# `Book Management`

This project provides a backend API for managing a library system. 

## Getting Started

### Prerequisites

Git: You need git to clone the project.([Install Git](https://git-scm.com/downloads))
Node.js and npm: These are essential for running the application.([Install Node.js](https://nodejs.org/en))

### Setting up

1. Clone the repository: 
```bash
  git clone https://github.com/Arman2409/book-management.git
```
2. Change directory into the project: 
```bash 
  cd book-management
```
3. Install dependencies: 
```bash 
  npm install
```
4. Create a .env file in the root directory and add the following environment variables:
- `PORT`: The port number on which the server will run. Default value is 4000.
- `DATABASE_URL`: The connection string for your database. Note that you will need to change also the Prisma adapter if you don't 
- `JWT_SECRET`: A secret key used to sign JWT tokens. You can generate a random string using a tool like https://www.random.org/
5. Generate prisma client
```bash
 npm run generate
```
6. Migrate database
```bash
 npm run migrate
```

### Running the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Running test suites

```bash
# unit tests
$ npm run test
```

## API 


### Authentication Service:
Endpoints:

`Sign In`

Method: POST
Path: /auth/signin
Request Body: Object with two properties email and password
Response: Object with access_token property, which is a token created by JWT 

`Sign Up`

Method: POST
Path: /auth/signup
Request Body: Object with two properties name, email and password
Response: Object with access_token property, which is a token created by JWT


### Books Service
Endpoints:

`Get Book`

Method: GET
Path: /books/:id
Response: Book object if found

`Get All Books`

Method: GET
Path: /books
Response: Array of Book objects representing all books

`Create Book`

Method: POST
Path: /books
Request Body: Object with properties title, publishedDate, authorId and isbn
Response: Created Book object with its newly generated ID

`Update Book`

Method: PATCH
Path: /books/:id
Request Body: Object containing at least one of the properties title, authorId, publishedDate or isbn
Response: Updated Book object

`Delete Book`

Method: DELETE
Path: /books/:id
Response: Empty


### Authors Service
Endpoints:

`Get Author`

Method: GET
Path: /authors/:id
Response: Author object if found

`Get All Authors`

Method: GET
Path: /authors
Response: Array of Author objects representing all authors

`Update Author`

Method: PATCH
Path: /authors/:id
Request Body: Object with at least one of properties name, biography, birthDate
Response: Updated Author object

`Create Author`

Method: POST
Path: /authors 
Request Body: Object with properties name, biography, birthDate
Response: Created Author object with its newly generated ID

`Delete Author`

Method: DELETE
Path: /authors/:id
Response: Empty