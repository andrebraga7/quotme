import React, { useEffect, useState } from "react";
import styles from "../../styles/QuoteCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";

function QuoteCreateForm() {
  // useState definitions
  const [quoteData, setQuoteData] = useState({
    category: "",
    author: "",
    content: "",
  });

  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState([]);
  const [showAuthors, setShowAuthors] = useState(false);

  // Variables
  const { category, author, content } = quoteData;
  const navigate = useNavigate();

  // Event handlers
  const handleChange = (event) => {
    setQuoteData({
      ...quoteData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axiosReq.get(`/authors/?search=${author}`);
        setAuthors(data.results);
        !!author.trim() && setShowAuthors(true);
      } catch (error) {
        console.log(error);
      }
    };

    setShowAuthors(false);
    const timer = setTimeout(() => {
      fetchAuthors();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [author]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/quotes/", quoteData);
      navigate(`/quotes/${data.id}`);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card body>
          <h1 className={styles.Header}>ADD QUOTE</h1>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              className={styles.Group}
              controlId="floatingCategory"
              label="Category"
            >
              <Form.Select
                className={styles.Input}
                aria-label="Category"
                name="category"
                value={category}
                onChange={handleChange}
              >
                <option>Please select a category</option>
                <option value="books">Books</option>
                <option value="lyrics">Lyrics</option>
                <option value="movies">Movies</option>
                <option value="statements">Statements</option>
                <option value="originals">Originals</option>
                <option value="out of the box">Out of the box</option>
              </Form.Select>
            </FloatingLabel>
            {errors.category?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <FloatingLabel
              className={styles.Group}
              controlId="floatingQuote"
              label="Quote"
            >
              <Form.Control
                className={styles.Input}
                style={{ height: "80px" }}
                as="textarea"
                placeholder="Quote"
                name="content"
                value={content}
                onChange={handleChange}
              />
            </FloatingLabel>
            {errors.content?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <FloatingLabel
              className={styles.Group}
              controlId="floatingAuthor"
              label="Author"
            >
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Author"
                name="author"
                autoComplete="off"
                value={author}
                onChange={handleChange}
                onBlur={() => setShowAuthors(false)}
              />

              {showAuthors &&
              authors.length &&
              !(authors.length === 1 && authors[0].name === author) ? (
                <div className={styles.AuthorList}>
                  {authors.slice(0, 5).map((authorObject) => (
                    <Button
                      key={authorObject.id}
                      className={styles.AuthorOption}
                      name="author"
                      value={authorObject.name}
                      onMouseDown={handleChange}
                    >
                      {authorObject.name}
                    </Button>
                  ))}
                </div>
              ) : null}
            </FloatingLabel>
            {errors.author?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
              type="submit"
            >
              Add quote
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default QuoteCreateForm;
