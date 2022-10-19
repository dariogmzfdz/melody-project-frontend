import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const {token} = useParams();
    const navigate = useNavigate();
   const submitHandler = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            console.log("Passwords do not match");
            return;
        }
        try {
            const headers = {
                auth_token: token,
            };

            const data = await axios.put(
                "http://localhost:3000/password-reset",
                {
                    newPassword: newPassword,
                  
                },
                {
                    headers,
                    "Access-Control-Allow-Origin": "*",
                }
            );
            console.log(data);
            navigate("/");
        } catch (error) {
            
            console.log(error);
        }
    };
    return (
        <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ height: "100vh" }}
        >
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    className="formSign"
                    component="form"
                    sx={{ mt: 1 }}
                    onSubmit={submitHandler}
                > <TextField
                    label="New Password"
                    type="password"
                    placeholder="Password"
                    id="newPassword"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                ></TextField>

                    <TextField
                        label="Confirm New Password"
                        type="password"
                        placeholder="Password"
                        id="confirmNewPassword"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    ></TextField>

                    <Button className="registerButton" type="submit">
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Grid>

    )
}

export default ResetPassword