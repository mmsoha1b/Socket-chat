const messageRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Message = require('../models/Message');
const User = require('../models/User');
messageRouter.get('/',async(req,res)=>{
    const messages  = await Message.findAll({
        limit:50,
        include:User
    },
    )
    res.status(200).json({
        messages:messages
    });
});

messageRouter.post('/',authenticateToken, async(req,res)=>{
    const body = await req.body;
    const {text} = body;    
    const user = req.user;
    const savedMessage = await Message.create({
        text:text,
        userId:user.id});
    const returnMessage = await Message.findOne({
        where:{
            id:savedMessage.id
        },
        include:User
    })
    // const savedUser = await User.findByPk(user.id);
    // await savedUser.addMessage(savedMessage);
    res.status(200).json(returnMessage);
});

async function authenticateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    const token  = authHeader && authHeader.split(' ')[1];
    if(token){
        try{
            const userForToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
            req.user = userForToken;
            next();
        }
        catch(exception){
            console.log(exception)
            res.status(403).json({
                error:"User could not be verfired"
            });
        }
    }
    else{
        res.status(401).json({
            error:"Unauthorized"
        });
        return
    }
};



module.exports = messageRouter;