import React, { useEffect, useState } from "react";
import styles from "../../styles/QuotePage.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Quote from "./Quote";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function QuotePage() {
  const { id } = useParams();
  const [quote, setQuote] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: quoteReq }] = await Promise.all([
          axiosReq.get(`/quotes/${id}`),
        ]);
        setQuote({ results: [quoteReq] });
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
          <Quote {...quote.results[0]} setQuotes={setQuote} quotePage />
        ) : (
          <Asset spinner />
        )}
      </Col>
    </Row>
  );
}

export default QuotePage;
