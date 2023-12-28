import "./Form.css";
import { useState } from "react";
import Sticky from "./Sticky";
import Heading from "./Heading";
import Display from "./Display";
import HeadingTabs from "./HeadingTabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [conditionsError, setConditionsError] = useState("");

  const [appoinmentDate, setAppoinmentDate] = useState("");
  const [appoinmentDateError, setAppoinmentDateError] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityError, setSelectedCityError] = useState("");
  const [file, setFile] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [content, setContent] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form1Completed, setForm1Completed] = useState(false);
  const [form2Completed, setForm2Completed] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [availableslot, setAvailableslot] = useState(true);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [form1Data, setForm1Data] = useState({
    name: "",
    age: "",
    dob: "",
    address: "",
    city: "",
  });
  const [form2Data, setForm2Data] = useState({
    gender: "",
    hypertension: "",
    diabetes: "",
    alcoholism: "",
    handicap: "",
    appoinmentDate: "",
    selectedCity: "",
  });
  const [form3Data, setForm3Data] = useState({
    file: "",
    description: "",
  });

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleForm1Submit = (e) => {
    e.preventDefault();
    setNameError("");
    setAgeError("");
    setDobError("");
    setAddressError("");
    setCityError("");
    const formData = {
      name: e.target.elements.name.value,
      age: e.target.elements.age.value,
      dob: e.target.elements.dob.value,
      address: e.target.elements.address.value,
      city: e.target.elements.city.value,
    };
    if ("" === name) {
      setNameError("Please enter your name");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Name should not contain special characters");
      return;
    }

    if ("" === age) {
      setAgeError("Please enter your age");
      return;
    }

    if (age >= 150 || age <= 0) {
      setAgeError("Provide a valid age");
      return;
    }

    if ("" === dob) {
      setDobError("Please enter your dob");
      return;
    }

    const currentYear = new Date().getFullYear();
    const dobYear = new Date(dob).getFullYear();

    if (dobYear >= currentYear) {
      setDobError("Provide valid DOB");
      return;
    }

    if ("" === address) {
      setAddressError("Please enter your address");
      return;
    }
    if ("" === city) {
      setCityError("please enter a city");
      return;
    }

    if (name && age && dob && address && city) {
      setForm1Completed(true);
    } else {
      setForm1Completed(false);
    }
    setForm1Data(formData);
    handleTabChange(2);
  };

  const handleForm2Submit = (e) => {
    e.preventDefault();
    setGenderError("");
    setAppoinmentDateError("");
    setSelectedCityError("");

    const formData = new FormData(e.target);
    const newGender = formData.get("gender");
    const cliniclocation = formData.get("selectedCity");
    const appoinmentDate = formData.get("appoinmentDate");

    if (!newGender) {
      setGenderError("Please select gender");
      return;
    }

    if (
      !formData.get("hypertension") &&
      !formData.get("diabetes") &&
      !formData.get("alcoholism") &&
      !formData.get("handicap")
    ) {
      setConditionsError("Please select at least one condition");
      return;
    }
    if ("" === appoinmentDate) {
      setAppoinmentDateError("Please choose Appoinment Date");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(appoinmentDate);

    if (selectedDate <= today) {
      setAppoinmentDateError("Please provide valid date");
      return;
    }

    if ("" === selectedCity) {
      setSelectedCityError("Select City");
      return;
    }

    const hypertension = formData.get("hypertension") === "on" ? 1 : 0;
    const diabetes = formData.get("diabetes") === "on" ? 1 : 0;
    const alcoholism = formData.get("alcoholism") === "on" ? 1 : 0;
    const handicap = formData.get("handicap") === "on" ? 1 : 0;
    setGender(newGender);

    setForm2Data({
      gender1: newGender[0],
      hypertension: hypertension,
      diabetes: diabetes,
      alcoholism: alcoholism,
      handicap: handicap,
      clinic_location: cliniclocation,
      appoinmentDate: appoinmentDate,
    });
    if (
      newGender &&
      (hypertension !== "" ||
        diabetes !== "" ||
        alcoholism !== "" ||
        handicap !== "") &&
      cliniclocation &&
      appoinmentDate
    ) {
      setForm2Completed(true);
    } else {
      setForm2Completed(false);
    }

    handleTabChange(3);
  };

  const handleForm3Submit = (e) => {
    e.preventDefault();

    const formData = {
      file: file,
      description: e.target.elements.description.value,
    };

    setForm3Data(formData);

    const data1 = {
      ...form1Data,
      ...form2Data,
      ...form3Data,
    };

    const data = {
      Age: form1Data.age,
      Gender: form2Data.gender1,
      Hypertension: form2Data.hypertension,
      Diabetes: form2Data.diabetes,
      Alcoholism: form2Data.alcoholism,
      Handicap: form2Data.handicap,
      Cliniclocation: form2Data.clinic_location,
      AppoinmentDate: form2Data.appoinmentDate,
    };
    axios
      .post("http://localhost:5000/form", data)
      .then((response) => {
        if (response.data && response.data.message) {
          setAvailableslot(true);
          setAvailableSlots(response.data.message);
          setLoading1(false);
        } else {
          setAvailableslot(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading1(false);
      });

    console.log("Form Data:", data1);
    setFormSubmitted(true);
    setForm1Completed(false);
    setForm2Completed(false);
    handleTabChange(1);

    setPopupMessage("Appoinment has been booked successfully!");
    setTimeout(() => {
      setPopupMessage("");
    }, 1000);

    e.target.reset();
    setFile("");
    setName("");
    setAge("");
    setDob("");
    setAddress("");
    setCity("");
    setGender("");
    setAppoinmentDate("");
    setSelectedCity("");
    setForm1Data({
      name: "",
      age: "",
      dob: "",
      address: "",
    });
    setForm2Data({
      gender: "",
      hypertension: "",
      diabetes: "",
      alcoholism: "",
      handicap: "",
      clinic_location: "",
      appoinmentDate: "",
    });
    setForm3Data({
      file: "",
      description: "",
    });

    setActiveTab(4);
  };

  const handleSlotSelection = (slot) => {
    setConfirmPopup(true);
    setContent(slot);
  };
  const handleModelExplainability = () => {
    navigate("/model");
  };

  return (
    <>
      <Sticky />
      <Heading showLogin={false} />

      <HeadingTabs showForm={true} />

      <div className="nf01">
        <div
          className={` d-flex nbar`}
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className={` btn btnf02   ${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Personal info
          </button>

          <button
            className={` btn btnf02 ${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleTabChange(2)}
          >
            Conditions
          </button>

          <button
            className={` btn btnf02  ${activeTab === 3 ? "active" : ""}`}
            onClick={() => handleTabChange(3)}
          >
            Verification
          </button>
          {formSubmitted && (
            <button
              className={`btn btnf02 ${activeTab === 4 ? "active" : ""} `}
              type="button"
              onClick={() => handleTabChange(4)}
            >
              Appoinment
            </button>
          )}
          {formSubmitted && (
            <button
              className={`btn btnf02 ${activeTab === 5 ? "active" : ""} `}
              type="button"
              onClick={() => handleTabChange(5)}
            >
              Previous Details
            </button>
          )}
        </div>
      </div>
      <div className="tab-content f01">
        <div className={`tab-pane ${activeTab === 1 ? "active" : ""}`}>
          <form className="formf01 " onSubmit={handleForm1Submit}>
            <div className="m-2 p-2">
              <label htmlFor="name" className="lf1">
                Name:
              </label>
              <br />
              <input
                type="text"
                className="p-2 mt-2 fname form-control"
                name="name"
                value={name}
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <label className="errorLabel">{nameError}</label>}
            </div>
            <div className="column justify-content-start d-flex ">
              <div className="m-2 p-2">
                <label htmlFor="age" className="lf1">
                  Age:
                </label>
                <br />

                <input
                  type="number"
                  className="p-2 mt-2 fname form-control"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter Your Age"
                />
                {ageError && <label className="errorLabel">{ageError}</label>}
              </div>

              <div className="mt-2 p-2">
                <label htmlFor="dob" className="lf1">
                  Date of Birth:
                </label>
                <br />
                <input
                  className="p-2 mt-2 fname form-control"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  name="dob"
                />
                <label className="errorLabel">{dobError}</label>
              </div>
            </div>
            <div>
              <label htmlFor="address" className="m-2 p-2 lf1">
                Address:
              </label>
              <br />
              <div className="column m-21 d-flex">
                <div className="p-2 m-2">
                  <input
                    type="text"
                    className="p-2 form-control"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Door.No/Street"
                  />
                </div>
                <div className="p-2 m-2">
                  <input
                    type="text"
                    className="fname p-2 form-control"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>
              </div>
              <div style={{ marginLeft: "1.5rem" }}>
                {addressError && (
                  <label className="errorLabel">{addressError}</label>
                )}
                {cityError && <label className="errorLabel">{cityError}</label>}
              </div>
            </div>
            <button className="btn btnf01 mt-4" type="submit">
              Next
            </button>
            {/* {(resultSuccess || resultFailed) && <div className={`alert ${resultSuccess ? 'alert-success' : 'alert-danger'}`}>{resultSuccess || resultFailed}</div>} */}
          </form>
        </div>

        <div className={`tab-pane ${activeTab === 2 ? "active" : ""}`}>
          <form className="formf01" onSubmit={handleForm2Submit}>
            <div>
              <label htmlFor="gender" className="lf1">
                Gender:
              </label>
              <br />
              <div className="m-2 ">
                <label className="m-2 ">
                  <input
                    type="radio"
                    className="m-2"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Male
                </label>
                <label className="m-2 ">
                  <input
                    type="radio"
                    className="m-2 "
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Female
                </label>
              </div>
              {genderError && (
                <label className="errorLabel">{genderError}</label>
              )}
            </div>
            <label htmlFor="Conditions" className="lf1">
              Conditions:
            </label>
            <div className="m-2">
              <div className="m-2">
                <input className="m-2" type="checkbox" name="hypertension" />
                <label className="m-2" htmlFor="hypertension">
                  Hypertension
                </label>
              </div>
              <div className="m-2">
                <input className="m-2" type="checkbox" name="diabetes" />
                <label className="m-2" htmlFor="diabetes">
                  Diabetes
                </label>
              </div>
              <div className="m-2 ">
                <input className="m-2" type="checkbox" name="alcoholism" />

                <label className="m-2" htmlFor="alcoholism">
                  Alcoholism
                </label>
              </div>
              <div className="m-2">
                <input className="m-2" type="checkbox" name="handicap" />
                <label className="m-2" htmlFor="handicap">
                  Handicap
                </label>
              </div>
              {conditionsError && (
                <label className="errorLabel">{conditionsError}</label>
              )}
            </div>

            <div className="d-flex">
              <div className="ms-2">
                <label htmlFor="appoinmentDate" className="lf1">
                  Appoinment
                </label>
                <br />
                <input
                  className="p-2 fname form-control"
                  type="date"
                  name="appoinmentDate"
                  value={appoinmentDate}
                  onChange={(e) => setAppoinmentDate(e.target.value)}
                />
                <br></br>
                {appoinmentDateError && (
                  <label className="errorLabel">{appoinmentDateError}</label>
                )}
              </div>

              <div className="ms-5 ps-5">
                <label htmlFor="selectedCity" className="lf1">
                  Clinic Location
                </label>
                <select
                  className="p-2 fname form-control"
                  name="selectedCity"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">--choose one--</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Noida">Noida</option>
                  <option value="Pune">Pune</option>
                </select>
                <br></br>
                {selectedCityError && (
                  <label className="errorLabel">{selectedCityError}</label>
                )}
              </div>
            </div>

            <div className="d-flex mt-3">
              <button
                className={`btn btnf01 ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleTabChange(1)}
                type="button"
              >
                Prev
              </button>
              <button className="btn btnf01 justify-content-end" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
        <div className={`tab-pane ${activeTab === 3 ? "active" : ""}`}>
          <form className="formf01" onSubmit={handleForm3Submit}>
            <div className="m-2">
              <label className="m-2 lf1" htmlFor="file">
                Upload Documents (".pdf, .jpg, .jpeg, .png")
              </label>
              <br />
              <input
                className="m-2"
                type="file"
                name="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </div>
            <div className="m-2">
              <label className="m-2 lf1" htmlFor="description">
                Description
              </label>
              <br />
              <textarea
                name="description"
                className="m-2 df"
                placeholder="Give a detail about the issues"
              />
            </div>

            <button
              type="submit"
              className="btn m-2 btn-primary"
              disabled={!(form1Completed && form2Completed)}
            >
              Submit
            </button>

            <button
              className={`btn btnf01 ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabChange(2)}
              type="button"
            >
              Prev
            </button>
            {formSubmitted && (
              <button
                className="btn btnf01 justify-content-end"
                type="button"
                onClick={() => handleTabChange(4)}
              >
                Previous Details
              </button>
            )}
          </form>
        </div>
        {popupMessage && <div className="popup1">{popupMessage}</div>}

        <div className={`tab-pane ${activeTab === 4 ? "active" : ""}`}>
          {loading1 ? (
            <div className="loader">
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : availableslot && availableSlots.length > 0 ? (
            <div className="m-2 slots">
              <label className="m-2 lf1">Select Appointment Time:</label>
              <p style={{color:'black'}}>The Slots are only for the patients those who shows:</p>
              <div className="">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className="form-button m-2"
                    onClick={() => handleSlotSelection(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="slots1 alert alert-danger text-center">
              <p>Sorry! No slots available</p>
            </div>
          )}
          {confirmPopup && (
            <div className="confirm m-2 p-4">
              {" "}
              <svg
                className="checkmark "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                {" "}
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />{" "}
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
              <h3 className="pt-5">
                Your Appoinment has been booked between {content}
              </h3>
            </div>
          )}
          <div className="model-explain">
            <button
              className="bn39 "
              onClick={() => handleModelExplainability()}
            >
              <span className="bn39span">Model Explainability</span>
            </button>
          </div>
        </div>
        <div className={`tab-pane ${activeTab === 5 ? "active" : ""}`}>
          <div className="formf01">
            <h2 className="text-center">Details</h2>
            <Display />
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
