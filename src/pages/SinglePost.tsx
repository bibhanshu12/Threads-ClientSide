import { Stack, TextField, useMediaQuery } from "@mui/material";
import PostBox from "../components/home/PostBox";
import Comments from "../components/home/post/Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useSinglePostQuery } from "../redux/service";
import { useAppSelector } from "../redux/hook";
import { Bounce, toast } from "react-toastify";
import {IUser} from "../redux/serviceSlice"

interface etype{
 _id:string;
 post:string;
  author:IUser;
  content:string;
  createdAt:string;
}


const SinglePost = () => {
  const _600= useMediaQuery("(min-width:600px)")
  const params=useParams();
  const {darkMode}=useAppSelector((state)=>state.service)
  const { data, refetch } = useSinglePostQuery(params?.id);
  const [comment,setComment]=useState('');
  const [addComment,addCommentData]=useAddCommentMutation();

  const handleCommentPost = async(e:React.KeyboardEvent) => {
    if(data && e.key === "Enter"){
      const info = {
        id: data.post._id,
        content: comment
      }
      try {
        await addComment(info);
      } catch (err) {
        console.error("Error posting comment:", err);
      }
    }
  }

  useEffect(()=>{
    if(addCommentData.isSuccess){
      toast.success(addCommentData.data.msg,{
                        position:'bottom-center',
                        autoClose:2500,
                        hideProgressBar:false,
                        closeOnClick:true,
                        pauseOnHover:true,
                        draggable:true,
                        theme:"colored",
                        transition:Bounce
                      });
      setComment("");
      refetch();
      console.log(addCommentData.data)
    }
    if(addCommentData.isError){
      console.log(addCommentData.error)
    }
  },[addCommentData.isSuccess,addCommentData.isError])


  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2} mt={_600? '':9}>
        <PostBox e={data?.post} />
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          {data? (data.post.comments.length>0 ? (data.post.comments.map((e:etype)=> <Comments e={e} key={e._id} postId={data?.post._id} />)):null):null}
          {/* <Comments /> */}
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comment here..."
          id="comment"
          sx={{
            width: "50%",
            mx: "auto",
            my: 5,
            p: 1,
            // Style the input text color
            "& input": { color: darkMode ? "white" : "black" },
            // Style the placeholder text
            "& input::placeholder": { color: darkMode ? "white" : "black" },
            // Style the outline border color in various states
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "white" : "black" },
              "&:hover fieldset": { borderColor: darkMode ? "white" : "black" },
              "&.Mui-focused fieldset": { borderColor: darkMode ? "white" : "black" },
            },
          }}
          onChange={(e)=>setComment(e.target.value)}
          onKeyUp={handleCommentPost}
          value={comment? comment :""}
        />
      </Stack>
    </>
  );
};


export default SinglePost;