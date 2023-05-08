import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { ProfileDropdown } from "../../components/MoreDropdown";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Profile(props) {
  const {
    id,
    owner,
    name,
    bio,
    image,
    is_owner,
    following_id,
    quotes_count,
    followers_count,
    following_count,
    currentUser,
  } = props;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto" sm={10} md={8} lg={6}>
        <Row className="align-items-center">
          <Col sm={12} md={5}>
            <Image src={image} className={styles.ProfileImage} roundedCircle />
          </Col>
          <Col className="text-sm-start">
            <span className={styles.Title}>{owner}</span>
            <div className="mt-2">
              {name ? <span className={styles.Name}>{name}</span> : null}
              {bio ? (
                <p className={styles.Bio}>"{bio}"</p>
              ) : (
                <p className={styles.Bio}>"No bio yet..." </p>
              )}
            </div>
            {currentUser &&
              !is_owner &&
              (following_id ? (
                <Button
                  className={`${btnStyles.Follow} ${btnStyles.Dark}`}
                  onClick={() => handleUnfollow(following_id)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  className={`${btnStyles.Follow} ${btnStyles.Dark}`}
                  onClick={() => handleFollow(id)}
                >
                  Follow
                </Button>
              ))}
            {is_owner && <ProfileDropdown id={id} />}
          </Col>
        </Row>
        <Container
          className={`${styles.InfoContainer} d-flex justify-content-evenly mb-3`}
        >
          <div className={styles.Info}>
            <span>{quotes_count}</span>
            <span>quotes</span>
          </div>
          <div className={styles.Info}>
            <span>{followers_count}</span>
            <span>followers</span>
          </div>
          <div className={styles.Info}>
            <span>{following_count}</span>
            <span>following</span>
          </div>
        </Container>
      </Col>
    </Row>
  );
}

export default Profile;
