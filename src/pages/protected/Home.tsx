import { Button, Stack,Typography,useMediaQuery } from "@mui/material";
import Input from "../../components/home/Input";
import PostBox from "../../components/home/PostBox";
import { useAllPostsQuery } from "../../redux/service";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hook";
import Loading from "../../components/common/Loading";

const Home = () => {
  const _600=useMediaQuery("(min-width:600px)")
  const [page,setPage]=useState(1);
  const [showMore,setShowMore]=useState(true);
  const {data,isLoading}=useAllPostsQuery(page);

  const {allPost,myInfo}=useAppSelector((state)=>state.service)

const handleLoadMore=()=>{
    setPage((pre)=> pre +1);

}

useEffect(()=>{

  if(data){
    if(data.posts.length<3){
      setShowMore(false);
    }
  }


},[data])

  return (
    <>
     
      <Stack
        flexDirection={"column"}
        gap={1}
        mx={"auto"}
        mt={_600? 0:8}
        width={"100%"}
        
        borderRadius={"4px"}
      >
         <Input ee={myInfo?.profilePicture} />
         
          {allPost? (allPost.length>0 ?  allPost.map((e)=> <PostBox key={e._id} e={e}/> ):  <Typography variant="caption" textAlign={"center"} color="primary" >No Posts Yet !</Typography> ): isLoading? <Loading/>:<>Something went Wrong!</>}
        
      </Stack>
      {showMore?   <Button size="large" onClick={handleLoadMore}
      sx={{
        my:5,
        p:3,
        // textDecoration:"underline",
        
        cursor:"pointer",
        textTransform:"none",

      }} >Load more</Button>: <Typography variant="caption" textAlign={"center"} color="primary" padding={"10px"} >You reached end!</Typography> }
    
    </>
  );
};

export default Home;
