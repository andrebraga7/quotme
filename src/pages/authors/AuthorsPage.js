import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AuthorsPage() {
  const [authors, setAuthors] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosReq.get("/atuhors/");
        setAuthors({ results: data.results });
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    fetchAuthors();
  });

  return (
    <Row>
      <Col md={6} className="mx-auto my-auto">
      </Col>
    </Row>
  );
}
