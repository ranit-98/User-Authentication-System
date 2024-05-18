import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogByCategoryData } from '../../Redux/Slice/BlogByCategorySlice'
import { useParams } from 'react-router-dom'

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import HourglassLoader from "../../CommonComponents/HourglassLoading"
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import AllCategory from './AllCategory';
import Layout from '../../CommonComponents/Layout';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const BlogsByCategory = () => {
    const {categoryId}=useParams()
    const dispatch=useDispatch()
    const blogByCategoryData=useSelector((state)=>state.blogByCategory.data.data)
    const status=useSelector((state)=>state.blogByCategory.status)
    useEffect(()=>{
        dispatch(fetchBlogByCategoryData(categoryId))
    },[dispatch,categoryId])
    console.log(blogByCategoryData,status);
  return (
    <>
    <Layout>
      {status==='loading' && <HourglassLoader />}
      {status==='idle' && (
        <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Item data-aos="fade-right" >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="center">Photo</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blogByCategoryData?.map((blog) => (
                        <StyledTableRow key={blog._id}>
                          <StyledTableCell component="th" scope="row">
                            <h3>{blog.title}</h3>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            dangerouslySetInnerHTML={{
                              __html: blog.postText.slice(0, 200),
                            }}
                          />
                          {/* <StyledTableCell align="center">
                            <CardMedia
                              component="img"
                              src={blogsImage[blog._id]}
                              alt={blog.title}
                              style={{
                                width: "250px",
                                height: "200px",
                                objectFit: "contain",
                              }}
                            />
                          </StyledTableCell> */}
                           <StyledTableCell align="center">
                            {status==='idle' ? (
                              <CardMedia
                                component="img"
                                src={`${process.env.REACT_APP_BASE_URL}/blog/image/${blog._id}`}
                                alt={blog.title}
                                style={{
                                  width: "250px",
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              // Show Skeleton while image is loading
                              <Skeleton variant="rectangular" width={250} height={200} />
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Link to={`/blog-details/${blog._id}`}>
                              <Button variant="contained">
                                <VisibilityIcon />
                              </Button>
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                 <AllCategory/>
              </Item>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
    </>
  )
}

export default BlogsByCategory
