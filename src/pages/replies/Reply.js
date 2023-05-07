import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import ReplyEditForm from "./ReplyEditForm";

// React Bootstrap imports
import Card from "react-bootstrap/Card";

function Reply(props) {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    comment,
    setComments,
    setReplies,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/replies/${id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((current) => {
          return current.id === comment
            ? {
                ...current,
                replies_count: current.replies_count - 1,
              }
            : current;
        }),
      }));
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: prevReplies.results.filter((reply) => reply.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card.Body className={`${styles.ReplyBody}`}>
      <div className="d-flex">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="flex-grow-1 text-start">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <ReplyEditForm
              id={id}
              content={content}
              setShowEditForm={setShowEditForm}
              setReplies={setReplies}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </Card.Body>
  );
}

export default Reply;
