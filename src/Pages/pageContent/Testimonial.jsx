import React, { useEffect, Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestimonial } from '../../Redux/Slice/Testimonial'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import HourglassLoader from '../../CommonComponents/HourglassLoading';
import Layout from '../../CommonComponents/Layout';
import Slider from "react-slick";

const Testimonial = ({withLayout=true}) => {
    const theme = useTheme();
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    const dispatch=useDispatch()
    const testimonialData=useSelector((state)=>state.testimonial.data.testimonials)
    const status=useSelector((state)=>state.testimonial.status)
    useEffect(()=>{
        dispatch(fetchTestimonial())
    },[dispatch])
  // console.log(testimonialData,status);

   const testimonialContent=(
      <>
       <Container
          id="testimonials"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
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
          >
            <Typography component="h2" variant="h4" color="text.primary">
              Testimonials
            </Typography>
            <Typography variant="body1" color="text.secondary">
              See what our customers love about our products. Discover how we excel in
              efficiency, durability, and satisfaction. Join us for quality, innovation,
              and reliable support.
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {testimonialData?.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    p: 1,
                  }}
                  data-aos="zoom-in-down"
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.talk}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      pr: 2,
                    }}
                  >
                    <CardHeader
                     avatar={<Avatar src={`https://restapinodejs.onrender.com/api/testimonials/photo/${testimonial._id}`} />}
                      title={testimonial.name}
                      subheader={testimonial.position}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
   )
   
   
   if (withLayout) {
    return (
      <Layout>
        {status==='loading' && <HourglassLoader />}
        {status==='idle' && testimonialContent}
      </Layout>
    );
  } else {
    return testimonialContent
  }
}

export default Testimonial

