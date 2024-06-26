import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BASE_URL from '../config';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();
import { useEffect } from 'react';

export default function SignInSide() {
  const navigate = useNavigate();

  const clicksign = () =>{
    navigate('/signup')

  }


    useEffect(() => {
        // Check if the user is already authenticated (e.g., by checking for a token in local storage)
        const isAuthenticated = localStorage.getItem('islogin');
    
        // If the user is already authenticated, redirect them to the dashboard
        if (isAuthenticated) {
          navigate('/dashboard');
        }
      }, []);
    
    
    const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        const email = data.get('email');
        const password = data.get('password');
  
        const response = await fetch(`${BASE_URL}/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast.success('Login successful');
      
          localStorage.setItem('user', data.userdetails);
          localStorage.setItem('sellerid',data.userdetails._id)
          localStorage.setItem('islogin',true);
          console.log(data.userdetails._id)
          if(data.userdetails.role=="Buyer"){
            navigate('/dashboard')
            localStorage.setItem('buyerid',data.userdetails._id)
            localStorage.getItem('buyerid')
          }
          
          else{navigate('/sellerdashboard');
          localStorage.setItem('sellerid',data.userdetails._id)
        }
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to login. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to login. Please try again.');
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <ToastContainer />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <button onClick={clicksign} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </button>
                </Grid>
              </Grid>
      
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}