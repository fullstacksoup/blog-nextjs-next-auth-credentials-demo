import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';


export default function SecurePage({data}) {
    
    
    return (
      <>
        <Container maxWidth="lg" align="center">
              
          <Typography variant="h4" sx={{mb: 5}}>
            Secure Page One
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
  
