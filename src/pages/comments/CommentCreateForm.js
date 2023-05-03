import React, { useState } from "react";
import styles from "../../styles/CommentCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

function CommentCreateForm(props) {
  const { quote, setQuote, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Card body className={styles.Comment}>
      <Form>
        <Form.Group className={styles.Group}>
          <InputGroup>
            <Avatar src={profileImage} />
            <Form.Control
              className={styles.Input}
              rows={2}
              as="textarea"
              placeholder="Write a comment..."
              name="content"
              value={content}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Button className={`${btnStyles.ButtonComment} ${btnStyles.Dark} d-flex ms-auto`}>Send</Button>
      </Form>
    </Card>
  );
}

export default CommentCreateForm;
