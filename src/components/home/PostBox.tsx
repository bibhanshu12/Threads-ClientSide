import React, { useEffect } from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { IoIosMore } from 'react-icons/io';
import PostOne from './post/PostOne';
import PostTwo from './post/PostTwo';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { addPostId, openMenuli } from '../../redux/serviceSlice';
import { IUser, IComment,   } from '../../redux/serviceSlice'; 


interface PostDetails {
  _id: string;
  content: string;
  author: IUser;
  media: string;
  likes: IUser[];
  comments: IComment[];
  createdAt: string;
}

interface PostProps {
  e: PostDetails;
}

// Correctly type the props
const PostBox: React.FC<PostProps> = ({ e }) => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _600 = useMediaQuery("(min-width:600px)");
  const { darkMode, myInfo } = useAppSelector((state) => state.service);
  const [isAdmin, setisAdmin] = React.useState(false);
  const [updatedAt, setupdatedAt] = React.useState('24h');
  const dispatch = useAppDispatch();
  
    const postRef = React.useRef<HTMLDivElement>(null);
    const postId = React.useId(); 
  
    const handleMenuOpenli = () => {

        dispatch(addPostId(e._id))
        dispatch(openMenuli(`post-menu-${postId}`));
    };

    const checkIsAdmin=()=>{

        if(e?.author?._id===myInfo?._id){
            setisAdmin(true);
            return 

        }
        setisAdmin(false) 
    }

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


    useEffect(()=>{
        if(e && myInfo){
            checkIsAdmin();
        }
        formatDate();

    },[e,myInfo])






    return (
        <>
            <Stack
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                
                mx="auto"
                bgcolor={darkMode? "#181818":'white'}
                color={darkMode? "white":'black'}
                width={_600 ? "90%" : _300 ? "90%" : "100%"}
                borderBottom={darkMode? "1px solid gray":"1px solid #D9D9D9"}
                p={_600 ? 2 : _400 ? 1 : "5px"}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        borderRadius: "15px"
                    },
                    transition: "all ease-in-out 0.3s",
                    position: "relative" // Add relative positioning to parent
                }}
            >
                {/* First Stack takes full available space */}
                <Stack flexDirection="row" gap={_600 ? 2 : 1} flex={1}>
                    <PostOne ele={e}/>
                    <PostTwo  ele={e}/>
                </Stack>

                {/* Second Stack positioned at top right */}
                <Stack 
                    flexDirection="row" 
                    justifyContent="center" 
                    gap={1}
                    alignItems="flex-start" // Align items to the top
                    sx={{ 
                        width: "auto", 
                        flexShrink: 0,
                        paddingTop: "5px" // Add some padding to the top
                    }}
                >
                    <Typography 
                        variant="caption" 
                        color="gray" 
                        fontSize={_400 ? "1rem" : _300 ? "0.8rem" : "0.8rem"}
                    >
                        {updatedAt}
                    </Typography>
                    
                    {/* Menu icon container */}
                   {isAdmin?  <div 
                        id={`post-menu-${postId}`} 
                        ref={postRef} 
                        onClick={handleMenuOpenli}
                        style={{ 
                            display: "flex", 
                            cursor: "pointer" 
                        }}
                    >
                        <IoIosMore size={_600 ? 28 : _400 ? 24 : 20} />
                    </div>: <div 
                        id={`post-menu-${postId}`} 
                        ref={postRef} 
                        style={{ 
                            display: "flex", 
                            cursor: "pointer" 
                        }}
                    >
                        <IoIosMore size={_600 ? 28 : _400 ? 24 : 20} />
                    </div>}
                </Stack>
            </Stack>
        </>
    )
}

export default PostBox