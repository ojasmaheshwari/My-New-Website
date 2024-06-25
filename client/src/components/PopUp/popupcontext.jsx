import React, {createContext, useState} from "react";

export const PopUpContext = createContext();

export const PopUpProvider = ({children}) => {
	const [popUpData, setPopUpData] = useState({});
	const [popUpShown, setIsPopUpShown] = useState(false);

	return (
		<PopUpContext.Provider value={[popUpData, setPopUpData, popUpShown, setIsPopUpShown]}>
		{children}
		</PopUpContext.Provider>
	)
}
