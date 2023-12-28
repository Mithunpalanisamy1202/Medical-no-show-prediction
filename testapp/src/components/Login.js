import { useState } from "react";
import axios from "axios";
import logo from "./logo.png";
import "./style.css";
import Signup from "./Signup";
function Login({ isOpen, onClose, setShowTrigger,setShowLogin,setShowLogout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    console.log("UserName:", email);
    console.log("Password:", password);

    axios
      .post("http://localhost:5000/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        if (response.data === "Login Successful") {
          setEmail("");
          setPassword("");
          setShowTrigger(true);
          setShowLogin(false);
          setShowLogout(true);
          onClose();
        } else {
          setPasswordError("Invalid Username or Password");
          // setPasswordError("Please create an account to continue..");
        }
      })
      .catch((error) => {
        console.error(error);
      });
      
  };

  const [activeLogin, setActiveLogin] = useState(1);
  const handleLoginChange = (tabIndex) => {
    setActiveLogin(tabIndex);
  };

  return isOpen ? (
    <>
      <div className="  container-fluid d-flex center">
        <div className="first1  d-flex">
          <div className="logo1 mt-5 text-center">
            <img className="fblogo1 img-fluid" src={logo} alt="Logo"></img>
          </div>
          <p className="fb_content1 mt-5 text-center">
            Your Most Trusted<br></br> Health Partner.
          </p>
        </div>

        <div className="tab-content ">
          <div className={`tab-pane fa1 ${activeLogin === 1 ? "active" : ""}`}>
            <form className="form_d1">
              <h2 className="text-center">Login</h2>
              <div className="mb-3 m-3">
                <input
                  value={email}
                  className="form-controll1 form-control"
                  name="email"
                  placeholder="Username"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {emailError && (
                  <label className="errorLabel">{emailError}</label>
                )}
              </div>
              <div className="mb-3 m-3">
                <input
                  value={password}
                  type="password"
                  className="form-controll1 form-control"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                {passwordError && (
                  <label className="errorLabel">{passwordError}</label>
                )}
              </div>
              <div className="m-3 text-center">
                <button
                  id="login"
                  className="btnl1 btn-primary btn-block"
                  value={"Login"}
                  type="button"
                  onClick={onButtonClick}
                >
                  Login
                </button>
              </div>

              <div className="text-center mt-3">
                <a href="#">Forgotten password?</a>
              </div>
              <hr></hr>
              <div className="text-center">
                <button
                  className={`ca1 ${activeLogin === 2 ? "active" : ""}`}
                  type="button"
                  value="Create New Account"
                  onClick={() => handleLoginChange(2)}
                >
                  Create New Account
                </button>
              </div>
            </form>{" "}
          </div>
          <div className={`tab-pane ${activeLogin === 2 ? "active" : ""}`}>
            <div className="fa2 col-sm-12 col-md-6">
              <Signup handleLoginClick={() => handleLoginChange(1)} />
            </div>
          </div>
        </div>
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
      </div>
    </>
  ) : (
    ""
  );
}

export default Login;
