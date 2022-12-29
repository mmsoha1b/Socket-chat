import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
const NavBar=()=>{
  const navigate = useNavigate();
    return(
        <>
        <Navbar  expand="lg" style={{backgroundColor:'#3feee6'}}>
        <Container>
        <LinkContainer to="/">
          <Navbar.Brand >Socket Chat</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            <LinkContainer to ="/">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link className=''>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chat-room">
              <Nav.Link className=''>Chat Room</Nav.Link>
            </LinkContainer>
          </Nav>
          { localStorage.getItem('user')? <Button variant='danger' onClick={()=>navigate('logout')}>Log out</Button>:''}
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}
export default NavBar;