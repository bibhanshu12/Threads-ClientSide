import { Stack, Typography, useMediaQuery } from "@mui/material";
import SearchFollow from "../../components/search/SearchFollow";
import SearchInput from "../../components/search/SearchInput";
import { useAppSelector } from "../../redux/hook";

const Search = () => {
  const { searchedUsers } = useAppSelector((state) => state.service);
  const _600 = useMediaQuery("(min-width:600px)");
 

  return (
    <Stack
      flexDirection={"column"}
      alignContent={"center"}
      width="100%"
      maxWidth="750px"
      mx="auto"
      mt={_600 ? 2 : 8}
      borderRadius={"20px"}
    >
      <SearchInput />
      <Typography
        variant="h6"
        fontSize={".9rem"}
        fontWeight={"bold"}
        sx={{
          color: "#999999",
          my: "20px",
          mx: "auto",
        }}
      >
        Follow Suggestions
      </Typography>

      {searchedUsers !== null ? (
        searchedUsers.length > 0 ? (
          searchedUsers.map((e) => <SearchFollow key={e?._id} e={e} />)
        ) : (
          <Typography
            variant="h6"
            fontSize={".9rem"}
            fontWeight={"bold"}
            sx={{
              color: "#999999",
              my: "20px",
              mx: "auto",
            }}
          >
            No user Found!
          </Typography>
        )
      ) : (
        <Typography
          variant="h6"
          fontSize={".9rem"}
          fontWeight={"bold"}
          sx={{
            color: "#999999",
            my: "20px",
            mx: "auto",
          }}
        >
          Start Searching...
        </Typography>
      )}
    </Stack>
  );
};

export default Search;
