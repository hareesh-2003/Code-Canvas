const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser=require('cookie-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
//------------------------------------
const jwt_secret=process.env.JWT_SECRET
const salt = bcrypt.genSaltSync(10);
//------------------------------------
// Models
const User = require('./models/User')

//------------------------------------

//lol
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json()) // for parsing application/json
app.use(cookieParser())


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






//username : hareeshpadmanathan
//password : s3uFf3gsLDlYby35

// connection String : mongodb+srv://hareeshpadmanathan:s3uFf3gsLDlYby35@blogentries.tjiyi.mongodb.net/?retryWrites=true&w=majority&appName=BlogEntries