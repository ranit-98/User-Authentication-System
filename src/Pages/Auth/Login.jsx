

import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, RegLog } from '../../Redux/Slice/AuthSlice';
import { toast } from 'react-toastify';
import Layout from '../../CommonComponents/Layout';
import Loading from '../../CommonComponents/Loading';

const defaultTheme = createTheme();

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state?.auth) || {};
  const { redirectTo,loading} = authState;
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  
  
  const onSubmit = async (data) => {
  //setIsLoading(true)
 
    try {
      const loginData = {
        email: data.email,
        password: data.password
      };
      
       dispatch(loginRequest(loginData));
     
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Login error:', error);
     
    } 
  };
  
  useEffect(() => {
    const token=localStorage.getItem("token") || sessionStorage.getItem("token")
    //console.log("token",token);
    if (token !==null || token !==undefined) {
     navigate(redirectTo);
    }
  }, [redirectTo, navigate]);

//console.log("bnklhnl",loading);
 
const reg = () => {
  dispatch(RegLog())
}
  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
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
                Sign In
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? 'Email is required' : ''}
                  {...register("email", { required: true })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password ? 'Password is required' : ''}
                  {...register("password", { required: true })}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <Loading /> : "Sign In"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
};

export default LogIn;
