import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../redux/service";
import { useAppSelector } from "../redux/hook";
import { Bounce, toast } from "react-toastify";

const Register = () => {
    const _700 = useMediaQuery("(min-width:800px)");
    const { darkMode } = useAppSelector((state) => state.service);
    const [signupUser, signupUserData] = useSignupMutation();
    const [loginUser, loginUserData] = useLoginMutation();
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongCredentials]=useState(true)
    const [emailvalid,setEmailValid]=useState(false);
    const [emailreturn,setemailReturn]=useState('');

    const loginToggle = () => setLogin((prev) => !prev);



   

    const handleLogin = async () => {
        try {
            // Add validation
            if (!email || !password) {
                toast.error("Please enter both email and password", {
                    position: "bottom-center",
                    autoClose: 2500,
                    theme: "colored",
                    transition: Bounce,
                });
                return;
            }
            const countAt = email.split('@').length - 1;
            if (countAt !== 1) {
             
             return setemailReturn(" Email must contain exactly one '@' symbol.")
            }
          
            // Get the domain part after "@"
            const parts = email.split("@");
            if (parts.length !== 2) {
             return setemailReturn('Invalid email format.')
            }
            const domain = parts[1].toLowerCase();
          
            // Allowed domains list (add more if needed)
            const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
          
            // Check if the domain is in the allowed list
            if (!allowedDomains.includes(domain)) {
              return setemailReturn(`Email domain must be one of: ${allowedDomains.join(", ")}`);
    
            }
            setEmailValid(true);
            
            await loginUser({ email, password }).unwrap();
            // Login will be handled in useEffect
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleSignup = async () => {

        const countAt = email.split('@').length - 1;
        if (countAt !== 1) {
         
         return setemailReturn(" Email must contain exactly one '@' symbol.")
        }
      
        // Get the domain part after "@"
        const parts = email.split("@");
        if (parts.length !== 2) {
         return setemailReturn('Invalid email format.')
        }
        const domain = parts[1].toLowerCase();
      
        // Allowed domains list (add more if needed)
        const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
      
        // Check if the domain is in the allowed list
        if (!allowedDomains.includes(domain)) {
          return setemailReturn(`Email domain must be one of: ${allowedDomains.join(", ")}`);

        }
        setEmailValid(true);
        
        await signupUser({ userName, email, password, fullName });
        await loginUser({email,password})
        setUserName("");
        setEmail("");
        setPassword("");
        setFullName("");
       
    };

    useEffect(() => {
        // Signup success handling
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
        }
    
        // Login success handling
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
            
           
            // window.location.reload();
            navigate('/');
        }
        
        // Login error handling
        if (loginUserData.isError) {
            toast.error("Invalid email or password", {
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
    }, [
        signupUserData.isSuccess, 
        loginUserData.isSuccess, 
        loginUserData.isError,
        navigate
    ]);

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
    disabled={login ? loginUserData.isLoading : signupUserData.isLoading}
    onClick={login ? handleLogin : handleSignup}
    sx={{
        width: "90%",
        maxWidth: "370px",
        borderRadius: "10px",
        fontSize: "20px",
        backgroundColor: darkMode ? "white" : "black",
        color: darkMode ? "gray" : "gray",
        fontWeight: "bold",
    }}
>
    {login ? (loginUserData.isLoading ? "Logging in..." : "Log in") : 
           (signupUserData.isLoading ? "Signing up..." : "Sign up")}
</Button>
                {wrongCredentials? "":<Typography variant="h6" fontSize={"1.1rem"} fontWeight={"bold"} alignSelf={"center"} color={"red"}>
                please check your Gmail or Password!
                </Typography>}
                <Typography variant="h6" fontSize={"0.8rem"} justifyContent={"center"} alignItems={"center"} alignSelf={"center"} color={"red"}>
                    {emailvalid? "":emailreturn}
                </Typography>

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