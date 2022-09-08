import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import AuthContext from '../context/AuthContext';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(1);
  const { auth, setAuth } = React.useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <div className='navbar-container'>
      <Box sx={{ width: 700 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (!event.target.innerText) return;
            let labelText = event.target.innerText.toLowerCase()
            navigate(`/${labelText}`);
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Ranking" icon={<StarIcon fontSize='large' />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon fontSize='large' />} />
          {auth.token ?
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon fontSize='large' />} /> :
            <BottomNavigationAction label="SignIn" icon={<PersonPinIcon fontSize='large' />} />
          }
        </BottomNavigation>
      </Box>
    </div>
  );
}
