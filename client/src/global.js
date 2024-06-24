import React, {useState} from "react";

const globals = () => {
	const [options, setOptions] = useState({});
	return [options, setOptions];
}

export default globals;
