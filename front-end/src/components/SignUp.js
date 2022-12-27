import { useNavigate } from 'react-router-dom';
import { userSchema } from '../validations/userValidation';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import loginService from '../services/loginService';
const SignUp =({setUsers,users})=>{
    const[email,setEmail] = useState('');
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState(''); 
    const [emailActive,setEmailActive] = useState(false);
    const [usernameActive,setUsernameActive] = useState(false);
    const [passwordActive,setPasswordActive] = useState(false);
    const [confirmPasswordActive,setConfirmPasswordActive] = useState(false)
    const [regitserFailAlert,setRegisterFailAlert] = useState('');
    const naviagte = useNavigate();
    
    let formValidity=false;
    if(username.length>0 && email.length>0 && password.length>5 && confirmPassword===password
       && (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) )){
        console.log("omks")
        formValidity=true;
    }

    const emailChangeHandler=(event)=>{
        event.preventDefault();
        setEmail(event.target.value)
    }
    const passwordChangeHandler=(event)=>{
        event.preventDefault();
        setPassword(event.target.value)
    }
    const confirmPasswordChangeHandler=(event)=>{
        event.preventDefault();
        setConfirmPassword(event.target.value);
    }
    const usernameChangeHandler=(event)=>{
        event.preventDefault();
        setUsername(event.target.value);
    }
    const alertSetter=(
        message = "User couldn't be registerd. Did you enter all the required info?",
        )=>{
        setRegisterFailAlert( <Alert className="mt-3"variant={'danger'}> 
        {message} 
        </Alert>
    )
    setTimeout(()=>{
        setRegisterFailAlert('');
    },5000);
    }
    const createNewUser = async (event)=>{
        event.preventDefault();
        const newUser = {
            username:username,
            email:email,
            password:password,
        }
        const isValid = await userSchema.isValid(newUser);
        if(!isValid){
            console.log('error occured')
            alertSetter();
        }
        else{
            const savedUser = await loginService.register(newUser);
            console.log(savedUser)
            if(!savedUser){
                console.log("User couldn't be saved");
                alertSetter("Server error occured");
            }
            else{
                naviagte('/chat-room');
            }
        }
        setUsers([...users,newUser]);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsernameActive(false)
        setEmailActive(false);
        setPasswordActive(false);
        setConfirmPasswordActive(false);
    }
    const signUpButton = formValidity?<Button className={'mb-5 mt-3'} variant="danger" type="submit">Signup</Button>:
                         <Button className={'mb-5 mt-3'} variant="danger" type="submit" disabled>Signup</Button>
    return(
        <>
        <Container> 
            <Row>
                {regitserFailAlert}
            <Col lg={6} style={{marginTop:'30px',marginLeft:'auto',marginRight:'auto',backgroundColor:'#45a29e'
                                ,paddingLeft:'30px',paddingRight:'30px',boxShadow: '2px  2px 9px #45a29e',}}>
                <h2 className="mt-3">Sign up</h2>
            <Form onSubmit={createNewUser}>
                <Form.Group className="mb-2">
                <Form.Label>Enter your email</Form.Label>
                <Form.Control type="text" value={email} onFocus={()=>setEmailActive(true)} 
                            placeholder="example@domain.com" onChange={emailChangeHandler}
                            className={(email==='' && emailActive) ||(
                            !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) && email.length>1 
                            )? 'form-error':''}/>

                {email==='' && emailActive ? <div className='ms-2 error-text'>
                    <b><i>Email can't be empty</i></b>                    
                </div>:''}
                {email.length>0 && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))?
                  <div className='ms-2 error-text'>
                      <b><i>Invalid email</i></b>
                  </div>
                :''}

                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Enter your username</Form.Label>
                <Form.Control type="text" value={username} onFocus={()=>setUsernameActive(true)}
                             placeholder="Enter username" maxLength={25} onChange={usernameChangeHandler}
                             className={username==='' && usernameActive ?'form-error':''}/>
                             
                {username ==='' && usernameActive?<div className='ms-2 error-text'>
                    <b><i>Username can't be empty</i></b>                    
                </div>:''}
                </Form.Group>
                <Form.Group className='mb-2'>
                <Form.Label>Enter your Password</Form.Label>
                <Form.Control type="password" value={password} onFocus={()=>setPasswordActive(true)}
                              placeholder="Password" maxLength={25}  onChange={passwordChangeHandler}
                              className={password==='' && passwordActive?'form-error':''}/>
                {password===''&&passwordActive?<div className='ms-2 error-text'>
                    <b><i>Password can't be empty</i></b>                    
                </div>:''}
                {password.length>0&&password.length<6?<div className='ms-2 error-text'>
                    <b><i>Password must be 6 characters long</i></b>                    
                </div>:''}
                </Form.Group>
                <Form.Group className='mb-2'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control  type="password" value={confirmPassword} placeholder="Enter password again" 
                               onChange={confirmPasswordChangeHandler} maxLength={25}
                               onFocus={()=>setConfirmPasswordActive(true)}
                               className={confirmPassword!==password && confirmPasswordActive ?'form-error':''}
                               />
                {confirmPassword!==password && confirmPasswordActive?<div className='ms-2 error-text' >
                    <i><b>Paswords must match</b></i>
                </div>:''}
                </Form.Group>
                <Stack>
                {signUpButton}
                </Stack>
            </Form>
            </Col>
            </Row>
        </Container>
        </>
    )
}
export default SignUp;