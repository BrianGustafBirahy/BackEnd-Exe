const express = require('express')
const morgan = require('morgan')
const app = express()
const user = require('./users')
const port = 3000
const host = '127.0.0.1'

app.use(morgan("combined"));

app.get('/users', (req, res) => {
    res.status(200).json(user.users);
  });

app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === name);
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