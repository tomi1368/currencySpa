import axios from "axios"

export const createLink = (value,token)=> axios(
    {
        method:"POST",
        url:"http://localhost:6002/referrer",
        data:value,
        headers:{
          Authorization: `Bearer ${token || ""}`
        }
      }              
    )