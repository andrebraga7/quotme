import React, { useEffect, useState } from "react";
import styles from "../../styles/QuotePage.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Quote from "./Quote";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function QuotePage() {
  const { id } = useParams();
  const [quote, setQuote] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: quote }, { data: comments }] = await Promise.all([
          axiosReq.get(`/quotes/${id}`),
          axiosReq.get(`/comments/?quote=${id}`),
        ]);
        setQuote({ results: [quote] });
        setComments(comments);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [id, currentUser]);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto mt-4" md={6}>
        {hasLoaded ? (
          <>
            <Quote {...quote.results[0]} setQuotes={setQuote} quotePage />
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              quote={id}
              setQuote={setQuote}
              setComments={setComments}
            />
            {comments.results.length ? (
              <p>We have comments</p>
            ) : (
              <p>No comments yet...</p>
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
    </Row>
  );
}

export default QuotePage;
