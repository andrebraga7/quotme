import React, { useEffect, useState } from "react";
import Asset from "../../components/Asset";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ProfileQuotes from "./ProfileQuotes";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [quotes, setQuotes] = useState({ results: [] });
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const owner = profileData?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profileData }, { data: quotesData }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/quotes/?owner__profile=${id}`),
        ]);
        setProfileData(profileData);
        setQuotes(quotesData);
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
          <ProfileQuotes quotes={quotes} setQuotes={setQuotes} owner={owner} />
        </>
      ) : (
        <Asset spinner />
      )}
    </>
  );
}

export default ProfilePage;
