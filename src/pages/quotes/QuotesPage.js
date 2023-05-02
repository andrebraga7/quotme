import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/QuotesPage.module.css";
import Quote from "./Quote";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function QuotesPage() {
  // useState definitions
  const [quotes, setQuotes] = useState({ results: [] });

  // Variables
  const [hasLoaded, setHasLoaded] = useState(false);

  // API request for quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axiosReq.get("/quotes/");
        setQuotes(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto mt-4" md={6}>
        {hasLoaded ? (
          quotes.results.map((post) => (
            <Quote key={post.id} {...post} />
          ))
        ): (
          <p>Quotes not loaded</p>
        )}
      </Col>
    </Row>
  );
}

export default QuotesPage;
