import { Button, Stack, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom"
const Error=()=>{

const navigate= useNavigate();
  return(
    
    <>
      <Stack
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100%"}
      sx={{
        background:"url(images/errorpage.png)",
        backgroundRepeat:'none',
        backgroundSize:'cover',

      }}
      >
        <Stack
        p={5}
        border={"1px solid black"}
        bgcolor={"#F5E9E0"}
        borderRadius={"5px"}
        boxShadow={"8px 8px 8px black"}
         flexDirection={"column"}
         justifyContent={"center"}
         alignItems={"center"}
         >
          <Typography variant="h3">OOP'S..</Typography>
          <Typography pb={2} variant="h6">You are on wrong Page ! </Typography>
          <Button variant="contained" size="large" onClick={()=> navigate(-1)} >GO BACK</Button>
        </Stack>

      </Stack>
    </>
  )
}

export default Error;
