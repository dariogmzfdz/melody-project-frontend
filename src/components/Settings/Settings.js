import React from "react";
import { useState } from "react";
import "./Settings.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountInfo from "../Account/AccountInfo/AccountInfo";

function Settings() {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="settings-container">
      <NotificationsNoneIcon fontSize="large" />
      <SettingsIcon fontSize="large" />
      <AccountInfo />
    </div>
  );
}

export default Settings;
