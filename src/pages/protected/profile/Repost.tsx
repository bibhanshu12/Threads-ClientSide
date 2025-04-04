import React from 'react'
import { Stack,useMediaQuery } from '@mui/material'
import PostBox from '../../../components/home/PostBox'
import { useAppSelector } from '../../../redux/hook'
import { RootState } from '../../../redux/store';


const Repost:React.FC = () => {
    const {darkMode}=useAppSelector((state)=>state.service)
     const userData = useAppSelector((state: RootState) => state.service.user);
      const user = userData?.user;
  
   const _600=useMediaQuery('(min-width:600px)');
  return (
    <>

    {user? (user.reposts.length>0 ?  <Stack
   flexDirection={"column"} gap={2} border={darkMode? "1px solid #333333":''} borderRadius={darkMode? "10px":''}   width={_600? "600px":"100%"}>
  

   {
    user.reposts.map((e)=> {
     return <>
       <PostBox key={e._id} e={e}/>
       
      </>
    })
   }

   </Stack>:"No repost Till now"):""}
   
    </>
  )
}

export default Repost