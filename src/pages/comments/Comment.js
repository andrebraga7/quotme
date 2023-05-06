import React, { useEffect, useState } from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentEditForm from "./CommentEditForm";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

// React Bootstrap imports
import Card from "react-bootstrap/Card";
import ReplyCreateForm from "../replies/ReplyCreateForm";

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
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [replies, setReplies] = useState({ results: [] });

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setQuote((prevQuote) => ({
        results: [
          {
            ...prevQuote.results[0],
            comments_count: prevQuote.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/replies/?comment=${id}`);
        setReplies(data);
      } catch (error) {
        console.log(error);
      }
    };

    handleMount();
  }, [id, setComments]);

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
            {replies_count > 0 ? (
              <span
                className={styles.ViewReplies}
                onClick={() => setShowReplies((showReplies) => !showReplies)}
              >
                View all replies
              </span>
            ) : null}
          </span>
          {currentUser && (
            <span
              className={styles.Reply}
              onClick={() =>
                setShowReplyForm((showReplyForm) => !showReplyForm)
              }
            >
              Reply
            </span>
          )}
        </div>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </div>
      {showReplyForm && (
        <ReplyCreateForm
          setShowReplyForm={setShowReplyForm}
          setReplies={setReplies}
          comment={id}
          setComments={setComments}
        />
      )}
      {showReplies && <>Replies</>}
      <hr />
    </Card.Body>
  );
}

export default Comment;
