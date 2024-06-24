import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const fetchProfile = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/getprofile`, {
      withCredentials: true,
    });
    if (response.data.profileFound) {
      console.log("Found profile");
			return response.data.profile;
    } else {
			return null;
    }
  } catch (error) {
    console.log("Error", error);
		return null;
  }
};

export default fetchProfile;
