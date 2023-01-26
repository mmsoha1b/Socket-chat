import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import ChatRoom from "./components/ChatRoom";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginForm users={users} />}></Route>
        <Route path='/chat-room' element={<ChatRoom />}></Route>
        <Route
          path='/register'
          element={<SignUp setUsers={setUsers} users={users} />}
        ></Route>
        <Route path='/logout' element={<LogOut />}></Route>
      </Routes>
    </>
  );
}

export default App;
