import React, { useEffect, useState } from "react";
import styles from "../../styles/QuotePage.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Quote from "./Quote";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function QuotePage() {
  const { id } = useParams();
  const [quote, setQuote] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: quoteReq }] = await Promise.all([
          axiosReq.get(`/quotes/${id}`),
        ]);
        setQuote({ results: [quoteReq] });
      } catch (error) {
        console.log(error);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto mt-4" md={6}>
        <Quote {...quote.results[0]} />
      </Col>
    </Row>
  );
}

export default QuotePage;
