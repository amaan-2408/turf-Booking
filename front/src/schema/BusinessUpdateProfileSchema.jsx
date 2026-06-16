import * as YUP from "yup"
const UserUpdateProfileSchema = YUP.object({
            name :YUP.string().required(" "),
            email :YUP.string().email("enter valid email address").required(" "),
            contact:YUP.number().typeError(" ").required(" "),
            
        })

export default UserUpdateProfileSchema