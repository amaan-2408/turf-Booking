import * as YUP from "yup"

const AddTurfSchema=YUP.object({
    name:YUP.string().required("*"),
    price:YUP.number().typeError("").required("*"),
    address:YUP.string().required("*"),
    contact:YUP.number().typeError("").required("*"),
    image:YUP.string().required("*"),
    detail:YUP.string().required("*"),
    lat:YUP.number().typeError("").required("*"),
    long:YUP.number().typeError("").required("*"),
    time_open:YUP.string().required("*"),
    time_close:YUP.string().required("*"),
    
    
})

export default AddTurfSchema