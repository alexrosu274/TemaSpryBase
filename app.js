const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const multer = require('multer');
const path = require('path');

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use("/uploads",express.static('uploads'));
const storage = multer.diskStorage({
  destination:'./uploads',
  filename:function(req,file,cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
    storage:storage
}).array('img')

mongoose.connect('mongodb://localhost:27017/ReclamaDB',
{useNewUrlParser:true,
useUnifiedTopology:true});

const adSchema = new mongoose.Schema({
  title:String,
  description:String,
  room:String,
  address:String,
  price:Number,
  phone:String,
  image:Array
});

const Ad = mongoose.model("Ad",adSchema);

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
 
app.get("/", function(req,res) {
    res.sendFile(__dirname+"/home.html");
});

app.get("/createAd",(req,res)=>{
    res.sendFile(__dirname+"/creareAd.html");
})

app.post("/dataOfTheAd",(req,res)=>{
    upload(req,res,(err)=>{
        if(err)
            console.log(err);
        else {
            let imagesPath=[]
            for(let i=0;i<req.files.length;++i)
            {
                imagesPath.push(req.files[i].path);
            }
            console.log(imagesPath);
            let ad = new Ad({ 
                title:req.body.title,
                description:req.body.description,
                room:req.body.room,
                address:req.body.address,
                price:req.body.price,
                phone:req.body.phone,
                image:imagesPath      
            })
            ad.save(function(err){
                if(err) {
                    console.log(err)
                }
                else {
                    res.sendFile(__dirname+'/success.html');
                }
            })
        }
    })
})

app.get('/listAds',(req,res)=>{
    Ad.find(function(err,ads){
      if(err) {
          console.log(err);
      } 
      else {
        res.render('Ads',{ads:ads});     
      } 
    })
})
