import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailData } from "../../Redux/Slice/BlogDetailSlice";
import { useParams } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Layout from "../../CommonComponents/Layout";
import HourglassLoader from "../../CommonComponents/HourglassLoading";
import { fetchNoOfLikes } from "../../Redux/Slice/LikeSlice";
import { fetchNoOfDisLikes } from "../../Redux/Slice/DisLikeSlice";
import CommentSection from "./CommentSection";
import WriteComment from "./WriteComment";
const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // geting BlogDetails Data from store
  const blogDetailData = useSelector((state) => state.blogDetail.data.data);

  //geting status data from store. there can be 3 state- loading,idle,and error
  const status = useSelector((state) => state.blogDetail.status);

  //geting No Of Likes from store
  const likes = useSelector((state) => state.likes.data.likes);

  //geting No Of Dislike from store
  const dislikes = useSelector((state) => state.dislike.data.unlikes);

  // Function to update no of click each time like button get hits
  const handleLikeClick = () => {
    dispatch(fetchNoOfLikes(id));
  };

  //Function to update no of dislike each time dislike button get hits
  const handleDislikeClick =  () => {
    dispatch(fetchNoOfDisLikes(id));
  };

  useEffect(() => {
    dispatch(fetchBlogDetailData(id));
    dispatch(fetchNoOfLikes(id));
    dispatch(fetchNoOfDisLikes(id));
  }, [dispatch, id]);
  //console.log(blogDetailData,status);
  console.log(dislikes);
  return (
    <Layout>
      {status === "loading" && (
        <>
          <HourglassLoader />
        </>
      )}
      {status === "idle" && (
        <Container maxWidth="xl">
          <Paper
            elevation={3}
            style={{
              padding: "1rem 3rem",
              marginTop: "1rem",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <CssBaseline />
            <Box mt={4}>
              {/* Loading and error states for blog details */}

              {status === "error" && (
                <Typography variant="h6" color="error">
                  Error loading blog details
                </Typography>
              )}

              {/* Show the blog details and image */}
              {blogDetailData && (
                <>
                  {status === "idle" && (
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/blog/image/${blogDetailData._id}`}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  )}
                  <Typography variant="h3" mt={3} mb={2}>
                    {blogDetailData.title}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogDetailData.postText,
                      }}
                    />
                  </Typography>
                </>
              )}
              {/* For Like and Dislike */}
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "1rem", marginTop: "1rem" }}
                  onClick={handleLikeClick}
                >
                  <ThumbUpIcon style={{ marginRight: "8px" }} />
                  Like ({likes})
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "1rem", marginTop: "1rem" }}
                  onClick={handleDislikeClick}
                >
                  <ThumbDownIcon style={{ marginRight: "8px" }} />
                  Dislike ({dislikes})
                </Button>
                {/* Display comments using the new CommentsSection component */}
                <CommentSection id={id} />
              </Box>

              {/* Add the WriteComment component to allow writing new comments */}
              <WriteComment blogId={id} />
            </Box>
          </Paper>
        </Container>
      )}
    </Layout>
  );
};

export default BlogDetails;
