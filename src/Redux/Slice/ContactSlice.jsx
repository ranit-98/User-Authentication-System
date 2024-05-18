import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../API/AxiosInstance";
import { toast } from "react-toastify";

export const addContactDetails=async(upData)=>{
   try {
    const data=await axiosInstance.post('contact/create',upData)
    toast.success(data?.data?.message)
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
   }
}