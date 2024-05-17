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
        console.error('MySQL Connection Error:', err);
        throw err;
    }
    console.log('MySQL Connected');
});

// Middleware
app.use(express.json());

//Login
app.post('/login', (req, res) => {
    const { UserEmail, UserPass } = req.body;
    const sql = `SELECT * FROM user WHERE UserEmail = ? AND UserPass = ?`;
    db.query(sql, [UserEmail, UserPass], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            throw err;
        }
        if (result.length > 0) {
            const user = result[0];
            res.status(200).send({
                success: true,
                message: 'Login successful',
                UserID: user.UserID // Trả về UserID
            });
        } else {
            res.status(401).send({ success: false, message: 'Email hoặc Mật khẩu không đúng' });
        }
    });
});

//signup
app.post('/signup', (req, res) => {
    const { UserEmail, UserPass } = req.body;

    const checkEmailSql = `SELECT * FROM user WHERE UserEmail = ?`;
    db.query(checkEmailSql, [UserEmail], (err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: 'Error checking email' });
            throw err;
        }
        if (result.length > 0) {
            res.status(400).send({ success: false, message: 'Email đã được đăng ký. Vui lòng đăng ký bằng Email khác!' });
        } else {
            const sql = `INSERT INTO user (UserEmail, UserPass) VALUES (?, ?)`;
            db.query(sql, [UserEmail, UserPass], (err, result) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Đăng ký thất bại' });
                    throw err;
                }
                res.status(200).send({ success: true, message: 'Đăng ký thành công' });
            });
        }
    });
});

//Update password
app.post('/update-password', (req, res) => {
    const { userID, currentPassword, newPassword } = req.body;
    const checkPasswordSql = `SELECT * FROM user WHERE UserID = ? AND UserPass = ?`;

    db.query(checkPasswordSql, [userID, currentPassword], (err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: 'Error checking current password' });
            throw err;
        }
        if (result.length === 0) {
            res.status(401).send({ success: false, message: 'Mật khẩu hiện tại không đúng' });
        } else {
            const updatePasswordSql = `UPDATE user SET UserPass = ? WHERE UserID = ?`;
            db.query(updatePasswordSql, [newPassword, userID], (err, result) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Error updating password' });
                    throw err;
                }
                res.status(200).send({ success: true, message: 'Cập nhật mật khẩu thành công' });
            });
        }
    });
});

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

// Select data infor
app.get('/infor', (req, res) => {
    const sql = `SELECT * FROM infor`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            throw err;
        }
        res.status(200).send(result);
    });
});

// Select data price from plant
app.get('/category/plants', (req, res) => {
    const sql = `
        SELECT c.CategoryID, c.CategoryName, p.PlantID, p.PlantName, p.AVGPriceNow, (p.AVGPriceNow - p.AVGPriceYesterday) AS Fluctuations
        FROM category c
        INNER JOIN plant p ON c.CategoryID = p.CategoryID
    `;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            throw err;
        }
        res.status(200).send(result);
    });
});

// Select full data product
app.get('/category/plant/product', (req, res) => {
    let sql = `
                SELECT 
                c.CategoryID,
                c.CategoryName,
                p.PlantID,
                p.PlantName,
                pr.ProductID,
                pr.ProductName,
                pr.Price,
                pr.ProductInfo,
                pr.Image,
                pr.Status
                FROM 
                    category c
                JOIN 
                    plant p ON c.CategoryID = p.CategoryID
                JOIN 
                    product pr ON p.PlantID = pr.PlantID`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            throw err;
        }
        res.status(200).send(result);
    });
});

app.post('/add-to-cart', (req, res) => {
    const { ProductName, Image, Price, Quantity, TotalPrice, UserID } = req.body;

    if (Quantity <= 0) {
        return res.status(400).send({ success: false, message: 'Quantity must be greater than 0' });
    }

    const checkSql = 'SELECT * FROM user_cart WHERE ProductName = ? AND UserID = ?';
    db.query(checkSql, [ProductName, UserID], (checkErr, checkResult) => {
        if (checkErr) {
            res.status(500).send({ success: false, message: 'Database query error' });
            throw checkErr;
        }

        if (checkResult.length > 0) {
            res.status(400).send({ success: false, message: 'Sản phẩm đã có trong giỏ hàng' });
        } else {
            const insertSql = 'INSERT INTO user_cart (ProductName, Image, Price, Quantity, TotalPrice, UserID) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(insertSql, [ProductName, Image, Price, Quantity, TotalPrice, UserID], (insertErr, insertResult) => {
                if (insertErr) {
                    res.status(500).send({ success: false, message: 'Failed to add to cart' });
                    throw insertErr;
                }
                res.status(200).send({ success: true, message: 'Thêm vào giỏ hàng thành công' });
            });
        }
    });
});

app.get('/userCart', (req, res) => {
    const userID = req.query.userID;
    if (!userID) {
        return res.status(400).send({ message: 'UserID is required' });
    }

    const sql = `SELECT * FROM user_cart WHERE UserID = ?`;
    db.query(sql, [userID], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error retrieving data' });
            throw err;
        }
        res.status(200).send(result);
    });
});

app.delete('/delete-from-cart/:userCartID', (req, res) => {
    const userCartID = req.params.userCartID;

    const deleteSql = 'DELETE FROM user_cart WHERE UserCartID = ?';
    db.query(deleteSql, [userCartID], (deleteErr, deleteResult) => {
        if (deleteErr) {
            res.status(500).send({ success: false, message: 'Failed to delete from cart' });
            throw deleteErr;
        }
        res.status(200).send({ success: true, message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
