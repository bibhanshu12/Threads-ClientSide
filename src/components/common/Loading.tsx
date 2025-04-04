
import { Stack,CircularProgress } from "@mui/material";


const Loading=()=>{

    return(<>
            <Stack 
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"} 
              minHeight={"50vh"}
              height={"100%"}
              width={"100%"}
              my={5}
              >
              <CircularProgress size={90} color="success"/>
            </Stack>

        </>)
}

export default Loading;