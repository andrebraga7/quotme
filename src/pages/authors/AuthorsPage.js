import React, { useEffect, useState } from "react";
import styles from "../../styles/AuthorsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Author from "./Author";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function AuthorsPage() {
  const [authors, setAuthors] = useState({ results: [] });
  const [query, setQuery] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosReq.get(`/authors/?search=${query}`);
        setAuthors(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchAuthors();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [setAuthors, query]);

  return (
    <>
      <Row className={styles.Header}>
        <Col className="mx-auto" md={10}>
          <h1>Popular Authors</h1>
          <p>These are the top 10 most popular authors.</p>
        </Col>
      </Row>
      <Row className={styles.Row}>
        <Col md={8} className="mx-auto mt-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Form
                className="mb-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <InputGroup>
                  <InputGroup.Text className={styles.SearchIcon}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <Form.Control
                    className={styles.SearchInput}
                    type="text"
                    placeholder="Search authors"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </InputGroup>
              </Form>
            </Col>
          </Row>
          {hasLoaded ? (
            <>
              {authors.results.length ? (
                <div className="d-flex flex-wrap justify-content-center">
                  {authors.results.map((author) => (
                    <Author key={author.is} {...author} />
                  ))}
                </div>
              ) : (
                <p>No authors... I think?</p>
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

export default AuthorsPage;
