import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import React, { useEffect, useState } from "react";
import { useLazySearchUsersQuery } from "../../redux/service";
import { addToSearchUsers, clearSearchResults } from "../../redux/serviceSlice";
import { Bounce, toast } from "react-toastify";

const SearchInput = () => {
  const { darkMode } = useAppSelector((state) => state.service);
  const [query, setQuery] = useState("");
  const [searchUser, searchuserData] = useLazySearchUsersQuery();
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (query && e.key === "Enter") {
      dispatch(clearSearchResults());
      searchUser(query);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      dispatch(clearSearchResults());
    }
  };

  useEffect(() => {
    if (searchuserData.isSuccess) {
      const results = searchuserData.data.user;
      dispatch(addToSearchUsers(results));
      toast.success(searchuserData.data.msg,{
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
    if (searchuserData.isError) {
      toast.success("Got an Error while Searching",{
        position:'bottom-center',
        autoClose:3000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"colored",
        transition:Bounce
      });
      dispatch(addToSearchUsers([]));
    }
  }, [
    searchuserData.data,
    searchuserData.isSuccess,
    searchuserData.isError,
    dispatch,
  ]);

  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      sx={{
        width: "90%",
        maxWidth: "750px",
        mx: "auto",
        mt: 3,
        "& .MuiOutlinedInput-input": {
          color: darkMode ? "white" : "black",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          bgcolor: darkMode ? "black" : "white",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #333333",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #333333",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #333333",
          },
        },
        "& .MuiOutlinedInput-input::placeholder": {
          color: darkMode ? "lightGray" : "black",
        },
      }}
      onChange={handleInputChange}
      onKeyUp={handleSearch}
      value={query}
    />
  );
};

export default SearchInput;
