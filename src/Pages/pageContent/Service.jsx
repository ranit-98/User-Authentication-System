import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServiceData } from '../../Redux/Slice/ServiceSlice'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import { Paper } from '@mui/material';

const Service = () => {
    const dispatch=useDispatch()
    const serviceData=useSelector((state)=>state.service.data.data)
    const status=useSelector((state)=>state.service.status)
    useEffect(()=>{
        dispatch(fetchServiceData())
    },[dispatch])
   // console.log(serviceData,status);
    return (
        <Box
          id="highlights"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            color: 'white',
            bgcolor: '#06090a',
          }}
        >
          <Container
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 6 },
            }}
            
          >
            <Box
              sx={{
                width: { sm: '100%', md: '60%' },
                textAlign: { sm: 'left', md: 'center' },
              }}
               data-aos="zoom-in-down"
            >
              <Typography component="h2" variant="h4">
                Services
              </Typography>
              <Typography variant="body1" sx={{ color: 'grey.400' }}>
                Explore why our product stands out: adaptability, durability,
                user-friendly design, and innovation. Enjoy reliable customer support and
                precision in every detail.
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              {serviceData?.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Stack
                    direction="column"
                    color="inherit"
                    component={Card}
                    spacing={1}
                    useFlexGap
                    sx={{
                      p: 4,
                      height: '90%',
                      border: '1px solid',
                      borderColor: 'grey.800',
                      background: 'transparent',
                      backgroundColor: 'grey.900',
                    }}
                    data-aos="zoom-in-down"
                  >
                    {/* <Box sx={{ opacity: '50%' }}><AutoFixHighRoundedIcon/></Box> */}
                    <div >
                      <Typography fontWeight="medium" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {item.details}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>
                
              ))}
            </Grid>
          </Container>
        </Box>
      );
}

export default Service
