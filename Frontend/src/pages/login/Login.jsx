import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  console.log(credentials);
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`/auth/login`, credentials);
      console.log(res.data);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FALIURE",
          payload: { message: "You're not authorized" },
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FALIURE", payload: error.response.data });
    }
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Welcome to My Nights</h1>
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
        <div className="registerNow">
          <pre>
            you don't have account ?{" "}
            <p
              onClick={() => {
                navigate("/register");
              }}
            >
              {" "}
              sign up{" "}
            </p>{" "}
            Now!
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Login;
