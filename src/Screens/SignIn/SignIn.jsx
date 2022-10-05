import Axios from "axios";
import React from "react";
import "./SignIn.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  let newYear = new Date().getFullYear();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          name,
          email,
          password,
          date,
          month,
          year,
          gender,
        }
      );
      console.log(data);
      toast.success("Your account has been created");
      //   ctxDispatch({ type: "USER_SIGNIN", payload: data });
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      //   navigate(redirect || "/");
    } catch {
      console.log("Unable to connect");
    }

    return (
      <div>
        <a href="#">
          <h1> MELODY </h1>
        </a>
        <form onSubmit={submitHandler}>
          <h3>Register</h3>
          <label id="email">Email</label>
          <input
            className="signinInput"
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label>Password</label>
          <input
            className="signinInput"
            type="password"
            placeholder="Password"
            Id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label>Confirm Password</label>
          <input
            className="signinInput"
            type="password"
            placeholder="Password"
            Id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <label>Nombre de usuario</label>
          <input
            className="signinInput"
            placeholder="ej: John Smith"
            Id="name"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label>Fecha de nacimiento</label>
          <div className="birthDate">
            <label></label>
            <label></label>
            <select
              className="signinInput"
              placeholder="Day"
              Id="date"
              onChange={(e) => setDate(e.target.value)}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <label></label>
            <select
              className="signinInput"
              placeholder="Mes"
              Id="month"
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            <label></label>
            <input
              className="signinInput"
              type="number"
              placeholder="YYYY"
              min="1910"
              max={newYear}
              Id="year"
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  };
};

export default SignIn;
