const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt  = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/usermodel.js')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://127.0.0.1:5173"],
    methods:["GET", "POST"],
    credentials:true

}));
app.use(cookieParser());


url = "mongodb+srv://everyonecandoit:every1@draft1.jnosxar.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)
    .then(()=>{
        console.log("mongoose is connected");
    })
    .catch((err)=>{
        console.log(err);
    })

    // seller connection

    const verifyuser = (req,res,next)=>{
      const token = req.cookies.token;
      if(!token){
        return res.json("Token is not present ")
      }
      else{
        jwt.verify(token,"SECRET_KEY",(err,decodedvalue)=>{
          if(err){
            return res.json(err);
          }
          else{
            if(decodedvalue.role==="Admin"){
              next()
            }
            else{
              return res.json("You are not authorized to access this page.");
            }

          }
        })
      }

    }

   app.get('/seller',verifyuser,(req, res)=>{
    res.json("Sucess");
   })


    app.post('/register', async (req, res) => {
        try {
          const { name, email, password,role } = req.body;
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user in the database
          const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role,
          });
      
          res.json({ status: 'OK', user });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });


      app.post('/login', function (req, res) {
        try {
          const { email, password } = req.body;
          UserModel.findOne({ email: email })
            .then(user => {
              if (user) {
                bcrypt.compare(password, user.password, (err, passwordMatch) => {
                  if (passwordMatch) {
                    const token = jwt.sign({ email: user.email, role: user.role }, "SECRET_KEY", { expiresIn: '1d' });
                    res.cookie('token',token);
                    return res.json({Status:200,role:user.role,cookie:token});
                  } else {
                    return res.json("The password is incorrect. Please try again");
                  }
                });
              } else {
                return res.json("No record found of the user");
              }
            });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

      app.post('/logout',(req, res) => {
        res.cookie('token','').json('ok');
    })
      

    app.post('/forgot-password',(req, res) => {
      const {email}= req.body;
      UserModel.findOne({email: email})
      .then(user=>{
        if(!user){
          res.send({Status:404 ,message:"User does not exist"})
        }
        const token = jwt.sign({id:user._id},"SECRET_KEY",{expiresIn:180})
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'khetibuddy001@gmail.com',
            pass: 'ukrr dtwx tabh xaip'
          }
        });
        
        var mailOptions = {
          from: 'khetibuddy001@gmail.com',
          to: email,
          subject: 'Reset Password Link',
          text: `Hi ${user.name} here is your link to  reset you password http://localhost:3000/reset_password/${user._id}/${token} please keep in mind the link is valid for only 3 mins.`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status:200})
          }
      })

    })
  });


app.listen(3000,()=>{
    console.log('listening on port 3000');
})