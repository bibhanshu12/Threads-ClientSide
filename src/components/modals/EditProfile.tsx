import {
  Dialog,
  Stack,
  Typography,
  Button,
  DialogTitle,
  Box,
  DialogContent,
  Avatar,
  useMediaQuery,
  
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addEditProfileModal } from "../../redux/serviceSlice";
import { useMyInfoQuery, useUpdateProfileMutation, useUserDetailsQuery } from "../../redux/service";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { Bounce, toast } from "react-toastify";

const EditProfile = () => {
  const _600 = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const { darkMode, myInfo } = useAppSelector((state) => state.service);
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState<File | null>(null);
  const [updateProfile, updateProfileData] = useUpdateProfileMutation();
  const { refetch: refetchUserDetails } = useUserDetailsQuery(params?._id);
  const { refetch: refetchMyInfo } = useMyInfoQuery(null);
  const { openEditProfileModal } = useAppSelector((state) => state.service);
  const dispatch = useAppDispatch();

  const imgRef = useRef<HTMLInputElement | null>(null);

  const handlePhoto = () => {
    imgRef.current?.click();
  };

  useEffect(() => {
    if (myInfo && myInfo.bio) {
      setBio(myInfo.bio);
    }
  }, [myInfo, openEditProfileModal]);

  const handleUpdate = async () => {
    try {
      console.log("Update profile initiated");
      const data = new FormData();

      // Only append bio if it's different from the current bio
      if (bio !== myInfo?.bio) {
        data.append("text", bio);
      }

      if (pic) {
        data.append("media", pic);
      }

      // Only proceed with the API call if there's something to update
      if (bio !== myInfo?.bio || pic) {
        await updateProfile(data);
      } else {
        // If nothing changed, just close the modal
        dispatch(addEditProfileModal(false));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (updateProfileData.isSuccess) {
      refetchUserDetails();
      refetchMyInfo();
     toast.success(updateProfileData.data.msg,{
                            position:'bottom-center',
                            autoClose:3000,
                            hideProgressBar:false,
                            closeOnClick:true,
                            pauseOnHover:true,
                            draggable:true,
                            theme:"colored",
                            transition:Bounce
                          });

      dispatch(addEditProfileModal(false));
      setPic(null);
    }
    if (updateProfileData.isError) {
      console.log(updateProfileData.error);
    }
  }, [updateProfileData.isSuccess, updateProfileData.isError]);

  const handleClose = () => {
    dispatch(addEditProfileModal(false));

    if (myInfo?.bio) {
      setBio(myInfo.bio);
    } else {
      setBio("");
    }
    setPic(null);
  };


  return (
    <>
      <Dialog
        open={openEditProfileModal}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "15px",
            overflow: "hidden",
            height: "auto",
            backgroundColor: darkMode ? "#181818" : "#fff", // ✅ Set background for dark mode
            border:darkMode? "1px solid #333333":"",
    color: darkMode ? "#fff" : "#000",
          },
        }}
        fullScreen={_600 ? false : true}
      >
        {updateProfileData.isLoading? <Stack height={'60vh'}> <Loading/></Stack>:<>
        <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
          <RxCross2 size={28} cursor={"pointer"} />
        </Box>

        <DialogTitle alignItems={"center"} fontSize={"1rem"}></DialogTitle>
        <DialogContent>
          <Stack flexDirection={"column"} gap={1}>
            <Avatar
              src={ pic? URL.createObjectURL(pic):  myInfo? myInfo.profilePicture:""}
              alt=""
              sx={{
                width: 96,
                height: 96,
                alignSelf: "center",
              }}
            />
            <Button
              size="large"
              sx={{
                border: "2px solid gray",
                borderRadius: "10px",
                width: 96,
                height: 40,
                alignSelf: "center",
                my: 2,
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handlePhoto}
            >
              Change
            </Button>
            <input type="file" className="file-input" accept="image/*" ref={imgRef} onChange={(e)=>{
                if (e.target.files && e.target.files.length > 0) {
                    setPic(e.target.files[0]);
                  }
            }} />
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.2rem"}
              my={2}
            >
              Username
            </Typography>
            <input
              type="text"
              value={myInfo? myInfo.userName:""}
              className="text1"
              readOnly
              style={{
                backgroundColor: darkMode ? "#333333" : "#fff", // Dark gray for dark mode, white for light mode
                color: darkMode ? "#fff" : "#000", // White text for dark mode, black for light mode
                borderBottom: darkMode ? "1px solid #666" : "1px solid #ccc", // Dark border in dark mode
                // padding: "10px",
                borderRadius: "5px",
                outline: "none",
              }}
            />
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.rem"}
              my={2}
            >
              Bio
            </Typography>
            <input
              type="text"
              onChange={(e)=>setBio(e.target.value)}
              className="text1"
              value={bio? bio:""}
              placeholder={"+ write bio"}
              style={{
                backgroundColor: darkMode ? "#181818" : "#fff", // Dark gray for dark mode, white for light mode
                color: darkMode ? "#fff" : "#000", // White text for dark mode, black for light mode
                borderBottom: darkMode ? "1px solid #666" : "1px solid #ccc", // Dark border in dark mode
                // padding: "10px",
                borderRadius: "5px",
                outline: "none",
              }}
              
            />
            </Stack>
            {/* <Stack flexDirection={"column"} gap={1}>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.2rem"}
              my={2}
            >
              Add insta
            </Typography>
        
            <input
              type="text"
              onChange={(e)=>setBio(e.target.value)}
              className="text1"
              placeholder="+ add link"
              style={{
                backgroundColor: darkMode ? "#181818" : "#fff", // Dark gray for dark mode, white for light mode
                color: darkMode ? "#fff" : "#000", // White text for dark mode, black for light mode
                borderBottom: darkMode ? "1px solid #666" : "1px solid #ccc", // Dark border in dark mode
                padding: "10px",
                borderRadius: "5px",
                outline: "none",
              }}
              
            />
            </Stack>
            <Stack flexDirection={"column"} >
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.2rem"}
              my={2}
            >
              Add Fb
            </Typography>
        
            <input
              type="text"
              onChange={(e)=>setBio(e.target.value)}
              className="text1"
              placeholder="+ add link"
              style={{
                backgroundColor: darkMode ? "#181818" : "#fff", // Dark gray for dark mode, white for light mode
                color: darkMode ? "#fff" : "#000", // White text for dark mode, black for light mode
                borderBottom: darkMode ? "1px solid #666" : "1px solid #ccc", // Dark border in dark mode
                padding: "10px",
                borderRadius: "5px",
                outline: "none",
              }}
              
            />
            </Stack> */}
            <Button
            size="large"
            sx={{
                border:"2px solid gray",
                borderRadius:"10px",
                bgcolor:darkMode? "white":"gray",
                color:darkMode? "black":"white",
                width:"100%",
                my:2,
                fontSize:"1.2rem",
                ":hover":{
                    cursor:"pointer",
                    bgcolor:"gray",
                    color:"black"
                }
            }}
            onClick={handleUpdate}
            >
                Done
            </Button>
        
        </DialogContent>
        </> }
        
      </Dialog>
    </>
  );
};

export default EditProfile;
