import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Account from "../../../assets/account.png";
import "./AccountInfo.css";
import { Link } from "react-router-dom";

function AccountInfo() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2IwMGUxMDhiYzE1NDY1MDRiMTQ5NiIsImVtYWlsIjoibWFzdGVyLm1lbG9keUBtc24uY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjY1NDg4ODE0LCJleHAiOjE2NjU1NzUyMTR9.eDvWi28js9L5pZ84-Ab_aSsGI_N4q6hJxxWk7pbYZRU";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melody-music-stream-ten.vercel.app/user",
        {
          headers: {
            auth_token: key,
          },
        }
      );
      const data = await response.json();

      const user = data.user;

      const admin = user.isAdmin;

      setData(user);

      setIsAdmin(admin);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    console.log(isAdmin);
  }, [isAdmin]);

  return (
    <>
      <button className="account-btn" onClick={() => setIsOpen(true)}>
        <img className="user-img" src={Account} alt="" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before",
        }}
        closeTimeoutMS={500}
      >
        {/* List with the user information */}
        <div className="user-info">
          <div className="user-img-container">
            <img className="user-img" src={Account} alt="" />
          </div>
          <div className="user-data">
            <p className="user-name">{data.name}</p>
            <p className="user-email"></p>
          </div>
        </div>

        {/* Button to close the session */}
        <div className="close-session">
          <button
            className="close-session-btn"
            onClick={() => setIsOpen(false)}
          >
            Close session
          </button>
        </div>

        {isAdmin ? (
          <div className="admin-options">
            <Link className="admin-options-btn" to={"/admin"}>
              Admin options
            </Link>
          </div>
        ) : (
          <div className="admin-options">
            <button className="admin-options-btn" disabled>
              Admin options
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default AccountInfo;
