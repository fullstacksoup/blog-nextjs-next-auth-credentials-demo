import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';
import { getSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

const theme = createTheme();

export default function SignOut() {

  const router = useRouter();
  
  React.useEffect(async () => {
    const session = await getSession()        
    
    if (!session) {
      router.push('/')

    }       
  }, [])

  const handleLogoutUser = async (e) => {    
    
    await signOut();
    router.push('/')
  }

  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '70vh' }}>
        <CssBaseline />
       
        <Grid item xs={12} sm={12} md={12}  square>
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
              <KeyIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign Out
            </Typography>
            <Box component="form" noValidate sx={{ mt: 4 }}>
            <Typography component="h5" variant="h6">
              Are you sure you want to sign out?
            </Typography>
              <Button
                type="submit"
                fullWidth
                size="large"
                color="error"
                variant="contained"                
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleLogoutUser()}

              >
                Sign out
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}