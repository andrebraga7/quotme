import React from "react";
import styles from "../../styles/ProfileQuotes.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Quote from "../quotes/Quote";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProfileQuotes({ quotes, setQuotes, owner }) {
  return (
    <Row className={styles.Row}>
      <Col className="mx-auto" md={6}>
        {quotes.results.length ? (
          <>
            <h2 className={styles.Title}>{owner}'s quotes</h2>
            <InfiniteScroll
              children={quotes.results.map((quote) => (
                <Quote key={quote.id} {...quote} setQuotes={setQuotes} />
              ))}
              dataLength={quotes.results.length}
              loader={<Asset spinner />}
              hasMore={!!quotes.next}
              next={() => fetchMoreData(quotes, setQuotes)}
            />
          </>
        ) : (
          <p className="mx-auto my-auto">{owner} has no quotes yet...</p>
        )}
      </Col>
    </Row>
  );
}

export default ProfileQuotes;
