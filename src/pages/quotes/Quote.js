import React from "react";
import styles from "../../styles/Quote.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

// React Bootstrap imports
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };

  return (
    <Card className={styles.Quote}>
      <Card.Body className={styles.QuoteHeader}>
        <Container className="d-flex align-items-center justify-content-between">
          <Link className={styles.Link} to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div>
            <span className={styles.QuoteInfo}>{category}</span>
            <span className={styles.QuoteInfo}>{updated_at}</span>
          </div>
        </Container>
      </Card.Body>
      <Card.Body className={styles.QuoteBody}>
        <Link to={`/quotes/${id}`}>
          <Container className="text-start">
            <i className="fa-solid fa-quote-left"></i>
          </Container>
          <Container className={styles.Content}>
            <h1>{content}</h1>
          </Container>
        </Link>
        <Container className="text-end">
          <i className="fa-solid fa-quote-right"></i>
        </Container>
        <Link className={styles.Author} to={`/authors/${author_id}`}>
          <Container>by {author}</Container>
        </Link>
      </Card.Body>
      <Card.Body className={styles.Footer}>
        <span>
          <i className="fa-regular fa-comment"></i>
        </span>
        {comments_count}
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
