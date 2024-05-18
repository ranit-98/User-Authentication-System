import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchBlogDetailData=createAsyncThunk('blogDetail/fetch',async(id)=>{
    const response=await axiosInstance.get(`blogdetails/${id}`)
    return response.data
})

export const blogDetailSlice=createSlice({
    name:'blogDetail',
    initialState:{
        data: [],
        status: STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchBlogDetailData.pending,(state)=>{
                state.status=STATUSES.LOADING
          })
          .addCase(fetchBlogDetailData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchBlogDetailData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})