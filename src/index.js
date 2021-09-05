const express = require('express');
const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 8080;

// db provides the query(), insert(), and update() functions.
const db = require('./db')

// Tester route to make sure the server runs.
/* app.get('/', (req, res) => {
  res.json({ you: "are on the root page"})
}); */

// Tester route to make sure the DB is seeded.
/* app.get('/api/users', (req, res) => {
  db.query(`SELECT * FROM users`, [])
    .then(rows => res.json(rows))
}) */

app.post('/api/login', (req,res) => {
  // Attempt to login a user with a username and password.
  // Set a cookie if the login is successful.
})

app.post('/api/users', (req, res) => {
  // Register a new user with username and password.
  // Hash the password first!
  // Set a cookie if the registration is successful.
})

app.post('/api/projects', (req, res) => {
  // Create a new project for the currently-logged-in user.
})

app.post('/api/blocks', (req, res) => {
  // Create a new block for the currently-logged-in user.
  // Get the project ID from the request.
})

app.post('/api/sessions', (req, res) => {
  // Start a new session for the current user.
  // Get the project ID from the request.
})

http.listen(port, () => console.log(`Listening on port ${port}`));
