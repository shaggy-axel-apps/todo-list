import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


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


const UserItem = ({user}) => {
  const fullName = `${user.firstName} ${user.lastName}`
  return (
    <ListItem alignItems="flex-start">

      <ListItemAvatar>
        <Avatar {...stringAvatar(fullName)} />
      </ListItemAvatar>

      <ListItemText
        primary={user.username}
        secondary={
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {user.email}
          </Typography>
        </React.Fragment>
        }
      />

    </ListItem>
  )
}


const UserList = ({users}) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {users.map((user) => <UserItem key={user.id} user={user} />)}
    </List>
  );
}


export default UserList;
