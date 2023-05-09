import { useState } from "react";

export const useValidation = (event, handleSubmit) => {
  const [validated, setValidated] = useState(false);

  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    setValidated(true);
    return;
  } else {
    handleSubmit(event);
  }

  return { validated };
};
