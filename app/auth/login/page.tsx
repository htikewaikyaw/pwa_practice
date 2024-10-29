'use client';
import React, { useRef, useState } from 'react';
import { signIn, getCsrfToken, getProviders } from 'next-auth/react';
import styles from '../../../public/styles/style.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';

import Box from '@mui/material/Box';
import { FormControl, FormLabel, IconButton, Stack, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import Image from 'next/image';
// import { icons } from '../../const/images';

const SignIn = () => {
  const email = useRef('');
  const password = useRef('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const callbackUrl = '/';
    try {
      const result = await signIn('credentials', {
        email: email.current,
        password: password.current,
        redirect: false,
        callbackUrl,
      });
      console.log('r', result);
      if (result?.error) {
        setError(result?.error);
      } else {
        router.push(callbackUrl);
      }
    } catch {
      console.error('Login error:', 'login Fail');
    }
  };

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(to right, #FFF3EB 71.5%, #FFB17A 71.5%)',
          height: '100vh',
        }}
      >
        <Grid container>
          <Grid size={{ xs: 7 }}>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  mt: { xs: '100px' },
                  ml: { xs: '50px' },
                }}
              >
                <Typography
                  variant='h4'
                  sx={{
                    color: '#FF6900',
                    fontWeight: 500,
                    fontSize: '2.5rem',
                  }}
                >
                  Admin Panel
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    color: '#4C4C4C',
                    fontWeight: 500,
                  }}
                >
                  For Mobile Apps
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  mt: { xs: '58vh' },
                  ml: { xs: '50px' },
                }}
              >
                {/* <Image src={icons.myanmarocc_logo} alt='mmocc_logo' width={300} height={50} /> */}
              </Box>
            </Grid>
          </Grid>
          <Grid size={{ xs: 5 }}>
            <form noValidate>
              <Paper
                elevation={2}
                sx={{
                  mt: { xs: '85px' },
                  borderRadius: '40px',
                  height: { xs: '78vh' },
                  width: { xs: '65%' },
                }}
              >
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  sx={{ minHeight: '75vh' }}
                >
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 10 }}>
                    <Box
                      sx={{
                        // backgroundColor: "#FFB17A",
                        // borderRadius: "50px",
                        textAlign: 'center',
                        width: '100px',
                        height: '100px',
                        margin: '0 auto', // Center horizontally
                        display: 'flex', // Flexbox to center content vertically
                        justifyContent: 'center', // Center content horizontally inside the box
                        alignItems: 'center', // Center content vertically inside the box
                        mt: { xs: '25px' }, // Adjust margin-top for responsiveness
                      }}
                    >
                      {/* <LockIcon
                        fontSize="large"
                        sx={{ textAlign: "center", color: "#fff" }}
                      /> */}
                      {/* <Image src={icons.login} alt='lock' width={100} height={100} /> */}
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        mb: { xs: '10px' },
                        color: '#4C4C4C',
                      }}
                    >
                      LOGIN
                    </Typography>
                  </Grid>
                  {error && (
                    <>
                      <Grid size={{ xs: 1 }}></Grid>
                      <Grid size={{ xs: 10 }}>
                        <Alert severity='error'>{error}</Alert>
                      </Grid>
                      <Grid size={{ xs: 1 }}></Grid>
                    </>
                  )}
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 10 }}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Email'
                        required
                        id='email'
                        name='email'
                        autoComplete='email'
                        size='small'
                        InputProps={{
                          sx: {
                            '& input': {
                              backgroundColor: '#fff',
                              height: '50px',
                              color: '#424242',
                            },
                          },
                        }}
                        onChange={(e) => (email.current = e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 10 }}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Password'
                        required
                        id='password'
                        name='password'
                        size='small'
                        type='password'
                        InputProps={{
                          sx: {
                            '& input': {
                              backgroundColor: '#fff',
                              height: '50px',
                              color: '#424242',
                            },
                          },
                        }}
                        onChange={(e) => (password.current = e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 1 }}></Grid>
                  <Grid size={{ xs: 10 }}>
                    <Button
                      onClick={onSubmit}
                      variant='contained'
                      sx={{
                        width: '100%',
                        borderRadius: '5px',
                        backgroundColor: ' #FF9144',
                        color: '#FFFFFF',
                        fontWeight: 500,
                        mt: { xs: '20px' },
                        height: '50px',
                        fontSize: '1rem',
                      }}
                    >
                      LOGIN
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 1 }}></Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;
