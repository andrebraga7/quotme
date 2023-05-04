import React, { useState } from "react";
import styles from "../../styles/CommentCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

function CommentCreateForm(props) {
  const { quote, setQuote, setComments, profile_image, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        quote,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setQuote((prevQuote) => ({
        results: [
          {
            ...prevQuote.results[0],
            comments_count: prevQuote.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card body className={styles.CommentForm}>
      <Form onSubmit={handleSubmit} className="text-end">
        <Form.Group className={styles.Group}>
          <InputGroup>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
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
        <Button
          className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
          disabled={!content.trim()}
          type="submit"
        >
          Send
        </Button>
      </Form>
    </Card>
  );
}

export default CommentCreateForm;
