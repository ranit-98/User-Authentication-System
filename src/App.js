import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/pageContent/Home";
import Team from "./Pages/pageContent/Team";
import Testimonial from "./Pages/pageContent/Testimonial";
import LogIn from "./Pages/Auth/Login";
import AllBlogs from "./Pages/Blogs/AllBlogs";
import BlogsByCategory from "./Pages/Blogs/BlogsByCategory";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import Course from "./Pages/pageContent/Course";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from "./Pages/pageContent/Contact";
import Register from "./Pages/Auth/Register";
import AOS from "aos";
import 'aos/dist/aos.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { check_token } from "./Redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";

AOS.init();
function App() {
  const dispatch=useDispatch()
  // PrivateRoute component to protect routes that require authentication
  const PrivateRoute = ({ children }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  // Public routes array
  const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/home", component: <Home /> },
    { path: "/login", component: <LogIn /> },
    {path:'/register', component: <Register/>},
    { path: "/team", component: <Team /> },
    { path: "/testimonial", component: <Testimonial /> },
    {path:"/course", component:<Course/>},
    {path:'/contact', component:<Contact/>}
  ];

  // Protected routes array (routes requiring authentication)
  const protectedRoutes = [
    { 
      path: "/blogs",
      component: <AllBlogs /> 
    },{
      
      path:'/blog-details/:id',
      component:<BlogDetails/>
  },
    {
      path: "/category/:categoryId",
      component: <BlogsByCategory />,
    },
  ];

  useEffect(() => {
    dispatch(check_token())
  }, [])
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        {/* Map through public routes and render them */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        {/* Map through protected routes and render them inside PrivateRoute */}
        {protectedRoutes?.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<PrivateRoute>{route.component}</PrivateRoute>}
          />
        ))}
      </Routes>
    </Router>
    </>
  );
}

export default App;
