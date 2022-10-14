import axios from "axios";
import React from "react";
import "./SignIn.css";
import {  useState } from "react";
// import { toast } from "react-toastify";

const SignIn = () => {
  let newYear = new Date().getFullYear();
  const [userData, setUserData] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  // const { state, dispatch: ctxDispatch } = useContext(state);
  // const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const data = await axios.post("https://melody-music-stream-ten.vercel.app/register",
      {
        name:name,
        lastName: lastName,
        email: email,
        password: password,
        date: date,
        month: month,
        year: year,
        gender: gender,
      })
    console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <a href="#">
        <h1> MELODY </h1>
      </a>
      <div className="formContainer">
      <form onSubmit={submitHandler}>
        <h3>Register</h3>
        <label id="email">Email</label>
        <input
          className="signinInput"
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
        ></input>
        <label>Password</label>
        <input
          className="signinInput"
          type="password"
          placeholder="Password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Confirm Password</label>
        <input
          className="signinInput"
          type="password"
          placeholder="Password"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>
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
        <label>Date of birth</label>
        <div className="birthDate">
          <label></label>
          <select
            className="signinInput"
            placeholder="Day"
            id="date"
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
            id="month"
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="1">January</option>
            <option value="2">Februrary</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <label></label>
          <input
            className="signinInput"
            type="number"
            placeholder="YYYY"
            min="1910"
            max={newYear}
            id="year"
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <label className="gender">Gender:</label>
        <div className="radioButton">
          <label>Female
          <input
            type="radio"
            id="gender"
            name="gender-selector"
            value="female"
            onChange={(e) => setGender(e.target.value)}
            required
          />
</label>
<label>Male
          <input
            type="radio"
            id="gender"
            name="gender-selector"
            value="male"
            onChange={(e) => setGender(e.target.value)}
            required
          />
</label>
<label>Non-binary
          <input
            type="radio"
            id="gender"
            name="gender-selector"
            value="no-binary"
            onChange={(e) => setGender(e.target.value)}
            required
          />
</label>
        </div>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      </div>
    </div>
  );
};

export default SignIn;