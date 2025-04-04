import { Menu, MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { closeMenuli } from "../../redux/serviceSlice";
import { useDeletePostMutation } from "../../redux/service";
import { Bounce, toast } from "react-toastify";

const MyMenu=()=>{
    const dispatch=useAppDispatch();
    const {menuOpenli,menuAnchorIdli,postId}=useAppSelector((state)=>state.service)
 const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
 const [deletePost,deletePostData]=useDeletePostMutation();

 // Get the anchor element based on ID when the menu should be open
    useEffect(() => {
        if (menuOpenli && menuAnchorIdli) {
            const element = document.getElementById(menuAnchorIdli);
            setAnchorEl(element);
        } else {
            setAnchorEl(null);
        }
    }, [menuOpenli, menuAnchorIdli]);


    const handleClose=()=>{
        dispatch(closeMenuli())
        
    }
        const handleDeletePost=async()=>{
            handleClose();
             deletePost(postId);

        }
    
        useEffect(()=>{
            if(deletePostData.isSuccess){
                toast.success(deletePostData.data.msg,{
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
            if(deletePostData.isError){
                console.log(deletePostData.error)
            }
        },[deletePostData.isError,deletePostData.isSuccess]);



    return (
        <>
        <Menu anchorEl={anchorEl} open={anchorEl !==null ? true:false}
        onClose={handleClose}
        anchorOrigin={{
            vertical:"bottom",
            horizontal:"right"
        }}
        transformOrigin={{
            vertical:"top",
            horizontal:"right"
        }}
        >
            <MenuItem onClick={handleDeletePost}>
            Delete
            </MenuItem>
        </Menu>
        </>
    )
}

export default MyMenu;