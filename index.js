const express = require("express");
const cors = require("cors");
const MD5 = require("crypto-js/md5");
const db = require("./db.json");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/html/index.html");
})

app.post("/autenticar", (req, res)=>{
    const { username, password } = req.body;
    const passwordHash = MD5(password);
    const database = db.users;
    const user = database.filter((item)=>{
        if(item.username == username && item.password == password) return item
        else if(item.username == username && item.password == passwordHash) return item
    });
    
    if(user.length > 0){
        res.sendFile(__dirname + "/html/sucess.html");
    }else{
        res.sendFile(__dirname + "/html/fail.html");
    }
});

app.listen(port, ()=> console.log("Porta aberta em: localhost:3001"));