import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTeamData } from '../../Redux/Slice/TeamSlice'
import Slider from "react-slick";

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    Container,
    Grid,
    Box,
  } from "@mui/material";
import Layout from '../../CommonComponents/Layout';
import HourglassLoader from '../../CommonComponents/HourglassLoading';
import { Margin } from '@mui/icons-material';

const Team = ({ withLayout = true }) => {
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
    const teamData=useSelector((state)=>state.team.data.TeamMember)
    const status=useSelector((state)=>state.team.status)
    useEffect(()=>{
        dispatch(fetchTeamData())
    },[dispatch])
    //console.log(teamData,status);
    // const teamContent=( <>
    //   <Typography variant="h4" align="center" gutterBottom>
    //     Our Team
    //   </Typography>
    //   <Container maxWidth="xl" style={{ marginTop: "2rem" }}  sx={{
    //           width: { sm: '100%', md: '80%' },
    //           textAlign: { sm: 'left', md: 'center' },
    //         }}>
    //     <Grid container spacing={2}>
    //       {teamData?.map((member) => (
    //         <Grid item xs={12} sm={6} md={3} key={member._id}>
    //           <Card sx={{ maxWidth: 300 }} data-aos="zoom-out-down">
    //             <CardActionArea>
    //               <CardMedia
    //                 component="img"
    //                 height="300"
    //                 image={`${process.env.REACT_APP_BASE_URL}/team/photo/${member._id}`}
    //                 alt={member.name}
    //               />
    //               <CardContent>
    //                 <Typography gutterBottom variant="h5" component="div">
    //                   {member.name}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                   {member.possession}
    //                 </Typography>
    //               </CardContent>
    //             </CardActionArea>
    //           </Card>
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Container>
    // </>)

    const teamContent=(
      <Box
      className="slider-container"
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "750px",
        backgroundColor: "#f7f7f7",

        justifyContent: "center",
        alignItems: "center",
        '@media (max-width:600px)': {
          height: 'auto', // Adjust height for extra small screens
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "700",
          margin: "20px",
          paddingTop: "70px",
        }}
        className="Sp"
      >
        Our Team
      </Typography>
      <hr
        style={{
          width: "60px",
          fontWeight: "bold",
          color: "#20b13c",
          border: "2px solid green",
          margin: "0 auto",
        }}
      />
      <Container>
        <Slider {...settings}>
          {teamData?.map((item) => (
            <Box key={item._id} mx={2 } style={{width: '100%', maxWidth: '300px'}}>
              <Card sx={{ maxWidth: 345, height: "450px", marginTop: "30px" }}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={`${process.env.REACT_APP_BASE_URL}/team/photo/${item._id}`}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="Box">
                      {item?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.possession}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
    )
  if (withLayout) {
    return (
      <Layout>
        {status==='loading' && <HourglassLoader />}
        {status==='idle' && teamContent}
      </Layout>
    );
  } else {
    return teamContent;
  }
}

export default Team


