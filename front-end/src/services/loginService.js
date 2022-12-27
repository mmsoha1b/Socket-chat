//Move BaseUrl outside 
import axios from 'axios'
const baseUrl = "/api"
const login = async ({email,password})=>{
    try{
        const response =  await axios.post(`${baseUrl}/login`,{email,password})
        if (response.status === 200){
            const {userForToken,token} = await response.data;
            localStorage.setItem('userToken',JSON.stringify(token));
            localStorage.setItem('user',JSON.stringify(userForToken))
            return userForToken;
        }
    }
    catch(exception){

    }
};
const register = async ({email,username,password})=>{
    try{
        const response = await axios.post(`${baseUrl}/signup`,{email,username,password});
        if(response.status === 200)
        {
           const {userForToken,token} = await response.data; 
            localStorage.setItem('userToken',JSON.stringify(token));
            localStorage.setItem('user',JSON.stringify(userForToken))
            return userForToken;
        }}
    catch(exception){
        console.log(exception);
        return false
    }
}
const logOut = ()=>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
}
const loginService ={
    login,
    register,
    logOut
};

export default loginService;