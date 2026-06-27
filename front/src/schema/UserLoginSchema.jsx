import * as Yup from "yup";

const UserLoginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("A valid email address is required"),
  password: Yup.string()
    .required("The password field is required"),
});

export default UserLoginSchema;