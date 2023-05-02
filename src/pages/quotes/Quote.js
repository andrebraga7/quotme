import React from "react";
import styles from "../../styles/Quote.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

// React Bootstrap imports
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

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
    likes_count,
    comments_count,
  } = props;

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
        <Link className={styles.Content} to={`/quotes/${id}`}>
          <Container className="text-start">
            <i className="fa-solid fa-quote-left"></i>
          </Container>
          <Container>
            <h1>{content}</h1>
          </Container>
        </Link>
        <Container className="text-end">
          <i className="fa-solid fa-quote-right"></i>
        </Container>
        <Link className={styles.Author} to={`/authors/${author}`}>
        <Container>by {author}</Container>
        </Link>
      </Card.Body>
      <Card.Body className={styles.Footer}>
        <span>
          <i className="fa-regular fa-comment"></i>
          {comments_count}
        </span>
        <span>
          <i className="fa-regular fa-thumbs-up"></i>
          {likes_count}
        </span>
        <span>
          <i className="fa-regular fa-bookmark"></i>
        </span>
      </Card.Body>
    </Card>
  );
}

export default Quote;
