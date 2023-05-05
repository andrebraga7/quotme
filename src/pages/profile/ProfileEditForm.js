import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/ProfileEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function ProfileEditForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    image: "",
  });

  const { name, bio, image } = profileData;

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, image } = data;
          setProfileData({ name, bio, image });
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate(-1);
      }
    };

    handleMount();
  }, [currentUser, id, navigate]);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto my-auto" md={8} lg={6}>
        <Card>
          <h1 className={styles.Header}>EDIT PROFILE</h1>
          <Form>
            <Col>
              <Form.Group controlId="formFile">
                {image && <Image className={styles.Image} src={image} roundedCircle />}
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Dark} btn mt-2`}
                  >
                    Change image
                  </Form.Label>
                  <Form.Control
                    className="d-none"
                    type="file"
                    ref={imageFile}
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files.length) {
                        setProfileData({
                          ...profileData,
                          image: URL.createObjectURL(event.target.files[0]),
                        });
                      }
                    }}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col></Col>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfileEditForm;
