import { useEffect, useState } from "react";
import "./register.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { userInputs } from "../../formSource";
const Register = () => {
  const location = useLocation();
  console.log(location);
  const [email, setEmail] = useState(
    location.state ? location.state.Email : "example@example.com"
  );
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [usernameErr, setUsernameErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [phoneErr, setPhoneErr] = useState();
  const [passErr, setPassErr] = useState();
  const [countryErr, setCountryErr] = useState();
  const [cityErr, setCityErr] = useState();
  const [ageErr, setAgeErr] = useState();

  useEffect(() => {
    if (error.includes("city")) setCityErr("this field is required");
  }, [error]);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        ...info,
        email: email,
        img: file.name,
      };
      const res = await axios.post("/auth/signup", newUser);
      console.log(res);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="register">
      <h1>Welcome to My Nights</h1>
      <h1>Register</h1>
      <div className="registerContainer">
        <form>
          <div className="registerForm">
            <div className="profileImg">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-18.jpg"
                }
                alt=""
              />
              <label htmlFor="file">
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="userInfo">
              {userInputs?.map((input) =>
                input.label !== "Email" && location.state !== null ? (
                  <div className="eachInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="eachInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      value={email}
                      id={input.id}
                      onChange={handleEmailChange}
                    />
                  </div>
                )
              )}
              <div className="submitBtn">
                <button onClick={handleSubmission}>Submit</button>
              </div>
              {/* {error && (
                <div>
                  <p>{error.response.data.message}</p>
                </div>
              )} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
