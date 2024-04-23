const mongoose = require('mongoose')
// const dotenv = require('dotenv')
const express = require('express');
const sql = require("mssql");
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv module
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

var config = {
    user: 'sa',
    password: 'ca123',
    server: 'JANAGANR-LT\\SQLEXPRESS', 
    database: 'Ebook_S8' ,
    synchronize: true,
    options: 

    {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};


app.post('/api/login', (req, res)=>{
    const getQuery = "SELECT * FROM Ebook_S8 WHERE Email = ? AND Password = ?";

    config.query(getQuery, [req.body.email, req.body.password], (err, data)=>{
        if(err) return res.json("Login Failed");
        if(data.length > 0){
            return res.json("Login Successfully");
        }
        else{
            return res.json("Login Failed... User Not Found");
        }
    })
})
// Connect to the database
sql.connect(config)
    .then(pool => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});



mongoose.connect(process.env.MONGO_URI)
.then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

mongoose.set('strictQuery', false);


