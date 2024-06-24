import { createContext, useEffect, useState } from "react";
import fetchProfile from "./fetchprofile";

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
	const [profile, setProfile] = useState(null);
	
	useEffect(() => {
		const waitForProfile = async () => {
			const profile = await fetchProfile();
			if (profile) {
				setProfile(profile);
			}
		}

		waitForProfile();
	}, []);

	return (
		<ProfileContext.Provider value={[profile, setProfile]}>
			{children}
		</ProfileContext.Provider>
	)
}
