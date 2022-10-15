import { UsersTable } from "./AdminTable";
import { useState, useEffect } from "react";

export default function AdminView() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melody-music-stream-ten.vercel.app/users",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const data = await response.json();
      const users = data.users;
      setData(users);
    };

    fetchData().catch(console.error);
  }, [token]);

  return (
    <div>
      <UsersTable products={data} />
    </div>
  );
}
