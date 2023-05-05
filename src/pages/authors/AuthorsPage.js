import React, { useEffect, useState } from "react";
import styles from "../../styles/AuthorsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Author from "./Author";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AuthorsPage() {
  const [authors, setAuthors] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosReq.get("/authors/");
        setAuthors(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    fetchAuthors();
  }, [setAuthors]);

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
          {hasLoaded ? (
            <>
              {authors.results.length ? (
                <div className="d-flex flex-wrap justify-content-center">
                  {authors.results.map((author) => (
                    <Author key={author.is} {...author} />
                  ))}
                </div>
              ) : (
                <p>No authors?</p>
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
