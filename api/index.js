// Core Modules
const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser');
require("dotenv").config();
const fs = require('fs')

//------------------------------------
// DataBase
const mongoose = require('mongoose');
// Models
const User = require('./models/User');
const Post = require('./models/Post.js');

//------------------------------------
// Application Initialization
const app = express();

//------------------------------------
// Security and Authentication
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//------------------------------------
// Secret Keys
const jwt_secret=process.env.JWT_SECRET
const salt = bcrypt.genSaltSync(10);

//------------------------------------
// MiddleWare
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })

app.use('/uploads',express.static(__dirname + '/uploads'))


//--------------------------------------------------------------------------------

mongoose.connect(process.env.DB_CONNECTION)
.then(()=>{
    console.log('DataBase Connected');
}).catch(err=>console.log('Connection Failed | Error - '+err));


app.post('/register',async(req,res) =>{
    const {username,password} = req.body;
   if(!password){
    return res.status(400).json('Username or Password Empty')
   }
    
    try{
        const newUser = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        })
        res.json(newUser);
    }catch(err){
        res.status(400).json({error: err.message})
        console.log(err.message)
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;

    const userdoc = await User.findOne({username});
    if(userdoc == null){
        return res.status(400).json('Wrong Credentials');
    }
    
    const passok = bcrypt.compareSync(password,userdoc.password)
    if(passok){
        jwt.sign({username,id:userdoc._id},jwt_secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(
                {   
                    message:"Login Succesfull",
                    id:userdoc._id,
                    username,
                }
            )
        })
    }else {
        return res.status(400).json('Wrong Credentials')
    }
})


app.get('/profile',(req,res)=>{

        const {token} = req.cookies;

        if(!token){
            return null
        }
        jwt.verify(token,jwt_secret,{},(err,info)=>{
            if(err) throw err;
            res.json(info)

    })
    
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json('Logged Out')
})
app.listen(4000);

app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
    const {originalname,path} = req.file;
    const split_original_name = originalname.split('.');
    const ext = split_original_name[split_original_name.length - 1];
    const newPath = path+"."+ext;
    fs.renameSync(path,newPath);


    const {token} = req.cookies;

        if(!token){
            return null
        }
        jwt.verify(token,jwt_secret,{},async(err,info)=>{
            if(err) throw err;


        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });
    })
})

app.get('/post',async (req,res)=>{
    res.json(await Post.find()
    .populate('author',['username']).sort({createdAt:-1})
    .limit(10))
})
app.get('/post/:id',async (req,res)=>{
   const {id} = req.params;
   const PostDoc = await Post.findById(id).populate('author',['username'])
   res.json(PostDoc);
})


app.delete('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const PostDoc = await Post.findByIdAndDelete(id)
    res.json('ok')
})