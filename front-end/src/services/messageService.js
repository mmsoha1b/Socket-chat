import axios from 'axios'
const baseUrl = '/api'

const postMessage = async({userId,text})=>{
    try{
        const newMessage = {userId,text};
        const token = JSON.parse(localStorage.getItem('userToken'))
        const config = {
            headers:{
                'authorization':`bearer ${token}`
            }
        }
        console.log(newMessage)
        const response = await axios.post(`${baseUrl}/messages`,newMessage,config);
        if (response.status === 200){
            const savedMessage = response.data;
            console.log(savedMessage)
            return savedMessage;
        }
        else {
            console.log("Not saved");
        }

    }
    catch(exception){
        console.log("error occured");
        return 
    }
};
const getMessages = async()=>{
    try{
        const response = await axios.get(`${baseUrl}/messages`);
        const allMessages = await response.data;
        return allMessages;

    }
    catch(exception){
        console.log(exception);
    }
}

const messageService = {postMessage,getMessages};
export default messageService;