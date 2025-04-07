import { useState, useEffect } from "react";

const useFormvalidation = (callback, validate, formValues) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [imgData, setImgData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(formValues);
  }, [formValues]);
// #my naem is khrram
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors(validate(values));
  };

  const handleSelect = (event) => {
    var attr = "nationality";
    setValues((values) => ({ ...values, [attr]: event.value }));
  };

  return {
    handleChange,
    handleSubmit,
    imgData,
    values,
    errors,
    handleSelect,
  };
};

export default useFormvalidation;
