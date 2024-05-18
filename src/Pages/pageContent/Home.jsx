import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bannerSlice, fetchBanner } from "../../Redux/Slice/BannerSlice";
import Carousel from "react-material-ui-carousel";
import { Box, CardMedia, Typography } from "@mui/material";
import Service from "./Service";
import Testimonial from "./Testimonial";
import Team from "./Team";
import Layout from "../../CommonComponents/Layout";
import HourglassLoading from '../../CommonComponents/HourglassLoading'
const Home = () => {
  const dispatch = useDispatch();
  const bannerData = useSelector((state) => state.banner?.data.bannerdata);
  const status = useSelector((state) => state.banner?.status);
  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);
 // console.log(bannerData, status);
 console.log(status);
 
  return (
    <>
    <Layout>
      {status==='loading' && <HourglassLoading/>}
     {status!=='loading' && 
     <>
     <Carousel autoPlay={true}>
        {bannerData?.map((data, index) => (
          <Box key={index}>
            <CardMedia
              component="img"
              src={`${process.env.REACT_APP_BASE_URL}/banner/photo/${data._id}`}
              height="680vh"
              style={{objectFit:'fit'}}
            />
               <Box
            style={{
              position: 'absolute',
              bottom: 20, // Adjust the vertical position as desired
              left: 20, // Adjust the horizontal position as desired
              color: 'white', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px',
              borderRadius: '5px', 
            }}
          >
            <Typography variant="h4">
              {data.title} 
            </Typography>
            <Typography variant="body1">
              {data.description} 
            </Typography>
          </Box>
          </Box>
        ))}
      </Carousel>
      <Service/>
      
      <Testimonial withLayout={false}/>
      
      <Team withLayout={false}/>
      
      </>
      }
      </Layout>
    </>
  );
};

export default Home;
