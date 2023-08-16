const express = require('express');
const mysql = require("mysql");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
const dbPool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Diablo",
    database: "test"
});

app.get("/", (req, res) => {
    res.send("hello this is backend");
});

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    dbPool.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/books',(req,res)=>{
    const q = "INSERT INTO books (`title`, `desc` , `price` ,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]


    dbPool.query(q ,[values] , (err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been created succesfully")
    })

})


app.delete('/books/:id', (req,res)=>{
    const bookid = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    dbPool.query(q , [bookid] , (err,data)=>{
        if(err){
            return   res.json(err)
        }
        return res.json("Books has be deleted successfully")
    })
})


app.put('/books/:id', (req,res)=>{
    const bookid = req.params.id;
    const q = "UPDATE books SET `title` = ? , `desc` = ? , `price` = ? , `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    dbPool.query(q , [...values , bookid] , (err,data)=>{
        if(err){
            return   res.json(err)
        }
        return res.json("Books has be updated successfully")
    })
})


app.listen(8800, () => {
    console.log("connected to backend");
});
