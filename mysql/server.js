const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Configure Multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Define an API endpoint to create a new user
app.post('/signup', upload.single('picture'), (req, res) => {
  // Get the user's information from the request body
  const { name, surname, email, mobile, password } = req.body;

  // Get the uploaded picture file data
  const pictureData = req.file.buffer;

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) throw err;

    // Execute the SQL query to insert a new user
    connection.query('INSERT INTO users (name, surname, email, mobile, password, picture) VALUES (?, ?, ?, ?, ?, ?)', [name, surname, email, mobile, password, pictureData], (err, result) => {
      connection.release(); // Release the connection

      if (err) throw err;

      // Send a success response
      res.status(201).send('User created successfully');
    });
  });
});

// fetch response display on web
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
  });

// Start the server
app.listen(3002, () => {
  console.log('Server started on port 3002');
});
