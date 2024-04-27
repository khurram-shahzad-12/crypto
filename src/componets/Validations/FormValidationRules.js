export default function validate(values) {
  let errors = {};
  const regexName = /^[a-zA-Z ,.'-]+$/i;

  if (values.first_name === "") {
    errors.first_name = "First Name is required";
  } else if (!regexName.test(values.first_name)) {
    errors.first_name = "This is not a valid name format";
  }

  if (values.last_name === "") {
    errors.last_name = "Last Name is required";
  } else if (!regexName.test(values.last_name)) {
    errors.last_name = "This is not a valid name format";
  }

  if (values.gender === "") {
    errors.gender = "Gender is required";
  }

  if (values.email === "") {
    errors.email = "Email address is required";
  }

  if (values.mobile === "") {
    errors.mobile = "Phone is required";
  }

  if (values.password === "") {
    errors.password = "Password is required";
  }

  if (values.nationality === "") {
    errors.nationality = "Nationality is required";
  }

  return errors;
}
