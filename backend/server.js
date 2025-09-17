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
    const {name, email, type, message} = req.body;
    const sql =  'INSERT INTO contactform (name, email, type, message) VALUES (?, ?, ?, ?)'
    db.query(sql, [name, email, type, message], (err, result) => {
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

app.delete('/admin/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM contactform WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  });
});

app.patch('/admin/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE contactform SET status = "Resolved" WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update status' });
    res.json({ message: 'Feedback marked as resolved', result });
  });
});


app.listen(8081, () => {
    console.log('listening...')
})