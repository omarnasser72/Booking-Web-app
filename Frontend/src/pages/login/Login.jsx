import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { API_URL } from "../../config";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  console.log(credentials);
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGINSTART" });
    try {
      const res = await axios.post(`/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FALIURE", payload: error.response.data });
    }
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          className="loginInput"
          id="username" // e.target.username = username
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="password"
          className="loginInput"
          id="password" // e.target.password = password
          placeholder="password"
          onChange={handleChange}
        />
        <button className="loginBtn" disabled={loading} onClick={handleClick}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
