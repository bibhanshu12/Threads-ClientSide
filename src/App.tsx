import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedLayout from './pages/protected/ProtectedLayout';
import Home from './pages/protected/Home';
import Search from './pages/protected/Search';
import ProfileLayout from './pages/protected/profile/ProfileLayout';
import Threads from './pages/protected/profile/Threads';
import Replies from './pages/protected/profile/Replies';
import Repost from './pages/protected/profile/Repost';
import SinglePost from './pages/SinglePost';
import Register from './pages/Register';
import Error from './pages/Error';
import { useMyInfoQuery } from './redux/service';
import Loading from './components/common/Loading';
import { useAppSelector } from './redux/hook';
import { useEffect } from 'react';

function App() {
  // You might want to check isLoading as well.
  const {isLoading } = useMyInfoQuery(undefined);

  const {myInfo,darkMode}=useAppSelector((state)=>state.service)
  




  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor="black";
    
    } else {
      document.body.style.backgroundColor="white";
    }
  }, [darkMode]);


  // Optionally, render a loading spinner until the query resolves.
  if (isLoading) {
    return <Loading/>
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: darkMode ? 'black' : 'white',
    }} >
      <BrowserRouter>
        <Routes>
          {myInfo ? (
            // Authenticated routes
            <>
              <Route path="/" element={<ProtectedLayout />}>
                <Route path="" element={<Home />} />
                <Route path="post/:id" element={<SinglePost />} />
                <Route path="search" element={<Search />} />
                <Route path="user" element={<ProfileLayout />} />
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route path="threads/:id" element={<Threads />} />
                  <Route path="replies/:id" element={<Replies />} />
                  <Route path="reposts/:id" element={<Repost />} />
                </Route>
              </Route>
              {/* Redirect public routes if user is authenticated */}
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
            </>
          ) : (
            // Public routes (unauthenticated)
            <>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Register />} />
            </>
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
