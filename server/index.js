const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt  = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/usermodel.js')
const bcrypt = require('bcrypt');

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
                    res.cookie('token', token);
                    return res.json({Status:200,role:user.role});
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
      


app.listen(3000,()=>{
    console.log('listening on port 3000');
})