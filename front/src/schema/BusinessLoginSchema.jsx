import * as YUP from "yup";

const BusinessLoginSchema = YUP.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("A valid email address is required"),
  password: Yup.string().required("The password field is required"),
});

export default BusinessLoginSchema;
