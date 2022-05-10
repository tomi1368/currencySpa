import axios from "axios";

export const fetchUsers = ()=> axios.get("http://localhost:6002/user/")  