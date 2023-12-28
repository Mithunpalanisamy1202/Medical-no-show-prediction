function Sticky(){
    return(
        <>
<div className="container-fluid ch1">
        <nav className="navbar container p-2 stick sticky-top">
          <div>
            <a className="navbar-brand a01" >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/gmail-new.png"
                alt="gmail"
              />{" "}
              samplemail@domain.com
            </a>
            <a className="navbar-brand a01" >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/find-clinic.png"
                alt="find-clinic"
              />
              Shollinganallur,Chennai
            </a>
          </div>
          <div className="gap-5">
            <a className="navbar-brand me-5 a01" href="tel:9876543210">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/apple-phone.png"
                alt="apple-phone"
              />{" "}
              9876543210
            </a>
          </div>
        </nav>
      </div>
      </>
    );
}

export default Sticky;