import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addMyInfo, closeMenu, toggleColorMode } from "../../redux/serviceSlice";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "../../redux/service";
import { Bounce, toast } from "react-toastify";


const MainMenu = () => {
    const { menuOpen, menuAnchorId,myInfo } = useAppSelector((state) => state.service);
    const dispatch = useAppDispatch();
    const [logoutMe,logoutmeData]=useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


    useEffect(() => {
        if (menuOpen && menuAnchorId) {
            const element = document.getElementById(menuAnchorId);
            setAnchorEl(element);
        } else {
            setAnchorEl(null);
        }

    }, [menuOpen, menuAnchorId]);


    useEffect(() => {
        if(logoutmeData.isSuccess){
          dispatch(addMyInfo(null));
          window.location.reload();
           toast.success(logoutmeData.data.msg,{
                  position:'bottom-center',
                  autoClose:2500,
                  hideProgressBar:false,
                  closeOnClick:true,
                  pauseOnHover:true,
                  draggable:true,
                  theme:"colored",
                  transition:Bounce
                });
        }
      }, [logoutmeData.isSuccess, dispatch]);
      
    const handleClose = () => {
        dispatch(closeMenu());
    };

    const handleToggleTheme = () => {
        // Your theme toggle logic
        handleClose();
        dispatch(toggleColorMode())
        
    };

    const handleLogout = async() => {
        // Your logout logic
        handleClose();
        await logoutMe(undefined);

    };

    return (
        <>
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuOpen}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuItem onClick={handleToggleTheme}>
                    Toggle Theme
                </MenuItem>

               
                    <MenuItem onClick={handleClose}  component={Link} 
          to={`/profile/threads/${myInfo?._id}`} >My Profile</MenuItem>
              
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default MainMenu;