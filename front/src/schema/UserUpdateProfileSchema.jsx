import * as YUP from "yup"
const UserUpdateProfileSchema = YUP.object({
            name :YUP.string().required(" "),
            email :YUP.string().email("enter valid email address").required(" "),
            address :YUP.string().required(" "),
            
        })

export default UserUpdateProfileSchema