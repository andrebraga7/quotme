export const handleValidate = (event, handleSubmit, setValidated) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    setValidated(true);
    return;
  } else {
    handleSubmit(event);
  }
};
