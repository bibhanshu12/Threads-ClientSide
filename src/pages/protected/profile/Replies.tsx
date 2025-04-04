import { Stack } from '@mui/material';
import Comments from '../../../components/home/post/Comments';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store'; 




const Replies = () => {
  // Use the RootState type from your redux setup
    const userData = useAppSelector((state: RootState) => state.service.user);
    const user = userData?.user;
  
  return (
    <>
      <Stack flexDirection={"column"} gap={2}>
        {userData ? (
          user ? (
            user.replies && user.replies.length > 0 ? (
              // Now user.replies is correctly typed as IReply[]
              user.replies.map((e) => (
                <Comments key={e._id} e={e} postId={e.post} />
              ))
            ) : ( 
              "No replies till now"
            )
          ) : (
            "User data not loaded"
          )
        ) : (
          "Loading user data..."
        )}
      </Stack>
    </>
  );
};

export default Replies;