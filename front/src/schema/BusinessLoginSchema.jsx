import * as YUP from "yup"

const BusinessLoginSchema=YUP.object({
    email:YUP.string().email("").required("A Valid Email Address is Required"),
    password:YUP.string().required("The Password Field is Required")
    
})

export default BusinessLoginSchema