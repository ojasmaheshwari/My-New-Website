import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./popup.css";
import { PopUpContext } from "./popupcontext";

const PopUp = () => {
	const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] = useContext(PopUpContext);

	const togglePopUp = () => setIsPopUpShown(!popUpShown);

  if (!popUpShown) {
    return null;
  }

  return (
    <div className="overlay-full">
      <div className="popup-container">
        <div className="popup-tab">
          <RxCross2 className="popup-cross-icon" onClick={togglePopUp} />
        </div>
        <div className="popup-heading">
          <h3>{popUpData.heading}</h3>
        </div>
        <div className="popup-description">
          <span>{popUpData.description}</span>
        </div>
        <div className="popup-actions">
          <button className="popup-button-ok" onClick={togglePopUp}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
