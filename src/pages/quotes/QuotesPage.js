import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/QuotesPage.module.css";
import Quote from "./Quote";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function QuotesPage({ title, subtitle, message, filter = "" }) {
  // useState definitions
  const [quotes, setQuotes] = useState({ results: [] });

  // Variables
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  // API request for quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axiosReq.get(
          `/quotes/?${filter}search=${query}`
        );
        setQuotes(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchQuotes();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

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
          <Form className="mb-4" onSubmit={(event) => event.preventDefault()}>
            <InputGroup>
              <InputGroup.Text className={styles.SearchIcon}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control
                className={styles.SearchInput}
                type="text"
                placeholder="Search quotes"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </InputGroup>
          </Form>

          {hasLoaded ? (
            <>
              {quotes.results.length ? (
                <InfiniteScroll
                  children={quotes.results.map((quote) => (
                    <Quote key={quote.id} {...quote} setQuotes={setQuotes} />
                  ))}
                  dataLength={quotes.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!quotes.next}
                  next={() => fetchMoreData(quotes, setQuotes)}
                />
              ) : (
                <Container>
                  <p>{message}</p>
                </Container>
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
    </>
  );
}

export default QuotesPage;
