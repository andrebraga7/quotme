import React, { useEffect, useState } from "react";
import styles from "../../styles/QuotePage.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Quote from "./Quote";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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
        // console.log(error);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [id, currentUser]);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto mt-4" md={8} lg={6}>
        {hasLoaded ? (
          <>
            <Quote {...quote.results[0]} setQuotes={setQuote} quotePage />
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profile_image={profile_image}
                quote={id}
                setQuote={setQuote}
                setComments={setComments}
              />
            ) : null}
            <Card className={styles.CommentCard}>
              {comments.results.length ? (
                <InfiniteScroll
                  children={comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setQuote={setQuote}
                      setComments={setComments}
                    />
                  ))}
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                />
              ) : currentUser ? (
                <p className="my-auto">
                  No comments yet, be the first to comment!
                </p>
              ) : (
                <p className="my-auto">No comments yet...</p>
              )}
            </Card>
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
    </Row>
  );
}

export default QuotePage;
