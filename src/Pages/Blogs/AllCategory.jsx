import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategoryData } from '../../Redux/Slice/AllCategorySlice'

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { fetchRecentPostData } from '../../Redux/Slice/RecentPostSlice';

const style = {
    py: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };
const AllCategory = () => {
    const dispatch=useDispatch()
    const allCategoryData=useSelector((state)=>state.allCategory.data.data)
    const status=useSelector((state)=>state.allCategory.status)

    const recentPostData=useSelector((state)=>state.recentPost.data.data)
    useEffect(()=>{
        dispatch(fetchAllCategoryData())
        dispatch(fetchRecentPostData())

    },[])
    //console.log(allCategoryData,status);
    console.log(recentPostData);
return (
    <>
    {status==='loading' ? (
      // Skeleton loading for categories
      <Skeleton variant="rectangular" width="100%" height={450} />
    ) : (
      <List sx={style} data-aos="fade-left">
        <ListItem style={{ textAlign: "center", color: "white", backgroundColor: "black" }}>
          <ListItemText primary="Category" />
        </ListItem>
        <Link to={`/blogs`} style={{ textDecoration: "none", color: "black" }}>
              <ListItem style={{ textAlign: "center" }}>
                <ListItemText primary='All Blogs'/>
              </ListItem>
            </Link>
            <Divider component="li" />
        {allCategoryData?.map((category) => (
          <>
            <Link to={`/category/${category?._id}`} style={{ textDecoration: "none", color: "black" }}>
              <ListItem style={{ textAlign: "center" }}>
                <ListItemText primary={category?.category} />
              </ListItem>
            </Link>
            <Divider component="li" />
          </>
        ))}
      </List>
    )}
    
    <h3 style={{color:"white", backgroundColor:"black"}}>Recent Posts</h3>
    
    <Box>
      {status==='loading' ? (
        // Skeleton loading for recent posts
        <Skeleton variant="rectangular" width="100%" height={300} count={3} />
      ) : (
        recentPostData?.map((post, index) => (
          <Paper key={index} elevation={2} sx={{ marginBottom: 2, padding: 2 }} data-aos="zoom-in-up">
            <Box>
              {status==='idle' ? (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/blog/image/${post._id}`}
                  alt={`Image for ${post?.title}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                // Render Skeleton while image is loading
                <Skeleton variant="rectangular" width="100%" height={200} />
              )}
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <h6 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>
                <Link to={`/blog-details/${post?._id}`} style={{color: "black"}}>
                  {post?.title}
                </Link>
              </h6>
              <time style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                {new Date(post?.createdAt).toLocaleDateString()} at 
                {new Date(post?.createdAt).toLocaleTimeString()}
              </time>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  </>
  )
}

export default AllCategory


