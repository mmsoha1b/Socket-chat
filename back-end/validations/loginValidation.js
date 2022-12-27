const { object, string } =require('yup');
module.exports = object({
    email:string().required(),
    password:string().min(6).max(25).required()
});