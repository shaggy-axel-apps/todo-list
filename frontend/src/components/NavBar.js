import * as React from 'react';
import {Link} from 'react-router-dom';

import {
  AppBar, Box, Toolbar, IconButton, Typography,
  Menu, Container, Button, MenuItem} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import logo from "../duck.png"
import AvatarMenu from './AvatarMenu';
import Cookies from 'universal-cookie';


const users = {id: 1, name: 'Users', href: "/"}
const projects = {id: 2, name: 'Projects', href: "/projects/"}
const issues = {id: 3, name: 'Issues', href: "/issues/"}
const pages = [users, projects, issues];

const isAuthenticated = () => {
  const cookies = new Cookies()
  if (cookies.get('access')) {
    return true
  } else {
    return false
  }
}


const NavbarItem = ({name, href}) => {
  return (
      <Link className="nav-link" to={href}>{name}</Link>
  )
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} className="App-logo" alt="logo" width={40}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <NavbarItem name={page.name} href={page.href}/>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} className="App-logo" alt="logo" width={40}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavbarItem name={page.name} href={page.href}/>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated()?
             <AvatarMenu/>: <Link to='/login'>Login</Link>
            }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
