import React from "react";
import styles from "../../styles/Quote.module.css";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

// React Bootstrap imports
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MoreDropdown } from "../../components/MoreDropdown";

function Quote(props) {
  const {
    id,
    owner,
    updated_at,
    category,
    author,
    content,
    profile_id,
    profile_image,
    like_id,
    save_id,
    author_id,
    likes_count,
    comments_count,
    setQuotes,
    quotePage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  // Event handlers
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { quote: id });
      setQuotes((prevQuotes) => ({
        ...prevQuotes,
        results: prevQuotes.results.map((quote) => {
          return quote.id === id
            ? { ...quote, likes_count: quote.likes_count + 1, like_id: data.id }
            : quote;
        }),
      }));
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setQuotes((prevQuotes) => ({
        ...prevQuotes,
        results: prevQuotes.results.map((quote) => {
          return quote.id === id
            ? { ...quote, likes_count: quote.likes_count - 1, like_id: null }
            : quote;
        }),
      }));
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await axiosRes.post("/saved/", { quote: id });
      setQuotes((prevQuotes) => ({
        ...prevQuotes,
        results: prevQuotes.results.map((quote) => {
          return quote.id === id ? { ...quote, save_id: data.id } : quote;
        }),
      }));
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUnsave = async () => {
    try {
      await axiosRes.delete(`/saved/${save_id}/`);
      setQuotes((prevQuotes) => ({
        ...prevQuotes,
        results: prevQuotes.results.map((quote) => {
          return quote.id === id ? { ...quote, save_id: null } : quote;
        }),
      }));
    } catch (error) {
      // console.log(error);
    }
  };

  const handleEdit = () => {
    navigate(`/quotes/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/quotes/${id}/`);
      navigate(-1);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Card className={styles.Quote}>
      <Card.Body className={styles.QuoteHeader}>
        <Container className="d-flex align-items-center justify-content-between p-0">
          <Link className={styles.Owner} to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <span>{owner}</span>
          </Link>
          <div
            className={`d-flex pe-3 justify-content-end ${styles.InfoContainer}`}
          >
            <span className={styles.QuoteInfo}>{category}</span>
            <span className={styles.QuoteInfo}>{updated_at}</span>
            {is_owner && quotePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Container>
      </Card.Body>

      <Card.Body className={styles.QuoteBody}>
        <Link to={`/quotes/${id}`}>
          <Container className="text-start">
            <i className="fa-solid fa-quote-left"></i>
          </Container>
          <Container className={styles.Content}>
            <p>{content}</p>
          </Container>
          <Container className="text-end">
            <i className="fa-solid fa-quote-right"></i>
          </Container>
        </Link>
        <Link className={styles.Author} to={`/authors/${author_id}`}>
          <span>by {author}</span>
        </Link>
      </Card.Body>

      <Card.Body className={styles.Footer}>
        <Link to={`/quotes/${id}`}>
          <span>
            <i className="fa-regular fa-comment"></i>
          </span>
          {comments_count}
        </Link>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own quote!</Tooltip>}
          >
            <i className="fa-regular fa-thumbs-up ps-5"></i>
          </OverlayTrigger>
        ) : like_id ? (
          <span className="ps-5" onClick={handleUnlike}>
            <i className="fa-solid fa-thumbs-up"></i>
          </span>
        ) : currentUser ? (
          <span className="ps-5" onClick={handleLike}>
            <i className="fa-regular fa-thumbs-up"></i>
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Login to like a quote!</Tooltip>}
          >
            <i className="fa-regular fa-thumbs-up ps-5"></i>
          </OverlayTrigger>
        )}
        {likes_count}
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't save your own quote!</Tooltip>}
          >
            <i className="fa-regular fa-bookmark ps-5"></i>
          </OverlayTrigger>
        ) : save_id ? (
          <span className="ps-5" onClick={handleUnsave}>
            <i className="fa-solid fa-bookmark"></i>
          </span>
        ) : currentUser ? (
          <span className="ps-5" onClick={handleSave}>
            <i className="fa-regular fa-bookmark"></i>
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Login to save a quote!</Tooltip>}
          >
            <i className="fa-regular fa-bookmark ps-5"></i>
          </OverlayTrigger>
        )}
      </Card.Body>
    </Card>
  );
}

export default Quote;
