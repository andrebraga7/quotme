import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentEditForm from "./CommentEditForm";

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

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card.Body className={`${styles.CommentBody}`}>
      <div className="d-flex">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="flex-grow-1 text-start">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              content={content}
              setShowEditForm={setShowEditForm}
              setComments={setComments}
            />
          ) : (
            <p>{content}</p>
          )}
          <span className={styles.ReplyIcon}>
            <i className="fa-solid fa-reply"></i>
            {replies_count}
            {replies_count > 0 ? "View all replies" : null}
          </span>
          <span className={styles.Reply}>Reply</span>
        </div>
        <span onClick={() => setShowEditForm(true)}>Edit</span>
      </div>
      <hr />
    </Card.Body>
  );
}

export default Comment;
