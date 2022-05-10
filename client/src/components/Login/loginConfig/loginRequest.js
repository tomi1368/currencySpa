import axios from "axios"


const loginRequest = async(value)=>{
    try{
        const {data} = await axios.post("http://localhost:6002/user/login",value)
        return {ok:true,data}
    }catch(err){
        return {ok:false,err:err}
    }
}

export default loginRequest