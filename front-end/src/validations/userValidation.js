import { object, string } from 'yup';
export const userSchema = object({
    username:string().max(25).required(),
    email:string().required(),
    password:string().min(6).max(25).required()
});