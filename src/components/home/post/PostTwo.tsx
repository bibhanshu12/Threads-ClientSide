import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FaRegHeart, FaRegComment, FaRetweet, FaHeart } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { useLikePostMutation, useRepostMutation } from "../../../redux/service";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import {IUser,IComment} from '../../../redux/serviceSlice';


interface PostDetail {
  // Define the properties of a post here
  _id: string;
  content: string;
  media?: string | undefined;
  author: IUser;
  comments: IComment[];
  likes: IUser[];
  // Add other relevant properties
}

interface PostTwoProps {
  ele: PostDetail;
}

const PostTwo: React.FC<PostTwoProps> = ({ ele }) => {
  const [likePost] = useLikePostMutation();
  const [repost, repostData] = useRepostMutation();
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const { darkMode, myInfo } = useAppSelector((state) => state.service);
  const [isLike, setIsLike] = useState(false);
  const [commentCount]=useState( ele?.comments?.length | 0);
  const [likesCount, setLikesCount] = useState(ele?.likes?.length || 0);
  
  // Check if the current user has liked the post
  const checkIfLiked = () => {
    if (ele?.likes?.length > 0 && myInfo?._id) {
      return ele?.likes?.some((user) => user._id === myInfo._id);
    }
    return false;
  };

  // Initialize like state
  useEffect(() => {
    setIsLike(checkIfLiked());
    setLikesCount(ele?.likes?.length || 0);
  }, [ele, myInfo]);


  // Handle like with optimistic update
  const handleLike = async () => {
    setIsLike(!isLike);
    setLikesCount(isLike ? likesCount - 1 : likesCount + 1);
    
    try {
      
      await likePost(ele?._id).unwrap();
    } catch (error) {
      // Reverting optimistic update on error
      console.error("Error liking post:", error);
      setIsLike(!isLike);
      setLikesCount(isLike ? likesCount + 1 : likesCount - 1);
    }
  };

  const handleRepost = async () => {
    try {
      await repost(ele?._id).unwrap();
    } catch (error) {
      console.error("Error reposting:", error);
    }
  };

  
  useEffect(() => {
    if (repostData.isSuccess) {
      toast.success(repostData.data.msg,{
        position:'bottom-center',
        autoClose:2500,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"colored",
        transition:Bounce,
      });
      console.log(repostData.data);
    }
    if (repostData.isError) {
      console.log(repostData.error);
    }
  }, [repostData.isSuccess, repostData.isError, repostData.data, repostData.error]);

  return (
    <>
      <Stack flexDirection={"column"} justifyContent={"space-between"}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.9rem"}
              fontWeight={"bold"}
            >
              {ele?.author?.userName}
            </Typography>
            <Link to={`/post/${ele?._id}`} className="status">
              <Typography
                variant="h3"
                fontSize={_300 ? "1rem" : "0.8rem"}
                sx={{
                  color: darkMode ? "white" : "black",
                }}
              >
                {ele?.content}
              </Typography>
            </Link>
          </Stack>
          {ele?.media && <img src={ele.media} alt="UserPost" className="images" />}
        </Stack>
        <Stack flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} alignItems="center" gap={3} m={1}>
            <Stack flexDirection="row" alignItems="center">
              {isLike ? (
                <FaHeart 
                  size={_400 ? 32 : _300 ? 24 : 20} 
                  color="red" 
                  onClick={handleLike}
                  className="link"
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaRegHeart 
                  size={_400 ? 32 : _300 ? 24 : 20} 
                  onClick={handleLike}
                  className="link"
                  style={{ cursor: "pointer" }}
                />
              )}
              {likesCount > 0 && (
                <Typography variant="body2" sx={{
                    color:isLike? "red":null
                }} ml={1}>
                  {likesCount}
                </Typography>
              )}
            </Stack>
              <Stack flexDirection={'row'} alignItems={"center"} > 
                  <Link to={`/post/${ele?._id}#comment`} className="link" >
            <FaRegComment size={_400 ? 32 : _300 ? 24 : 20}  style={{ cursor: "pointer"}} />
            </Link>
            {commentCount > 0 && (
                <Typography  sx={{
                    color:isLike? "":null,
                    fontSize:"15px"

                }} ml={1}>
                  {commentCount}
                </Typography>
              )}
            
             </Stack>
          
            
            <FaRetweet 
              size={_400 ? 32 : _300 ? 24 : 20} 
              onClick={handleRepost}
              style={{ cursor: "pointer" }}
              className="link"
            />
            <IoMdSend size={_400 ? 32 : _300 ? 24 : 20} className="link" style={{ cursor: "pointer" }} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PostTwo;