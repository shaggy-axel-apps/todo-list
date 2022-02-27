import React from 'react';
import {Box, Menu, Avatar, Tooltip, MenuItem, IconButton, Typography, Button} from '@mui/material';
import Cookies from 'universal-cookie';


const stringToColor = string => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
}

const stringAvatar = name => {
    let displayName = ''
    if (name.split(' ').length === 2) {
      displayName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    } else {
      displayName = `${name[0]}`
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: displayName,
    };
}

const logout = () => {
    const cookies = new Cookies()
    cookies.remove('access')
    cookies.remove('refresh')
    window.location.reload()
}

const AvatarMenu = ({profile}) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let fullName = "Anonimous User"
    if (profile != null) {
        fullName = `${profile.firstName} ${profile.lastName}`
    }
    console.log("PROFILE", profile)
    return (
        <Box>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(fullName)}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }} id="menu-appbar"
                anchorEl={anchorElUser} keepMounted
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
            >
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                        Profile
                    </Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                        <Button onClick={logout}>
                            Logout
                        </Button>
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default AvatarMenu
