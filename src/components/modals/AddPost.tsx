import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaImages } from "react-icons/fa6";

import { addPostModal } from "../../redux/serviceSlice";
import { useAppSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import { useAddPostMutation, useAllPostsQuery } from "../../redux/service";
import Loading from "../common/Loading";
import { Bounce, toast } from "react-toastify";

const AddPost = () => {
  const _600 = useMediaQuery("(min-width:600px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _300 = useMediaQuery("(min-width:300px)");
  
  const { darkMode, myInfo } = useAppSelector((state) => state.service);
  const [addNewPost, addNewPostData] = useAddPostMutation();
  const { openAddPostModal } = useAppSelector((state) => state.service);
  
  // Get the refetch function for allPosts query
  // Using page 1 as default to refetch the first page of posts
  const { refetch: refetchPosts } = useAllPostsQuery(1);
  
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const mediaRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(addPostModal(false));
    // Reset form state when closing
    setText("");
    setMedia(null);
  };

  const handlePost = async () => {
    try {
      if (!text && !media) {
        // Don't submit if there's no content
        return;
      }
      
      console.log("POST request initiated");
      const data = new FormData();
      
      if (text) {
        data.append('text', text);
      }
      
      if (media) {
        data.append('media', media);
      }
      
      await addNewPost(data);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {
    if (addNewPostData.isSuccess) {
      // Reset form state
      setText('');
      setMedia(null);
      
      // Close the modal
      dispatch(addPostModal(false));
      
      // Refetch posts to update the list
      refetchPosts();
      
      toast.success(addNewPostData.data.msg,{
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
    
    if (addNewPostData.isError) {
      console.error("Error from API:", addNewPostData.error);
    }
  }, [addNewPostData.isSuccess, addNewPostData.isError, dispatch, refetchPosts]);

  const handleMediaRef = () => {
    mediaRef.current?.click();
  };

  return (
    <>
      <Dialog
        open={openAddPostModal}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "15px",
            overflow: "hidden",
            height: "auto",
            backgroundColor: darkMode ? "#181818" : "#fff",
            border: darkMode ? "1px solid #333333" : "",
            color: darkMode ? "#fff" : "#000",
          },
        }}
        fullScreen={_600 ? false : true}
      >
        {addNewPostData?.isLoading ? (
          <Stack height={"60vh"}>
            <Loading />
          </Stack>
        ) : (
          <>
            <DialogTitle
              textAlign={"center"}
              fontSize={"1rem"}
              sx={{
                borderBottom: "1px solid #ccc",
                paddingBottom: 2,
              }}
              fontWeight={"bold"}
              mb={5}
            >
              New thread
            </DialogTitle>
            <Box position={"absolute"} top={20} left={20} onClick={handleClose}>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={"1rem"}
                className="image-icon"
              >
                Cancel
              </Typography>
            </Box>

            <DialogContent>
              <Stack flexDirection={"row"} gap={2} mb={5}>
                <Avatar
                  src={myInfo ? myInfo.profilePicture : ""}
                  alt={myInfo ? myInfo.profilePicture : "avatar"}
                />

                <Stack>
                  <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
                    {myInfo ? myInfo.userName : ""}
                  </Typography>
                  <textarea
                    cols={_400 ? 45 : 25}
                    rows={4}
                    className="text1"
                    placeholder="Start a Thread.."
                    autoFocus
                    style={{
                      backgroundColor: darkMode ? "#181818" : "#fff",
                      color: darkMode ? "#fff" : "#000",
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                  {media ? (
                    <img
                      src={URL.createObjectURL(media)}
                      id="url-img"
                      alt="Post media"
                      width={_400 ? 300 : _300 ? 200 : 100}
                      height={_400 ? 300 : _300 ? 200 : 100}
                    />
                  ) : null}

                  <FaImages
                    size={32}
                    className="image-icon"
                    onClick={handleMediaRef}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input"
                    ref={mediaRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setMedia(e.target.files[0]);
                      }
                    }}
                  />
                </Stack>
              </Stack>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" fontSize={"1rem"} color="gray">
                  Anyone can reply and quote
                </Typography>
                <Button
                  size="medium"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    backgroundColor: darkMode ? "#181818" : "#fff",
                    border: darkMode ? "1px solid #333333" : "",
                    color: darkMode ? "#fff" : "#000",
                    ":hover": {
                      bgcolor: "#E9E9E9",
                      cursor: "pointer",
                      color: "black",
                    },
                  }}
                  onClick={handlePost}
                  disabled={!text && !media}
                >
                  Post
                </Button>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AddPost;