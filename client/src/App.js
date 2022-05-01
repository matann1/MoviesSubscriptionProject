import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AddMovieComp from './components/AddMovieComp'
import EditMovieComp from './components/EditMovieComp'
import EditMemberComp from './components/EditMemberComp'
import AddMemberComp from './components/AddMemberComp';
import UsersManagement from './components/UsersManagement'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  let data = sessionStorage.getItem('key');

  const logout = () => {
    navigate('/')
    sessionStorage.removeItem('key')
  }

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movies - Subscriptions Web Site
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0.05 }}>
          {data} 
          </Typography>
        <Button variant="outlined" color="inherit" onClick={logout}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </Box>
      
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/mainpage/' element={<MainPage />} />
        <Route path='/mainpage/:sub' element={<MainPage />} />
        <Route path='/movies/addmovie/' element={<AddMovieComp />} />
        <Route path='/members/editmember/:memberid' element={<EditMemberComp />} />
        <Route path='/mainpage/addmember/' element={<AddMemberComp />} />
        <Route path='/movies/editmovie/:movieid' element={<EditMovieComp/>}/>
        <Route path='/usersmanagement/:username' element={<UsersManagement/>}/>
      </Routes>
    </div>
  )
}

export default App