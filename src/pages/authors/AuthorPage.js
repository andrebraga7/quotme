import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/QuotesPage.module.css";
import Quote from "../quotes/Quote";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function AuthorPage() {
  // useState definitions
  const [quotes, setQuotes] = useState({ results: [] });
  const [author, setAuthor] = useState({});

  // Variables
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();

  // API request for quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const [{ data }, { data: authorData }] = await Promise.all([
          axiosReq.get(`/quotes/?author=${id}&search=${query}+${category}`),
          axiosReq.get(`/authors/${id}/`),
        ]);
        const { name, quotes_count } = authorData;
        setQuotes(data);
        setAuthor({ name, quotes_count });
        setHasLoaded(true);
      } catch (error) {
        // console.log(error);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchQuotes();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query, category, pathname, currentUser, id]);

  return (
    <>
      <Row className={styles.Header}>
        <Col className="mx-auto" md={11}>
          {hasLoaded ? (
            <>
              <h1>{author.name}</h1>
              <p>Has {author.quotes_count} quotes.</p>
            </>
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
      <Row className={styles.Row}>
        <Col className="mx-auto mt-4" md={8} lg={6}>
          <Form className="mb-4" onSubmit={(event) => event.preventDefault()}>
            <Row>
              <Col>
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
              </Col>
              <Col className="me-2" md={4}>
                <Form.Select
                  className={styles.Category}
                  aria-label="Category"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">All categories</option>
                  <option value="books">Books</option>
                  <option value="lyrics">Lyrics</option>
                  <option value="movies">Movies</option>
                  <option value="statements">Statements</option>
                  <option value="originals">Originals</option>
                  <option value="out of the box">Out of the box</option>
                </Form.Select>
              </Col>
            </Row>
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
                  <p>This author has no quotes yet...</p>
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

export default AuthorPage;
