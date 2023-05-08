import React, { useState } from "react";
import styles from "../../styles/CommentCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ReplyEditForm(props) {
  const { id, content, setShowEditForm, setReplies } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/replies/${id}`, {
        content: formContent.trim(),
      });
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: prevReplies.results.map((reply) => {
          return reply.id === id
            ? {
                ...reply,
                content: formContent.trim(),
                updated_at: "now",
              }
            : reply;
        }),
      }));
      setShowEditForm(false);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className={styles.Group}>
        <Form.Control
          className={styles.Input}
          as="textarea"
          rows={2}
          value={formContent}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="text-end">
        <Button
          className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

export default ReplyEditForm;