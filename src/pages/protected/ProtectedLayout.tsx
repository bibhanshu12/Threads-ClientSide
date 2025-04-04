import { Stack, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom'
import Header from '../../components/common/Header';
import AddPost from '../../components/modals/AddPost';
import EditProfile from '../../components/modals/EditProfile';
import MainMenu from '../../components/menu/MainMenu';
import MyMenu from '../../components/menu/MyMenu';
import { useAppSelector } from '../../redux/hook';
// import { useUserDetailsQuery } from '../../redux/service';

 const ProtectedLayout = () => {
    // const params=useParams(); 
    const _700=useMediaQuery("(min-width:700px)")
    const {darkMode}=useAppSelector((state)=>state.service);
    // const {data}=useUserDetailsQuery(params.id);
  return (
       <>
        <Stack
        flexDirection={'column'}
        maxWidth={_700? "800px":"90%"}
        minWidth={"100%"}
        bgcolor={darkMode? "black":"white"}
        overflow={'hidden'}
        mx={"auto"}

        >

        <Header/>
        <AddPost/>
        <EditProfile/>
        <MyMenu/>
        <MainMenu/>
       {_700?  <Stack 
        flexDirection={"column"}
        justifyContent={"center"}
        borderRadius={"15px"}
          border={darkMode? "1px solid #333333":"1px solid #D9D9D9"}
        mx={"auto"}
        bgcolor={darkMode? "#181818":'white'}
        alignItems={"center"}
        width={"700px"}
        >
        <Outlet/>
        </Stack>
        : 
        <Outlet/>
        }
        </Stack>
       </>
  )
}

export default   ProtectedLayout;