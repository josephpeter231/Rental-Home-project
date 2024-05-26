
import { Box, Typography } from '@mui/material';

const NotificationNo = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      <Typography 
        variant="h6" 
        component="div" 
        sx={{ 
          color: '#616161', 
          fontStyle: 'italic' 
        }}
      >
        There are no notifications right now
      </Typography>
    </Box>
  );
}

export default NotificationNo;
