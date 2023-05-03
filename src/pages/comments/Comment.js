import React from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

// React Bootstrap imports
import Card from "react-bootstrap/Card";

function Comment(props) {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    replies_count,
    setQuote,
    setComments,
  } = props;

  return (
    <Card.Body className={`${styles.CommentBody}`}>
      <hr />
      <div className="d-flex">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="me-auto text-start">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
          <span className={styles.ReplyIcon}>
            <i className="fa-solid fa-reply"></i>
            {replies_count}
            {replies_count > 0 ? "View all replies" : null}
          </span>
          <span className={styles.Reply}>Reply</span>
        </div>
      </div>
    </Card.Body>
  );
}

export default Comment;
