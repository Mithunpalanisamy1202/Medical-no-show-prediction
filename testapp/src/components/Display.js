

import React, { useState } from "react";
import Data from "./data.json";

function Display() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPage = () => {
    if (currentIndex < Data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getValue = (value) => {
    return value === 0 ? "No" : "Yes";
  };

  return (
    <div>
      {Data.length > 0 && (
        <div className="d-flex">
          <div className="ddis m-2">
            <p>Age{" "}:{" "} {Data[currentIndex].Age}</p>
            <p>Gender{" "}:{" "}{Data[currentIndex].Gender}</p>
            <p>Disease:</p>
            <ul>
              <li>
                Hypertension{" "}:{" "}{getValue(Data[currentIndex].Dis[0].Hypertension)}
              </li>
              <li>Diabetes{" "}:{" "}{getValue(Data[currentIndex].Dis[1].Diabetes)}</li>
              <li>
                Alcoholism{" "}:{" "}{getValue(Data[currentIndex].Dis[2].alcoholism)}
              </li>
              <li>Handicap{" "}:{" "}{getValue(Data[currentIndex].Dis[3].Handicap)}</li>
            </ul>
            <p>Scheduled_Date{" "}& Day:{" "}{Data[currentIndex].Scheduled_Date}{" "},{" "}{Data[currentIndex].Scheduled_Day}</p>
            <p>Appointment_Date{" "}& Day:{" "}{Data[currentIndex].Appointment_Date}{" "},{" "}{Data[currentIndex].Appointment_Day}</p>
            </div>
            <div>
            <p>Employment{" "}:{" "}{Data[currentIndex].Employment}</p>
            <p>Location{" "}:{" "}{Data[currentIndex].Location}</p>
            <p>Clinic_Location{" "}:{" "}{Data[currentIndex].Clinic_Location}</p>
            <p>Appointment_Hour{" "}:{" "}{Data[currentIndex].Appointment_Hour}</p>
          </div>
        </div>
      )}
      <div className="dbtn">
        <button
          className="btn btnf01 justify-content-end"
          onClick={handlePrevPage}
          disabled={currentIndex === 0}
        >
          Previous Page
        </button>
        <h6>{currentIndex + 1}</h6>
        <button
          className="btn btnf01 justify-content-end"
          onClick={handleNextPage}
          disabled={currentIndex === Data.length - 1}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Display;
