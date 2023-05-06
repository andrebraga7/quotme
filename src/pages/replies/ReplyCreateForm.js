import React, { useState } from "react";
import styles from "../../styles/CommentCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ReplyCreateForm(props) {
  const { comment, setReplies, setComments, setShowReplyForm } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/replies/", {
        content,
        comment,
      });
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: [data, ...prevReplies.results],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((current) => {
          return current.id === comment
            ? {
                ...current,
                replies_count: current.replies_count + 1,
              }
            : current;
        }),
      }));
      setShowReplyForm(false);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className={styles.Group}>
        <Form.Control
          className={styles.Input}
          as="textarea"
          rows={2}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="text-end">
        <Button
          className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
          onClick={() => setShowReplyForm(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
          disabled={!content.trim()}
          type="submit"
        >
          Reply
        </Button>
      </div>
    </Form>
  );
}

export default ReplyCreateForm;
