const { object, string } =require('yup');
module.exports = object({
    username:string().max(25).required(),
    email:string().required(),
    password:string().min(6).max(25).required()
});