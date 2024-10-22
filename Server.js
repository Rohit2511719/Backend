// CRM
// Signup
// signschema
// Email
// password
// Username

const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");

const app= express();
app.use(bodyparser.json());
mongoose.connect('mongodb://localhost:27017/CRM')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Connection error: ', err));
const post=process.env.PORT || 3003;

const signupSchema = new mongoose.Schema({
    username:{type:String, required:true },
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
});

const Signup = mongoose.model('Signup', signupSchema);

app.post('/api/signup', async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});

        }
        const newSignup=new Signup({username,email,password});
        await newSignup.save();
        res.status(200).json({message:"Signup Successfully"});

    }
    catch (error){
        console.log('Error',error);
        res.status(500).json({message:"Error creating Sinup"});

    }
});

app.listen(post,()=>{
    console.log(`Server is runninig on localhost:${post}`);
});



