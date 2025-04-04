import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom";
import { useFollowUserMutation, useUserDetailsQuery } from "../../redux/service";
import { useEffect, useState } from "react";
import {IUser} from "../../redux/serviceSlice"

interface searchF{
  e:IUser;
}
interface Follower {
  _id: string;
}

const SearchFollow:React.FC<searchF> = ({e}) => {
  const {darkMode,myInfo}=useAppSelector((state)=>state.service);
  const [followUser]=useFollowUserMutation();
  const [follow,setfollow]=useState(false);
  const {data, refetch}=useUserDetailsQuery(e?._id,{
    skip: !e?._id
  });
  
  const checkfollow=()=>{
    if(data && myInfo && data.user){
      const isTrue=data.user.followers.filter((follower:Follower)=>follower._id===myInfo._id);
      if(isTrue.length){
        setfollow(true);
        return;
      }
      setfollow(false);
      return;
    }
  }

  const handleFollow=async()=>{
    if(myInfo?._id!==e?._id){
      try {
        await followUser(e?._id).unwrap();
        // Refetch after follow action to ensure data is in sync
        refetch();
      } catch (error) {
        console.error("Failed to follow/unfollow:", error);
      }
    }
  }

  useEffect(()=>{
    checkfollow();
  },[data, myInfo]);

  return (
    <>
      <Stack width="90%" maxWidth="750px" mx="auto" flexDirection="column">
        <Stack flexDirection="row" gap={2} mt={3}>
        
          <Avatar src={e? e.profilePicture:''} alt={e? e.userName:''} />

         
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            borderBottom="1px solid #333333"
            pb={2} // Adds spacing under the border
          >
            {/* User Info */}
            <Stack sx={{ cursor: "pointer" }}>
              <Link to={`/profile/threads/${e?._id}`} className="link" >
              <Typography variant="h6" fontSize={"0.9rem"} fontWeight={"bold"} sx={{
                color: darkMode? "white":"black"
              }}>
                {e? e.userName:''}
              </Typography>
              </Link>
              <Typography variant="h5" fontSize={"0.9rem"} sx={{ color: darkMode? "gray":"#999999" }}>
                {e? e.fullName:''}
              </Typography>
              <Typography variant="h5" fontSize={"1rem"} sx={{ marginY: "5px" ,color: darkMode? "white":"black"}}>
                {e? e.bio:''}
              </Typography>
              <Typography variant="h5" fontSize={"1rem"} sx={{ color: darkMode? "gray":"#999999", marginY: "5px" }}>
                {e? e.followers.length:0 }followers
              </Typography>
            </Stack>

            {/* Follow Button */}
            {follow?  <Button
              sx={{
                height: 35,
                width: "99px",
                borderRadius: "10px",
                color: darkMode? "black": "white",
                bgcolor:darkMode? "white": "black",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleFollow}
            >
              Following
            </Button>: <Button
              sx={{
                height: 35,
                width: "99px",
                borderRadius: "10px",
                color: darkMode? "black": "white",
                bgcolor:darkMode? "white": "black",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleFollow}
            >
              Follow
            </Button>}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SearchFollow;