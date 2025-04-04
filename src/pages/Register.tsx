import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../redux/service";
import { useAppSelector } from "../redux/hook";
import { Bounce, toast } from "react-toastify";

const Register = () => {
    const _700 = useMediaQuery("(min-width:800px)");
    const { darkMode } = useAppSelector((state) => state.service);
    const [signupUser, signupUserData] = useSignupMutation();
    const [loginUser, loginUserData] = useLoginMutation();

    const [login, setLogin] = useState(false);
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginToggle = () => setLogin((prev) => !prev);

    const handleLogin = async () => {
        await loginUser({ email, password });
    };

    const handleSignup = async () => {
        await signupUser({ userName, email, password, fullName });
        setUserName("");
        setEmail("");
        setPassword("");
        setFullName("");
    };

    useEffect(() => {
        if (signupUserData.isSuccess) {
            toast.success(signupUserData.data.msg, {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
            console.log(signupUserData.data);
        }

        if (loginUserData.isSuccess) {
            toast.success(loginUserData.data.msg, {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    }, [signupUserData.isSuccess, loginUserData.isSuccess]);

    return (
        <Stack
            flexDirection={"row"}
            height={"100vh"}
            width={"100%"}
            bgcolor={darkMode ? "black" : "white"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={
                _700
                    ? {
                          backgroundImage: "url(/images/register-bg.webp)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 650px",
                      }
                    : null
            }
        >
            <Stack flexDirection={"column"} gap={1} mt={20} alignSelf={"center"} width={"100%"} maxWidth={"450px"} alignItems={"center"}>
                <Typography variant="h6" fontSize={"1.1rem"} fontWeight={"bold"} alignSelf={"center"} color={darkMode ? "white" : "black"}>
                    {login ? "Login with your email" : "Register with your email"}
                </Typography>

                {!login && (
                    <TextField
                        variant="outlined"
                        placeholder="Username"
                        value={userName}
                        size="medium"
                        onChange={(e) => setUserName(e.target.value)}
                        sx={{
                            width: "90%",
                            maxWidth: "370px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                backgroundColor: darkMode ? "#1E1E1E" : "#F5F5F5",
                                color: darkMode ? "white" : "black",
                                boxShadow: "0px 1px 1px rgb(17, 17, 17)",
                            },
                        }}
                    />
                )}

                {!login && (
                    <TextField
                        variant="outlined"
                        value={fullName}
                        placeholder={"Full Name"}
                        onChange={(e) => setFullName(e.target.value)}
                        size="medium"
                        sx={{
                            width: "90%",
                            maxWidth: "370px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                backgroundColor: darkMode ? "#1E1E1E" : "#F5F5F5",
                                color: darkMode ? "white" : "black",
                                boxShadow: "0px 1px 1px rgb(17, 17, 17)",
                            },
                        }}
                    />
                )}

                <TextField
                    variant="outlined"
                    placeholder="Email"
                    size="medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        width: "90%",
                        maxWidth: "370px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            backgroundColor: darkMode ? "#1E1E1E" : "#F5F5F5",
                            color: darkMode ? "white" : "black",
                            boxShadow: "0px 1px 1px rgb(17, 17, 17)",
                        },
                    }}
                />

                <TextField
                    variant="outlined"
                    value={password}
                    placeholder={login ? "Password" : "New password"}
                    onChange={(e) => setPassword(e.target.value)}
                    size="medium"
                    sx={{
                        width: "90%",
                        maxWidth: "370px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            backgroundColor: darkMode ? "#1E1E1E" : "#F5F5F5",
                            color: darkMode ? "white" : "black",
                            boxShadow: "0px 1px 1px rgb(17, 17, 17)",
                        },
                    }}
                />

                <Button
                    variant="contained"
                    size="large"
                    onClick={login ? handleLogin : handleSignup}
                    sx={{
                        width: "90%",
                        maxWidth: "370px",
                        borderRadius: "10px",
                        fontSize: "20px",
                        backgroundColor: darkMode? "white":"black",
                        color: darkMode ? "gray" : "gray",
                        fontWeight: "bold",
                    }}
                >
                    {login ? "Log in" : "Sign up"}
                </Button>

                <Typography sx={{ color: darkMode ? "white" : "black" }} alignSelf={"center"} className="login-link">
                    {login ? "New to Thread?  " : "Already have an account ?"}{" "}
                    <Link to={login ? "/register" : "/login"}>
                        <span onClick={loginToggle}>{login ? "Create new account" : "Login"}</span>{" "}
                    </Link>
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Register;
