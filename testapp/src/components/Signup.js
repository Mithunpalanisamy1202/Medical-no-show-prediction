import { useState } from "react";
import "./Signup.css";
import axios from "axios";

function Signup({ handleLoginClick }) {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [emailId, setEmailid] = useState("");
  const [emailIdError, setEmailidError] = useState("");

  const [password1, setpassword1] = useState("");
  const [password1Error, setpassword1Error] = useState("");

  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState("");



  const onSignup = ({ onClose }) => {
    setEmailidError("");
    setFirstNameError("");
    setLastNameError("");
    setpassword1Error("");
    setPassword2Error("");
    

    if ("" === firstName) {
      setFirstNameError("Please Enter Firstname");
      return;
    }

    if ("" === lastName) {
      setLastNameError("Please enter lastname");
      return;
    }

    if ("" === emailId) {
      setEmailidError("please enter Email Id");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailId)) {
      setEmailidError("Please enter a valid email");
      return;
    }

    if ("" === password1) {
      setpassword1Error("Please provide a password");
      return;
    }

    if ("" === password2) {
      setPassword2Error("Please provide a password");
      return;
    }
    if (password1.length < 8) {
      setpassword1Error("The password must be 8 characters or longer");
      return;
    }

    if (password2.length < 8) {
      setPassword2Error("The password must be 8 characters or longer");
      return;
    }

    if (password1 !== password2) {
      setPassword2Error("Passwords do not match");
      return;
    }

   
   
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", emailId);
    console.log("Password:", password1);
 
    axios
      .post("http://localhost:5000/signup", {
        username: emailId,
        password: password1,
      })
      .then((response) => {
        if (response.data.message === "Registration successful") {
          setFirstName("");
          setLastName("");
          setEmailid("");
          setpassword1("");
          setPassword2("");
          
          handleLoginClick();
        } else if (response.data.message === "Username already exists") {
          setEmailidError("Emailid already exists");
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="fa2 ">
        <form className="form_d2 text-center">
          <h2>Sign up</h2>

          <div className="d-flex">
            <div className="m-3">
              <input
                type="text"
                className="form-control1 form-control p-2 sother"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameError && (
                <label className="errorLabel">{firstNameError}</label>
              )}
            </div>
            <div className="m-3">
              <input
                type="text"
                className="form-control1 form-control p-2 sother "
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameError && (
                <label className="errorLabel">{lastNameError}</label>
              )}
            </div>
          </div>

          <div className="m-3">
            <input
              type="email"
              className="form-control1 p-2 form-control signother"
              name="email"
              value={emailId}
              placeholder="Email Id"
              onChange={(e) => setEmailid(e.target.value)}
            />
          </div>
          {emailIdError && <label className="errorLabel">{emailIdError}</label>}

          <div className="m-3">
            <input
              type="password"
              className="form-control1 p-2 form-control signother"
              name="password"
              placeholder="Enter Password"
              value={password1}
              onChange={(e) => setpassword1(e.target.value)}
            />
          </div>
          {password1Error && (
            <label className="errorLabel">{password1Error}</label>
          )}

          <div className="m-3">
            <input
              type="password"
              className="form-control1 p-2 form-control signother "
              name="re-password"
              value={password2}
              placeholder="Re-Enter Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          {password2Error && (
            <label className="errorLabel">{password2Error}</label>
          )}

         
          <div className="m-3 text-center">
            <button
              id="Signup"
              className="btns1 btn-primary btn-block"
              onClick={onSignup}
              name="login"
              type="button"
            >
              Signup
            </button>
          </div>
          <hr></hr>
          <div className="text-center">
            <button className="ca1" type="button" onClick={handleLoginClick}>
              Already have an account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signup;
