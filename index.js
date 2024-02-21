const express = require('express')
const morgan = require('morgan')
const app = express()
const user = require('./users')
const port = 3000
const host = '127.0.0.1'
const multer = require("multer");
const upload = multer({dest: "public"});
const path = require("path");
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require("fs")


// menangani cors dengan middleware
app.use(cors())

// menangani file upload dengan middleware
app.post("/upload", upload.single("file"), (req,res)=>{
    const file = req.file;
    if(file) {
        const target = path.join(__dirname, "public", file.originalname);
        fs.renameSync(file.path, target)
        res.send("file berhasil diupload");
    }
    else {
        res.send("file gagal diupload")
    }
});

// menangani file statis dengan menggunakan middleware
app.use(express.static(path.join(__dirname, "public")));

// menangani Request Body dengan middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(morgan("combined"));

app.get('/users', (req, res) => {
    res.status(200).json(user.users);
  });

  app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = user.users.find(u => u.name.toLowerCase() === name); // perbaiki ini
    if (!user) {
        res.status(404).json({ message: 'Data user tidak ditemukan' });
    } else {
        res.json(user);
    }
});

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Terjadi kesalahan pada server",
    });
});

app.listen(port, ()=>console.log(`Server running at http://${host}:${port}`))