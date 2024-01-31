const express = require('express')
const app = express()
const port = 3000
const host = '127.0.0.1'

app.get('/', (req,res)=>res.send("Hello World"));
app.get('/about', (req,res)=>
    res.status(200).json({
        status : "Success",
        massage : "Success",
        data :[]
    })
    );

app.listen(port, ()=>console.log(`Server running at http://${host}:${port}`))