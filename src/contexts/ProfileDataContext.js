import { createContext, useContext, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile,
      });
      setProfileData((prevState) => ({
        ...prevState,
        followers_count: prevState.followers_count + 1,
        following_id: data.id,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (following_id) => {
    try {
      await axiosRes.delete(`/followers/${following_id}`);
      setProfileData((prevState) => ({
        ...prevState,
        followers_count: prevState.followers_count - 1,
        following_id: null,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
