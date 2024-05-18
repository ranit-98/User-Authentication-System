import { configureStore } from '@reduxjs/toolkit'
import { bannerSlice } from '../Slice/BannerSlice';
import { serviceSlice } from '../Slice/ServiceSlice';
import { testimonialSlice } from '../Slice/Testimonial';
import { teamSlice } from '../Slice/TeamSlice';
import { AuthSlice } from '../Slice/AuthSlice';
import { allBlogSlice } from '../Slice/AllBlogSlice';
import { allCategorySlice } from '../Slice/AllCategorySlice';
import { recentPostSlice } from '../Slice/RecentPostSlice';
import { blogByCategorySlice } from '../Slice/BlogByCategorySlice';
import { blogDetailSlice } from '../Slice/BlogDetailSlice';
import { likeslice } from '../Slice/LikeSlice';
import {  dislikeSlice } from '../Slice/DisLikeSlice';
import { commentSectionSlice } from '../Slice/CommentSlice';
import { courseSlice } from '../Slice/CourseSlice';


const store = configureStore({
    reducer: {
      banner: bannerSlice.reducer,
      service:serviceSlice.reducer,
      testimonial:testimonialSlice.reducer,
      team:teamSlice.reducer,
      auth:AuthSlice.reducer,
      allBlog:allBlogSlice.reducer,
      allCategory: allCategorySlice.reducer,
      recentPost: recentPostSlice.reducer,
      blogByCategory:blogByCategorySlice.reducer,
      blogDetail: blogDetailSlice.reducer,
      likes:likeslice.reducer,
      dislike: dislikeSlice.reducer,
      commentSection: commentSectionSlice.reducer,
      course:courseSlice.reducer
    },
    
  });
  

export default store