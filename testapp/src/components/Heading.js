import { Link } from "react-router-dom";
import logo from "./logo.png";



function Heading({showLogin , onLoginClick ,showLogout,onLogoutclick}){
    

    return(
        <>
        <div className="container gap-5 d-flex ">
        <nav className="navbar navbar-expand-lg headsp">
          <a className="navbar-brand l01 align-items-center margin " >
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="85"
              className="d-inline-block align-text-top"
            />
            SAMPLE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse listh navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  Services
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Department
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" >
                    Opthomology
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" >
                      Cardiology
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" >
                      Others
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Doctors
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" >
                      Ashok
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" >
                      Thomas
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" >
                      Hussain
                    </a>
                  </li>
                </ul>
              </li>
              
            </ul>
            <div className="navbar-brand navbar a01">
            {showLogin && (            
              <button className="btn btnh btn-secondary" onClick={onLoginClick}>Login</button>
            )
            }
            </div>
            <div className="navbar-brand navbar a01">
            {showLogout && (            
              <button className="btn btnh btn-secondary" onClick={onLogoutclick}>Logout</button>
            )
            }
            </div>


           
          </div>
        </nav>
      </div>
        </>
    )
}

export default Heading;