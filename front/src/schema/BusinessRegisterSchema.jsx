import * as YUP from "yup"

let BusinessRegisterSchema=YUP.object({
    name:YUP.string().required("The Name Field Is Required"),
    email:YUP.string().email("Enter Valid Email Address").required("The Email Field Is Required"),
    contact:YUP.number().typeError("Enter Valid Phone Number").required("The Contact Field Is Required"),
    password:YUP.string().required("The Password Field Is Required"),
    repassword:YUP.string().oneOf([YUP.ref("password")],"Password must match").required("The Repassword Field Is Required"),
})

export default BusinessRegisterSchema

    