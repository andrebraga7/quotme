import React, { useState } from "react";
import styles from "../../styles/QuoteCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function QuoteCreateForm() {
  // useState definitions
  const [quoteData, setQuoteData] = useState({
    category: "",
    author: "",
    content: "",
  });

  // Variables
  const { category, author, content } = quoteData;

  // Event handlers
  const handleChange = (event) => {
    setQuoteData({
      ...quoteData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card body>
          <h1 className={styles.Header}>ADD QUOTE</h1>
          <Form>
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
                <option value="statements">Statements</option>
                <option value="originals">Originals</option>
                <option value="out_of_the_box">Out of the box</option>
              </Form.Select>
            </FloatingLabel>
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
                value={author}
                onChange={handleChange}
              />
            </FloatingLabel>
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
