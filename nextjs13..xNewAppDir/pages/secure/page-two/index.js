import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

export default function SecurePage({data}) {
    
    return (
      <>
        <Container maxWidth="lg" align="center">

          <Typography variant="h4" sx={{mb: 5}}>
            Secure Page Two
          </Typography>                      

        </Container>
      </>
    );    
}


export async function getServerSideProps(context) {
    
  return {
    props: {      
      data: []
    },
  };
}
  
