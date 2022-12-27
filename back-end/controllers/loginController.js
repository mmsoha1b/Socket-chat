require('dotenv').config()
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const {User} = require('../models/index');
const userSchema = require('../validations/userValidation');
const loginValidation = require('../validations/loginValidation');

loginRouter.post('/login',async (req,res)=>{
    const body = await req.body;
    const {email,password} = body;
    try{
        await loginValidation.validate({email,password});
    }
    catch(error){
        res.status(422).json({
            error:"The data provided is not valid"
        });
        return
    }
    const existUser = await User.findOne({
        where:{
            email:email   
    }});
    if(existUser){
        const passwordCorrect = await bcrypt.compare(password,existUser?.passwordHash);
        if(passwordCorrect){
            const userForToken = {id:existUser.id,username:existUser.username};
            const token = jwt.sign(userForToken,process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({userForToken,token});
        }
        else{
            res.status(401).json({
                error:"Username seems to be correct but password is invalid"}
            );
        }
    }
    else{
        res.status(401).json({
            error:"A user with the email could not be found"
        })
    }
});
loginRouter.post('/signup',async(req,res)=>{
    const {username,email,password} = await req.body;
    const recievedUser = {username,email,password};
    try{
        await userSchema.validate(recievedUser);
    }
    catch(error){
        console.log(error);
        res.status(422).json({
            error:"The data provided is not valid"
        });
        return
    }    
    emailExist = await User.findAll({
            where:{
                email:recievedUser.email
            }
    });
    if(emailExist.length > 0){
        res.status(422).json({
            error:"Email is already taken"
        });
        return
    }
    else{
        console.log(recievedUser);
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(recievedUser.password,saltRounds);
        const savedUser = await User.create({username:username,passwordHash:passwordHash,email:email});
        const userForToken = {id:savedUser.id,username:savedUser.username};
        const token = jwt.sign(userForToken,process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send({userForToken,token});
        return
    }
});

module.exports = loginRouter;