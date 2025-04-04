import { Avatar, AvatarGroup, Badge, Stack, Stepper, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import { NavLink } from "react-router-dom";
import {IUser,IComment} from '../../../redux/serviceSlice';




interface PostDetail {
  _id: string;
  content: string;
  author: IUser;
  media: string;
  likes: IUser[];
  comments: IComment[];
  createdAt: string;
}

interface PostoneProps {
  ele: PostDetail;
}

const PostOne: React.FC<PostoneProps> = ({ ele }) => {
  const { darkMode } = useAppSelector((state) => state.service);
  const _300 = useMediaQuery("(min-width:300px)");

  // Add validation to check if ele and its properties exist
  if (!ele || !ele.author) {
    return null; // Or return a placeholder component
  }

  // Determine how many avatars to show and the total count
  const commentCount = ele.comments?.length || 0;
  const maxVisibleAvatars = 2; // Show at most 2 avatars

  return (
    <>
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        bgcolor={darkMode ? "#181818" : "white"}
      >
        <NavLink to={`/profile/threads/${ele.author._id}`}>
          <Badge
            overlap="circular"
            badgeContent={
              <Avatar
                alt="+"
                src=""
                sx={{
                  width: _300 ? 20 : 15,
                  height: _300 ? 20 : 15,
                  bgcolor: "green",
                  color: "white",
                  position: "relative",
                  right: 4,
                  bottom: 4,
                  ":hover": {
                    fontSize: _300 ? "1.2rem" : "1rem",
                    transition: "all ease-in-out 0.3s",
                  },
                }}
              >
                +
              </Avatar>
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="user"
              src={ele.author.profilePicture}
              sx={{
                width: _300 ? 40 : 30,
                height: _300 ? 40 : 30,
              }}
            />
          </Badge>
        </NavLink>
        <Stack
          flexDirection={"column"}
          alignContent={"center"}
          alignItems={"center"}
          gap={1}
          height={"90%"}
        >
          <Stepper
            orientation="vertical"
            activeStep={0}
            sx={{
              backgroundColor: darkMode ? "white" : "gray",
              border: "0.1rem solid gray",
              width: "1px",
              height: "100%",
            }}
          ></Stepper>
          
          {commentCount > 0 && (
            <AvatarGroup
              total={commentCount}
              max={maxVisibleAvatars}
              sx={{
                "& .MuiAvatar-root": {
                  width: _300 ? 24 : 18,
                  height: _300 ? 24 : 18,
                  fontSize: 12,
                },
              }}
            >
              {/* Map through the first 2 comments to show their avatars */}
              {ele.comments
                .slice(0, maxVisibleAvatars)
                .map((comment) => 
                  comment.author && comment.author.profilePicture ? (
                    <Avatar 
                      key={comment._id} 
                      src={comment.author.profilePicture} 
                      alt={comment.author.userName || "commenter"} 
                    />
                  ) : null
                )}
            </AvatarGroup>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default PostOne;