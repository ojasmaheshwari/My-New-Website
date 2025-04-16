import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PopUpContext } from "./popupcontext";

const PopUp = () => {
  const [popUpData, setPopUpData, popUpShown, setIsPopUpShown] =
    useContext(PopUpContext);
  const togglePopUp = () => setIsPopUpShown(!popUpShown);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsPopUpShown(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [popUpShown]);

  if (!popUpShown) {
    return null;
  }

  return (
    <div className="popup-container border-2 border-black p-2 min-w-64 fixed bottom-4 right-2 rounded-md px-4">
      <div className="popup-tab w-full flex items-center justify-end">
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
  );
};

export default PopUp;
