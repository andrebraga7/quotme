import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfilePage.module.css";
import Asset from "../../components/Asset";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileData, setProfileData] = useState({});
  const { id } = useParams();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data }] = await Promise.all([axiosReq.get(`/profiles/${id}`)]);
        setProfileData(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, currentUser]);

  return (
    <>
      {hasLoaded ? (
        <>
          <Profile {...profileData} currentUser={currentUser} />
          <p>Quotes</p>
        </>
      ) : (
        <Asset spinner />
      )}
    </>
  );
}

export default ProfilePage;
