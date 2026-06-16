import * as YUP from "yup"
const UserSignupSchema = YUP.object({
            name :YUP.string().required("The name feild is required"),
            email :YUP.string().email("enter valid email address").required("A valid email adress is required"),
            address :YUP.string().required("The address field is required"),
            password :YUP.string().required("The password field is required"),
            repassword :YUP.string().oneOf([YUP.ref("password")],"Password must match").required("The re-password field is required"),
        })

export default UserSignupSchema