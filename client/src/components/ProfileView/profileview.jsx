import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../services/ProfileContext";

const ProfileView = () => {
	const params = useParams();
	const [profile, setProfile]= useContext(ProfileContext);

	return (
		<div className="profileview-main">
			
		</div>
	);
};

export default ProfileView;
