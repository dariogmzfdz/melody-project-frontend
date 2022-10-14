import axios from "axios";
import React from "react";
import { useState } from "react";
// import { toast } from "react-toastify";

const EditUser = () => {
  const [userData, setUserData] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  // const { state, dispatch: ctxDispatch } = useContext(state);
  // const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    //     const userId = await fetch("https://melody-music-stream-ten.vercel.app/login",
    //     {
    //     headers: {
    //         auth_id: userId,
    //     },}
    // )

    try {
      const data = await axios.put(
        `https://melody-music-stream-ten.vercel.app/user`,
        {
          name: name,
          lastName: lastName,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userData);
  return (
    <div>
      <a href="#">
        <h1> MELODY </h1>
      </a>
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <h3>Edit User</h3>

          <label>Name</label>
          <input
            className="signinInput"
            placeholder="ej: John"
            id="name"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label>Last Name</label>
          <input
            className="signinInput"
            placeholder="ej: Smith"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          ></input>

          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
