import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person2Outlined";
import { Stack, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import { addPostModal } from "../../redux/serviceSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";


const Navbar = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const dispatch = useAppDispatch();
  const {darkMode,myInfo}=useAppSelector((state)=>state.service)
  

  const handleAddPost = () => {
    dispatch(addPostModal(true));
  };

    // Define common styles for icons, optionally using a function for active styles.
    const getIconStyle = (isActive: boolean) => ({
      cursor: "pointer",
      width: _300 ? "32px" : "24px",
      height: _300 ? "32px" : "24px",
      color: darkMode? (isActive ? "white" : "gray"):(isActive ? "black" : "gray"), // Change colors based on active state
    });

  return (
    <>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <NavLink to="/"
         style={({ isActive }) => getIconStyle(isActive)}
        >
          <HomeIcon
            style={{ cursor: "pointer" }}
            sx={{
              width: _300 ? "32px" : "24px",
              height: _300 ? "32px" : "24px",
            }}
          />
        </NavLink>
        <NavLink to="/search"
                 style={({ isActive }) => getIconStyle(isActive)}
>
          <SearchIcon
            fontSize="large"
            
            sx={{
              width: _300 ? "32px" : "24px",
              height: _300 ? "32px" : "24px",
            }}
          />
        </NavLink>

        
        <AddIcon
          fontSize="large"
          style={{ color: "gray", cursor: "pointer" }}
          sx={{
            width: _300 ? "32px" : "24px",
            height: _300 ? "32px" : "24px",
          }}
          onClick={handleAddPost}
        />

        <NavLink to="/favorite"
        style={({ isActive }) => getIconStyle(isActive)}
>
          <FavoriteBorderIcon
            fontSize="large"
            sx={{
              width: _300 ? "32px" : "24px",
              height: _300 ? "32px" : "24px",
            }}
          />
        </NavLink>
        <NavLink to={`/profile/threads/${myInfo?._id}`}
            style={({ isActive }) => getIconStyle(isActive)}

        >
          <PersonIcon
            fontSize="large"
            sx={{
              width: _300 ? "32px" : "24px",
              height: _300 ? "32px" : "24px",
            }}
          />
        </NavLink>
      </Stack>
    </>
  );
};

export default Navbar;
