const express = require("express");
const cors = require("cors");
const MD5 = require("crypto-js/md5");
const db = require("./db.json");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/show", (req, res)=>{
    const { username, password } = req.body;
    const passwordHash = MD5(password);
    const user = db.users.filter((item)=>{
        if(item.username == username && item.password == password)
        return item
        else if(item.username == username && item.password == passwordHash)
        return item
    });
    res.json({
        password,
        passwordHash,
        user
    })
});

app.listen(port, ()=> console.log("Porta aberta em: localhost:3001"));