import React, { useEffect, useState } from "react";
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
    <Row>
      <Col md={6} className="mx-auto my-auto">
        {hasLoaded ? (
          <>
            {authors.results.length ? (
              <InfiniteScroll
                children={authors.results.map((author) => (
                  <Author key={author.is} {...author} />
                ))}
                dataLength={authors.results.length}
                loader={<Asset spinner />}
                hasMore={!!authors.next}
                next={() => fetchMoreData(authors, setAuthors)}
              />
            ) : (
              <p>No authors?</p>
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
    </Row>
  );
}

export default AuthorsPage;
