import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import loginService from '../services/loginService';
const LoginForm=({users})=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const [loginFailAlert,setLoginFailAlert]= useState('')
    const handleEmailChange=(event)=>{
        event.preventDefault();
        setEmail(event.target.value);
    }
    const handlePasswordChange=(event)=>{
        event.preventDefault();
        setPassword(event.target.value);
    }
    const togglePasswordVisibility=(event)=>{
        // Works but is thuk. Figure out and change later
        const passwordField = event.target.parentNode.parentNode.parentNode.querySelector('#formBasicPassword');
    
        if(passwordField.type ==='password'){
            passwordField.type ='text';
        }
        else{
            passwordField.type ='password';
        }
    }
    const loginHandler = async (event)=>{
        event.preventDefault();
        const inputNodes = event.target.querySelectorAll('input')
        inputNodes.forEach(inputNode=>{
            inputNode.value='';
        })
        setEmail('');
        setPassword('');
        const foundUser =  await loginService.login({email:email,password:password})
        if(foundUser){
            navigate('/chat-room');
        }
        else{
            setLoginFailAlert(<Alert className="mt-3"variant={'danger'}> Either username or password is invalid</Alert>)
            setTimeout(()=>{
                setLoginFailAlert('');
            },5000)
        }
    }
    return(
        <Container >
            <Row>
                {loginFailAlert}
            <Col lg={6} style={{marginTop:'120px',marginLeft:'auto',marginRight:'auto',backgroundColor:'#45a29e'}}>
                <h2>Login</h2>
            <Form onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" onChange={handleEmailChange} />
                </Form.Group>
          
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                </Form.Group>
                <Form.Group>
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="Show password"
                onChange={togglePasswordVisibility}
                />
                </Form.Group>
                <Button className={'mb-3'} variant="primary" type="submit">Submit</Button>
            </Form>
            </Col>    
            </Row>
        </Container>
    )
}
export default LoginForm;