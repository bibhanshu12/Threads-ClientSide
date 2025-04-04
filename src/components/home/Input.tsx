import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addPostModal } from "../../redux/serviceSlice";

  // interface media{
  //   url:string;
  //   type:'image';
  // }

interface eface{
  ee:string| undefined;
}

const Input:React.FC<eface> = ({ee}) => {

  const dispatch=useAppDispatch();
  const {darkMode}=useAppSelector((state)=>state.service)
  const handleAddpost=()=>{
      dispatch(addPostModal(true));
  }
  const _600=useMediaQuery("(min-width:600px)")
  return (
    <>
      {_600? (<Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={28}
        width={"90%"}
        p={2}
        my={2}
        mx={'auto'}
        borderBottom={"1px solid gray"}
        onClick={handleAddpost}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
            <Avatar src={ee} alt="Avatar"/>
          <Typography color="gray"  >What's new?</Typography>

        
        </Stack>
        <Button
            variant="outlined"
            size="medium"
            sx={{
              border:"1px solid #333333",
              fontWeight:"bold",
              borderRadius:"10px",
              textTransform:"none",
              bgcolor:darkMode? "#181818":"white",
              color:darkMode? "white":"#181818",
              ":hover":{
                 bgcolor:'black',
                 cursor:"pointer"

              }
            }}
          >
            Post
          </Button>
      </Stack>):null}
    </>
  );
};

export default Input;
