import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchBlogByCategoryData=createAsyncThunk('blogByCategory/fetch',async(id)=>{
    const response=await axiosInstance.get(`category/post/${id}`);
    return response.data
})

export const blogByCategorySlice=createSlice({
  name:'blogByCategory',
  initialState:{
    data:[],
    status:STATUSES.IDLE
  },
  reducer:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchBlogByCategoryData.pending,(state)=>{
        state.status=STATUSES.LOADING
      })
      .addCase(fetchBlogByCategoryData.fulfilled,(state,action)=>{
        state.data=action.payload
        state.status=STATUSES.IDLE
      })
      .addCase(fetchBlogByCategoryData.rejected,(state)=>{
        state.status=STATUSES.ERROR
      })
  }
})