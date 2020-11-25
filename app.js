const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/assets",express.static("assets"))
app.get("/",(req,res)=>{
    res.render('index')})

app.get("/about",(req,res)=>{
    //res.send("about sayfasındasınız.")
    res.render('about');
})
app.get("/iletisim",(req,res)=>{
    res.render('iletisim')
})
app.post("/iletisim",(req,res)=>{
    var transfer = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"", // nodemailer module ü için kendi mailinizin bilgilerini girin
            pass:""
        }
    });

    var mailInfo ={
        from:"melih.erpek1@ogr.sakarya.edu.tr",
        to:req.body.mail,
        subject:"EJS,NodesJS ile atılan mail",
        text:req.body.mesaj
    };

    transfer.sendMail(mailInfo,function(err){
        if (err) {console.log(err);}
        else console.log("gönderildi")    
            
        });


    
    res.end();
})
app.get("/profile/:name",(req,res)=>{
    //res.send(`${req.params.name} adlı kişinin profilindesin.`)
    //res.sendFile(__dirname+"/profile.html");
let personelInfo = {age : 30 , job : 'developer',langs : ['İngilizce','İtalyanca', 'Almanca,'],admin : true};

    res.render('profile',{kisi : req.params.name ,data : personelInfo});
})

app.listen(3000)    
