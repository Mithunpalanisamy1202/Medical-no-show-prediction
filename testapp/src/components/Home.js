import { useNavigate } from "react-router-dom";
import "./Home.css";
import Login from "./Login";
import Sticky from "./Sticky";
import React, { useState } from "react";
import Heading from "./Heading";

function Home() {
  const navigate = useNavigate();
  const handletoForm = (e) => {
    e.preventDefault();
    if(showTrigger){
    // setShowLogin(false);
    // setShowLogout(true);
    navigate("/form");
    }
    else{
      setLoginOpen(true);
    }
    
  };

  
  const [loginOpen, setLoginOpen] = useState(false);
  const[showLogin,setShowLogin]=useState(true);
  const[showLogout,setShowLogout]=useState(false);
  const[showTrigger,setShowTrigger]=useState(false);
    const handleLoginClick = () => {
      setLoginOpen(true);
      // setShowLogin(false);
      // setShowLogout(true);
    };

    const handleLogout=(e)=>{
      e.preventDefault();
      setShowLogout(false);
      setShowTrigger(false);
      setShowLogin(true);

    }
  
    const handleCloseLogin = () => {
      setLoginOpen(false);
      
    };
    const handletoChart = ()=>{
      navigate('/chart');
    }
  return ( 
    <>
   <Sticky/>
    <Heading showLogin={showLogin} onLoginClick={handleLoginClick} showLogout={showLogout} onLogoutclick={handleLogout}/>

      <div className="back">
        <div className="container pt-5">
          <h2 style={{ color: " rgb(226, 61, 83)" }}>---</h2>
          <p style={{ color: " #FFFDD0" }}>TOTAL HEALTH CARE SOLUTION</p>
          <h1 style={{ color: " #FFFDD0" }} className="home_h1">
            Your Most Trusted <br></br>Health Partner
          </h1>
          <br />
          <button onClick={handletoForm}
          className="btn1 btn btn-secondary">
            MAKE APPOINTMENT{" "}
          </button>
          <br />
          <br />
          <p style={{ color: " #FFFDD0" }}>
            Your health deserves the best care. Book an appointment today.
          </p>
        </div>

        <div className="container gap pt-5 row">
          <div className="card  mb-3" style={{ width: "23rem" }}>
            <div className="card-body">
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/pulsar-color/48/appointment-scheduling.png"
                alt="appointment-scheduling"
              />
              <br />
              <br />
              <p style={{ color: "#555657" }}>24 Hours Service</p>
              <h4 className="card-title">Online Appointment</h4>
              <br />
              <p style={{ color: "#555657" }} className="card-text">
                Get all time support for emergency. We have introduced the
                principle of family medicare.
              </p>
              {/* <button onClick={handletoForm} className="btn btn2 btn-secondary"> */}
              <button onClick={handletoChart} className="btn btn2 btn-secondary">
                Make appointment
              </button>
            </div>
          </div>
          <div className="card mb-3" style={{ width: "23rem" }}>
            <div className="card-body">
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/pulsar-color/48/overtime.png"
                alt="overtime"
              />
              <br />
              <br />
              <p style={{ color: "#555657" }}> Timing Schedule</p>
              <h4 className="card-title">Working Hours</h4>
              <br />
              <p style={{ color: "#555657" }} className="card-text">
                Sun - Wed: 8:00-17:00 <br />
                <br />
                Thu - Fri: 9:00-17:00
                <br />
                <br />
                Sat - Sun:10:00-17:00
                <br />
              </p>
            </div>
          </div>
          <div className="card mb-3" style={{ width: "23rem" }}>
            <div className="card-body">
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/pulsar-color/48/about-us-male.png"
                alt="about-us-male"
              />
              <br />
              <br />
              <p style={{ color: "#555657" }}>Emergency Cases</p>
              <h4 className="card-title">1800-700-0000</h4>
              <br />
              <p style={{ color: "#555657" }} className="card-text">
                Get all time support for emergency. We have introduced the
                principle of family medicine. Get Connected with us for any
                Urgency
              </p>
            </div>
          </div>
        </div>
      </div>
       <Login isOpen={loginOpen} onClose={handleCloseLogin} setShowTrigger={setShowTrigger}  setShowLogin={setShowLogin} setShowLogout={setShowLogout}/>
    </>
  );
}

export default Home;
