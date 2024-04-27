const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'agriculture_db',
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});

// Middleware
app.use(express.json());

// Insert data category
app.post('/category', (req, res) => {
    const { CategoryID, CategoryName } = req.body;
    const sql = `INSERT INTO category (CategoryID, CategoryName) VALUES (?, ?)`;
    db.query(sql, [CategoryID, CategoryName], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error inserting data' });
            throw err;
        }
        res.status(200).send({ message: 'Data inserted successfully' });
    });
});

// Select data category
app.get('/category', (req, res) => {
    const sql = `SELECT * FROM category`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            throw err;
        }
        res.status(200).send(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
