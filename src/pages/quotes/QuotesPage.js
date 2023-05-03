import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/QuotesPage.module.css";
import Quote from "./Quote";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function QuotesPage({ title, subtitle, message, filter = "" }) {
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

    setHasLoaded(false);
    fetchQuotes();
  }, []);

  return (
    <>
      <Row className={styles.Header}>
        <Col className="mx-auto" md={11}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </Col>
      </Row>
      <Row className={styles.Row}>
        <Col className="mx-auto mt-4" md={6}>
          {hasLoaded ? (
            <InfiniteScroll
              children={quotes.results.map((post) => (
                <Quote key={post.id} {...post} />
              ))}
              dataLength={quotes.results.length}
              loader={<Asset spinner />}
              hasMore={!!quotes.next}
              next={() => fetchMoreData(quotes, setQuotes)}
            />
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
    </>
  );
}

export default QuotesPage;
