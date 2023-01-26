import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";

const LogOut = () => {
  const navigate = useNavigate();
  loginService.logOut();
  useEffect(() => {
    navigate("/");
  });
};

export default LogOut;
