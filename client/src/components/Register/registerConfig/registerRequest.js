import axios from "axios"


export const registerRequest = async(value,referr)=>{
    try{
        const {data} = await axios({
            method:"POST",
            url:"http://localhost:6002/user/register",
            data:value,
            params:{
                referr
            }
        })

        return {ok:true,data}
    }catch(err){
        console.log(err.message)
        return {ok:false,err:err}
    }
}

