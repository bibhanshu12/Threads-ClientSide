import { Avatar, AvatarGroup, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addEditProfileModal } from "../../../redux/serviceSlice";
import { useFollowUserMutation, useUserDetailsQuery } from "../../../redux/service";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
// import { FaSquareInstagram } from "react-icons/fa6";

interface etype{
  _id:string;
}

const ProfileLayout = () => {
 const params=useParams();
  const {darkMode,myInfo}=useAppSelector((state)=>state.service)
  const { data, isLoading, isError,refetch}=useUserDetailsQuery(params?.id);
  const [followUser,followUserData]=useFollowUserMutation();
  const dispatch=useAppDispatch();
  const _300=useMediaQuery('(min-width:300px)');
  const _500=useMediaQuery('(min-width:500px)');
  const _700=useMediaQuery('(min-width:600px)');
  const [isMyAccount,setIsMyAccount]=useState(false);
  const [isfollowing, setIsFollowing]=useState(false);

  const checkIsFollowing=()=>{

    if(data && myInfo){

      const isTrue=data.user.followers.filter((e:etype)=>e._id===myInfo._id);
      if(isTrue.length){
        setIsFollowing(true)
        return;
      }
      setIsFollowing(false);
return;

    }
  }

  const checkIsMyAccount=()=>{

    if(data && myInfo){
      const istrue=data.user._id===myInfo._id;
      setIsMyAccount(istrue)
      
    }
  }
  const handleFollow=async()=>{

    if(data){
      await  followUser(data.user._id);
      refetch();

    }
  }





  const handleEditprofile=()=>{
    dispatch(addEditProfileModal(true))
  }

useEffect(()=>{
  if(followUserData.isSuccess){
    toast.success(followUserData.data.msg,{
      position:'bottom-center',
      autoClose:3000,
      hideProgressBar:false,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      theme:"colored",
      transition:Bounce
    });
  }
  if(followUserData.isError){
    console.log(followUserData.error)
  }
},[followUserData.isSuccess,followUserData.isError])

useEffect(()=>{
  checkIsFollowing();
  checkIsMyAccount();

},[data])

if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error loading profile</div>;
if (!data) return <div>No data available</div>;

  const getLinkStyle = (isActive: boolean):React.CSSProperties => ({
    cursor: "pointer",
    color: darkMode
      ? isActive
        ? "white"
        : "gray"
      : isActive
      ? "#181818"
      : "gray",
    display: "inline-block", // Only wrap the text width.
    position: "relative", // To allow the active border to overlap the parent's border.
    paddingBottom: "4px", // Add some space for the border underline.
    // Only for the active element, add a white border that sits on top of the container's border.
    borderBottom: isActive ? "2px solid white" : "none",
    zIndex: isActive ? 1 : 0,
  });
  
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        p={2}
        mt={_700? 0:8}
        mx={"auto"}
        width={_700? "90%":"100%"}
        maxWidth={"750px"}
        borderRadius={"20px"}
      > 
        {/* Name & Avatar Section */}
        <Stack
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Stack flexDirection={"column"} gap={1}>
            <Typography 
              variant="h3" 
              fontWeight={"bold"} 
              fontSize={_300? "2rem":"1rem"}
              sx={{
                color:darkMode? "white":"black"
              }}
            >
              {data? (data.user? data.user.fullName:""):""}
            </Typography>
            <Typography 
              variant="h2" 
              fontSize={_300? "1rem":"0.8rem"}
              sx={{
                color:darkMode? "white":"black"
              }}

            >
             {data? (data.user? data.user.userName:""):""}
            </Typography>
          </Stack>

          <Avatar 
            src={data? (data.user? data.user.profilePicture:""):""}

            sx={{ width: { xs: "70px", md: "90px" }, height: { xs: "70px", md: "90px" } }} 
          />
        </Stack>

        {/* Bio Section */}
        <Typography 
          variant="h2" 
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, textAlign: { xs: "center", sm: "left" } ,color:darkMode? "white":"black" }}
        >
        {data? (data.user? data.user.bio:""):""}
        </Typography>

        {/* Followers & Social Icons */}
        <Stack 
          flexDirection={{ xs: "column", sm: "row" }} 
          justifyContent={"space-between"} 
          alignItems={"center"} 
          width={"100%"} 
          gap={2}
        >
          {/* Followers Section */}
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <AvatarGroup
              total={4}
              max={3}
              sx={{
                "& .MuiAvatar-root": {
                  width: { xs: 20, md: 24 },
                  height: { xs: 20, md: 24 },
                  fontSize: { xs: 10, md: 12 },
                },
              }}
            >
              <Avatar src="" alt="" />
              <Avatar src="" alt="" />
            </AvatarGroup>
            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" } ,color:darkMode? "gray":"black"}}>{data? (data.user.followers? data.user.followers.length:0):""} followers</Typography>
          </Stack>

          {/* Social Icons Section */}
          <Stack flexDirection="row" gap={3} alignItems="center">
          <a href="https://www.instagram.com/bibhanshu12/" target="_blank" rel="noopener noreferrer">
  {darkMode ? <FaInstagram color="white" size={30} /> : <FaInstagram size={30} />}
</a>
<a href="https://www.facebook.com/bibhanshukarn/" target="_blank" rel="noopener noreferrer">
  {darkMode ? <SlSocialFacebook color="white" size={30} /> : <SlSocialFacebook size={30} />}
</a>
          </Stack>
        </Stack>

        {/* Edit Profile Button */}
        <Button
  variant="outlined"
  sx={{
    border:darkMode? "2px solid #333333":"2px solid #E9E9E9", // Keeps the black border always
    borderRadius: "10px",
    color: darkMode? "white":"#333333",
    bgcolor:darkMode? "#181818":"",
    fontWeight: "bold",
    textTransform: "none",
    transition: "all 0.3s ease-in-out",
    width: { xs: "100%", sm: "auto" }, // Responsive width
    minWidth: "100px", // Ensures button doesn't shrink too much
    "&:hover": {
      border: darkMode? "2px solid #333333":"2px solid #E9E9E9",
      color:darkMode? "black":"black",
      bgcolor: "white",
    },
    "&:active": {
      transform: "scale(0.9)", // Pop-in effect on click
    },
  }}
  onClick={isMyAccount? handleEditprofile:handleFollow}
>
  {isMyAccount? "Edit profile":(isfollowing? "unfollow":"Follow user")}

</Button>

<Stack
flexDirection={"row"}
justifyContent={"space-evenly"}
pb={2}
my={5}
borderBottom={"2px solid #333333"}
maxWidth={"750px"}
fontSize={_500? "1.2rem":_300? "1.1rem":"0.9rem"}
width={"100%"}
mx={"auto"}
>
    

    <NavLink to={`/profile/threads/${data?.user._id}`} style={({isActive}) => getLinkStyle(isActive)} className="link" >Threads</NavLink> 
    <NavLink to={`/profile/replies/${data?.user._id}`} style={({isActive}) => getLinkStyle(isActive)} className="link">Replies</NavLink>
     <NavLink to={`/profile/reposts/${data?.user._id}`} style={({isActive}) => getLinkStyle(isActive)} className="link" >Reposts</NavLink> 

</Stack>

<Outlet/>
      </Stack>
    </>
  );
};

export default ProfileLayout;
