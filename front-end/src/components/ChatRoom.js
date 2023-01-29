import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Message from "./Message";
import messageService from "../services/messageService";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const msgboxRef = useRef();
  const socket = io("/");
  socket.on("broadcastMessage", (message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
  });
  const scrollToBottom = () => {
    msgboxRef.current.scrollIntoView();
  };
  const postMessage = async (event) => {
    event.preventDefault();
    const messageInput = event.target.parentNode.firstChild;
    const user = JSON.parse(localStorage.getItem("user"));
    const newMessage = { text: messageInput.value, userId: user.id };
    const savedMessage = await messageService.postMessage(newMessage);
    messageInput.value = "";
    socket.emit("postMessage", savedMessage);
  };
  useEffect(() => {
    messageService.getMessages().then((allMesaages) => {
      setMessages(allMesaages.messages);
    });
  }, []);
  useEffect(() => {
    scrollToBottom();
  });
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='chat-room mt-5'>
              <div>
                {messages.length > 0
                  ? messages.map((message) => (
                      <Message
                        key={message.id}
                        text={message.text}
                        user={message.user}
                      ></Message>
                    ))
                  : ""}
              </div>
              <div>
                {/*MAke this container jump to bottom whwn new mwssage send*/}

                <Container
                  style={{ position: "sticky", bottom: "0px" }}
                  className='mt-auto'
                  ref={msgboxRef}
                >
                  <Row>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        aria-label='Type message'
                        aria-describedby='Enter message'
                      />
                      {localStorage.getItem("user") &&
                      localStorage.getItem("userToken") ? (
                        <Button variant='primary' onClick={postMessage}>
                          Send message
                        </Button>
                      ) : (
                        <Button variant='primary' disabled>
                          Send message
                        </Button>
                      )}
                    </InputGroup>
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ChatRoom;
