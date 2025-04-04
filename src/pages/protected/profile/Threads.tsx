
  import { Stack,useMediaQuery } from '@mui/material'
  import PostBox from '../../../components/home/PostBox'
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';

  const Threads = () => {
    const _600=useMediaQuery('(min-width:600px)');
      const userData = useAppSelector((state: RootState) => state.service.user);
          const user = userData?.user;

          
          

    return (
      <>
      {user? (user.threads.length>0?   <Stack
      flexDirection={"column"}
      width={_600? "600px":"100%"}
      >
        {user.threads.map((e)=> <PostBox key={e._id} e={e} /> )}
        
       

      </Stack>
       :"Create New Threads"):""}
    
      </>
    )
  }

  export default Threads