import * as YUP from "yup"

const UserLoginSchema=YUP.object({
    email:YUP.string().email("").email("Please enter a valid email address").required("A Valid Email Address is Required"),
    password:YUP.string().required("Password  is Required")
    
})

export default UserLoginSchema