import * as YUP from "yup"

const UserLoginSchema=YUP.object({
    email:YUP.string().email("").required("A Valid Email Address is Required"),
    password:YUP.string().required("The Password Field is Required")
    
})

export default UserLoginSchema