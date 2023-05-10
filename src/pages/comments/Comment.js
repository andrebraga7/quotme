import React, { useEffect, useState } from "react";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentEditForm from "./CommentEditForm";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import ReplyCreateForm from "../replies/ReplyCreateForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Reply from "../replies/Reply";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

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
      // console.log(error);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/replies/?comment=${id}`);
        setReplies(data);
      } catch (error) {
        // console.log(error);
      }
    };

    handleMount();
  }, [id, setComments]);

  return (
    <Card.Body className="ps-0 pe-2">
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
            <p className={styles.Content}>{content}</p>
          )}
          <span
            className={styles.ReplyIcon}
            onClick={() => setShowReplies((showReplies) => !showReplies)}
          >
            <i className="fa-solid fa-reply"></i>
            <span>{replies_count ? replies_count : "0"}</span>
            {replies_count > 0 ? (
              <span className={styles.ViewReplies}>
                {showReplies ? "Hide replies" : "View all replies"}
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
          {showReplyForm && (
            <ReplyCreateForm
              setShowReplyForm={setShowReplyForm}
              setShowReplies={setShowReplies}
              setReplies={setReplies}
              comment={id}
              setComments={setComments}
            />
          )}
          {showReplies && (
            <InfiniteScroll
              children={replies.results.map((reply) => (
                <Reply
                  key={reply.id}
                  {...reply}
                  comment={id}
                  setComments={setComments}
                  setReplies={setReplies}
                />
              ))}
              dataLength={replies.results.length}
              loader={<Asset spinner />}
              hasMore={!!replies.next}
              next={() => fetchMoreData(replies, setReplies)}
            />
          )}
          <hr />
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

export default Comment;
