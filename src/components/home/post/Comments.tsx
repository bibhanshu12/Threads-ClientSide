import { Avatar, Stack, Typography ,useMediaQuery,Menu,MenuItem} from "@mui/material";
import { IoIosMore } from "react-icons/io";
import { useAppSelector } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { useDeleteCommentMutation, useSinglePostQuery } from "../../../redux/service";
import { Bounce, toast } from "react-toastify";
import {IUser} from "../../../redux/serviceSlice"



interface CommentProps {
  postId: string;
  e: {
    _id: string;
    post: string;
    author: IUser;
    content: string;
    createdAt: string;

  };
}



const Comments:React.FC<CommentProps> = ({e,postId}) => {
  const _300=useMediaQuery('(min-width:300px)');
    const _500=useMediaQuery('(min-width:500px)');
const {darkMode,myInfo}=useAppSelector((state)=>state.service)
const [deleteComment,deleteCommentData]=useDeleteCommentMutation();
const [anchorEl,setAnchorEl]= useState<null | HTMLElement>(null);
const [isAdmin,setIsAdmin]=useState(false);
const {refetch}=useSinglePostQuery(postId);
const [updateAt,setupdatedAt]=useState("24min");


const formatDate=()=>{
  const dateString= e?.createdAt;
      const now = new Date();
      const past = new Date(dateString);
      const diffInMs = now.getTime() - past.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    

      if (diffInMinutes < 60) return  setupdatedAt(`${diffInMinutes}min`);

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return setupdatedAt(`${diffInHours}h`);
    
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return setupdatedAt(`${diffInDays}d`);
    
      const diffInWeeks = Math.floor(diffInDays / 7);
      if (diffInWeeks < 4) return setupdatedAt(`${diffInWeeks}w`);
    
      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) return setupdatedAt(`${diffInMonths}m`);
    
      const diffInYears = Math.floor(diffInDays / 365);
      return setupdatedAt(`${diffInYears}y`);

    }

    const handleClose=()=>{
      setAnchorEl(null)
      
  }
    const handleDeleteComment=async()=>{

      const info={
        postId,
        id:e?._id,  
      }

      await deleteComment(info);
      handleClose();
      refetch();

    }

   const validateisAdmin=()=>{
   
   if(e && myInfo){
    if(e.author._id===myInfo._id){
      setIsAdmin(true);
      return;
    }
   }
   setIsAdmin(false);
   
   };

   useEffect(()=>{
    validateisAdmin();
    formatDate();
   },[])

   useEffect(()=>{

    if(deleteCommentData.isSuccess){
      toast.success(deleteCommentData.data.msg,{
        position:'bottom-center',
        autoClose:2500,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"colored",
        transition:Bounce
      });
      console.log(deleteCommentData.data)
    }
    if(deleteCommentData.isError){
      
      console.log(deleteCommentData.error)
    }
   },[deleteCommentData.isSuccess,deleteCommentData.isError])


    // const _700=useMediaQuery('(min-width:700px)');
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={2}
        pb={4}
        fontSize={_500? "1.2rem":_300? "1rem":"0.8rem"}
        borderBottom={"1px solid gray"}
        mx={"auto"}
        width={"90%"}
      >
        <Stack flexDirection={"row"} gap={2}>
          <Avatar src={e? e.author.profilePicture:""} alt={e? e.author.userName:""} sx={{
            width: { xs: "30px", md: "50px" }, height: { xs: "30px", md: "50px" }
          }} />
          <Stack flexDirection={"column"}>
            <Typography variant="h6" fontWeight={"bold"}  fontSize={_500? "1.2rem":_300? "1rem":"0.8rem"}
            sx={{
              color:darkMode? "white":"black"
            }}
            >
             {e? e.author.userName:""}
            </Typography>
            <Typography variant="subtitle2" fontSize={_500? "1rem":_300? "0.8rem":"0.7rem"}
            sx={{
               color:darkMode? "white":"black"
            }}>
              {e? (e.content):""}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
          fontSize={_500? "0.9rem":_300? "0.8rem":"0.7rem"}
          color={"GrayText"}
          
        >
            <p>{updateAt}</p>
          {isAdmin?   <IoIosMore size={_500? "1rem":_300? "0.7rem":"0.6rem"} className="link" onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
    setAnchorEl(e.currentTarget as unknown as HTMLElement) 
  } />:  <IoIosMore size={_500? "1rem":_300? "0.7rem":"0.6rem"}  className="link"/>}
        </Stack>
      </Stack>
        <Menu anchorEl={anchorEl} 
         open={anchorEl !==null ? true:false}
              onClose={handleClose}
              anchorOrigin={{
                  vertical:"bottom",
                  horizontal:"right"
              }}
              transformOrigin={{
                  vertical:"top",
                  horizontal:"right"
              }}
              >
                  <MenuItem onClick={handleDeleteComment}>
                  Delete
                  </MenuItem>

              </Menu>
    </>
  );
};

export default Comments;
