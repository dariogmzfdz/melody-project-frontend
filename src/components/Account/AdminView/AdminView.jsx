/* import React from "react";
import { useState, useEffect } from "react";
import "./AdminView.css";

function AdminView() {
  const [data, setData] = useState([]);

  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2IwMGUxMDhiYzE1NDY1MDRiMTQ5NiIsImVtYWlsIjoibWFzdGVyLm1lbG9keUBtc24uY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjY1NDg4ODE0LCJleHAiOjE2NjU1NzUyMTR9.eDvWi28js9L5pZ84-Ab_aSsGI_N4q6hJxxWk7pbYZRU";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melody-music-stream-ten.vercel.app/users",
        {
          headers: {
            auth_token: key,
          },
        }
      );
      const data = await response.json();

      const users = data.users;

      setData(users);
    };

    fetchData().catch(console.error);
  }, []);

  console.log(data);

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Password</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminView;
 */

import React from "react";
import { useState, useEffect } from "react";
import "./AdminView.css";
import useSortableData from "./useSortableData";

const ProductTable = (props) => {
  console.log(props)
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table-container">
      <table className="table">
        <caption>Users</caption>
        <thead className="table-header">
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("lastName")}
                className={getClassNamesFor("lastName")}
              >
                Last Name
              </button>
            </th>
            <th>
              <button type="button" className={getClassNamesFor("password")}>
                Password
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("email")}
                className={getClassNamesFor("email")}
              >
                Email
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="table-content">
          {items.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="table-data">{item.name}</td>
              <td className="table-data">{item.lastName}</td>
              <td className="table-data">{item.password}</td>
              <td className="table-data">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
    <div className="App">
      <ProductTable products={data} />
    </div>
  );
}
