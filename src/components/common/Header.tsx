

import { Stack, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { openMenu } from "../../redux/serviceSlice";
import React from "react";


function Header() {
  const _600 = useMediaQuery("(min-width:600px)");
  
  const {darkMode}=useAppSelector((state)=>state.service);
  const dispatch = useAppDispatch();

  const desktopMenuRef = React.useRef<HTMLDivElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  const handleMenuOpen = (menuId: string) => {
    dispatch(openMenu(menuId));
  };
  
  return (
    <>
      {_600 ? (
        <Stack
          flexDirection={"row"}
          height={52}
          justifyContent={"space-around"}
          alignItems={"center"}
          position={"sticky"}
          top={0}
          py={1}
          bgcolor={darkMode ? "black":"white"}
        >
          {
            darkMode ? <img
            src="images/Threads-logo-black-bg.webp"
            alt="logoImg"
            height={48}
            width={50}
          /> :<img
          src="images/Threads-logo-white-bg.png"
          alt="logoImg"
          height={40}
          width={70}
        />
          }

          <Stack
            justifyContent={"center"}
            width={"550px"}
            zIndex={2}
            spacing={4}
            height={96}
          >
            <Navbar/>
          </Stack>    

          <div id="desktop-menu-button" ref={desktopMenuRef} onClick={() => handleMenuOpen("desktop-menu-button")}>
            <HiOutlineMenuAlt2 
              size={32} 
              color="gray"
              cursor={"pointer"} 
            />
          </div>
        </Stack>
      ) : (
        <>
          <Stack
            position={"fixed"}
            bottom={0}
            justifyContent={"center"}
            width={"100%"}
            height={52}
            bgcolor={darkMode ? "black":"white"}
            zIndex={2}
            p={1}
          >
            <Navbar/>
          </Stack>
          
          <Grid container 
            sx={{ 
              height: 60, 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              position: "fixed",
              top: 0,
              left: 0, 
              width: "100%",
              backgroundColor: darkMode ? "black":"white",
              zIndex: 1000,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "10px"
            }}
          >
            {darkMode? <Grid size={{ xs: 6, sm: 12 }}>
              <img
                src="images/Threads-logo-black-bg.webp"
                alt="logoImg"
                height={48}
                width={50}
              />
            </Grid>:
            <Grid size={{ xs: 6, sm: 12 }}>
              <img
                src="images/Threads-logo-white-bg.png"
                alt="logoImg"
                height={40}
                width={70}
              />
            </Grid>}
            {/* Create a wrapper div for the icon */}
            <div id="mobile-menu-button" ref={mobileMenuRef} onClick={() => handleMenuOpen("mobile-menu-button")}>
              <HiOutlineMenuAlt2 
                size={32} 
                color="gray" 
                cursor={"pointer"} 
              />
            </div>
          </Grid>
        </>
      )}
    </>
  );
}

export default Header;