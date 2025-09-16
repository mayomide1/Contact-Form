const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login"
})

app.post('/form', (req, res) => {
    const {name, email, message} = req.body;
    const sql =  'INSERT INTO contactform (name, email, message) VALUES (?, ?, ?)'
    db.query(sql, [name, email, message], (err, result) => {
        if(err){
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "Form submitted successfully!", result })
    })
})

app.get('/admin', (req, res) => {
    const sql =  'SELECT * FROM contactform'
    db.query(sql, (err, result) => {
        if(err){
        return res.json(err)
        }
        return res.json(result)
    })
})





app.listen(8081, () => {
    console.log('listening...')
})