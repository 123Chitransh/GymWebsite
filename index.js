import express from 'express';
import mongoose from 'mongoose'

import cors from 'cors'
import User from './model/user.model.js'
import jwt from 'jsonwebtoken'


const app = express();

app.use(cors());       //learn about the cors
app.use(express.json())



app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            program: req.body.program,
        })
        res.json({ status: 'Ok' });
    }
    catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    

    if (user) {
        const name = user.name;
        const token = jwt.sign({
            name: user.name,
            email: user.email,
            password: user.password
        }, 'secret1234')
        return res.json({ status: 'Ok', user: token,name:name });
    }
    else {
        return res.json({ status: 'error', user: false })
    }

})


app.get('/', (req, res) => {
    res.send("Hello World");
})

const connectDB = () => {
    // mongoose.set("strictQuery", true);
    mongoose
      .connect('mongodb+srv://chitransh7017soni:Chinu123@cluster0.chhzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };
  
  const startServer = async () => {
    try {
      connectDB();
      app.listen(8000, () => console.log("Server started on port 8000"));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();