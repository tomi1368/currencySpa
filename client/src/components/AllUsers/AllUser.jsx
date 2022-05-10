import { useState, useEffect } from "react";
import { fetchUsers } from "./usersRequest/usersRequest";
import "./AllUser.scss"
import LogOut from "../LogOut/LogOut";
const AllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await fetchUsers();
        console.log(data)
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers()
  }, []);
  return (
    <>
    <LogOut></LogOut>
    <h2 className="table-title">Users</h2>
    {users && 
    <table class="customTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Invitations</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user=>{
          return(
            <tr>
              <td>{user.username}</td>
              <td>{user.countRef}</td>
              <td>{`${user.countRef * 5000} CLP `}</td>
            </tr>
          )
        })}
      </tbody>
    </table>}
    </>
  );
};

export default AllUser;
