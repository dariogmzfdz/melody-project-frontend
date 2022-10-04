import React from 'react'
import './Settings.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Settings() {
  return (
    <div className='settings-container'>
        <NotificationsNoneIcon fontSize="large" />
        <SettingsIcon fontSize="large" />
        <AccountCircleIcon fontSize="large" />
    </div>
  )
}

export default Settings