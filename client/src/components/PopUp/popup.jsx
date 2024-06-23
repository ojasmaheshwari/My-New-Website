import React from 'react'
import { RxCross2 } from "react-icons/rx"
import './popup.css'

const PopUp = ({ heading, description, show, onClose }) => {

    if (!show) {
        return null;
    }

    return (
        <div className='overlay-full'>
            <div className='popup-container'>
                <div className='popup-tab'>
                    <RxCross2 className='popup-cross-icon' onClick={onClose} />
                </div>
                <div className='popup-heading'>
                    <h3>{heading}</h3>
                </div>
                <div className='popup-description'>
                    <span>
                        {description}
                    </span>
                </div>
                <div className='popup-actions'>
                    <button className='popup-button-ok' onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopUp