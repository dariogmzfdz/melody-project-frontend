import { UsersTable } from "./AdminTable";
import { useState, useEffect } from "react";
import { TableContainer } from "@mui/material";

export default function AdminView() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melodystream.herokuapp.com/admin/users",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const result = await response.json();
      const users = result.users;
      setData(users);
    };

    fetchData().catch(console.error);
  }, [token]);

  return (
    <TableContainer >
      <UsersTable products={data} />
    </TableContainer>
  );
}
