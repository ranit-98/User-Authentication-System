import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseData } from '../../Redux/Slice/CourseSlice'


import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Layout from '../../CommonComponents/Layout';
import HourglassLoader from '../../CommonComponents/HourglassLoading';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
const Course = () => {
    const dispatch=useDispatch()
  const courseData=useSelector((state)=>state.course.data.Courses)
  const status=useSelector((state)=>state.course.status)
  useEffect(()=>{
    dispatch(fetchCourseData())
  },[])
  console.log(courseData,status);
    return (
    <>
       <Layout>
        {status==='loading' && <HourglassLoader/>}
      {status==='idle' &&<Container maxWidth="xl">
        <Typography variant="h4" align="center" gutterBottom>
          Our Courses
        </Typography>
        <Grid container spacing={2}>
          {courseData?.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course._id}>
             
                <Card sx={{ maxWidth: 345 }} data-aos="zoom-out">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      src={`${process.env.REACT_APP_BASE_URL}/course/photo/${course._id}`} 
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {course.name}
                      </Typography>
                      <Typography variant="h6" component="div" gutterBottom>
                        ₹{course.fees}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.duration}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" variant="contained" style={{marginLeft:"7rem"}}>
                      Buy now
                    </Button>
                  </CardActions> 
                </Card>
            
            </Grid>
          ))}
        </Grid>
      </Container>}
    </Layout>
    </>
  )
}

export default Course
