import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchAllBlogsData=createAsyncThunk('allBlogs/fetch',async()=>{
    const response=await axiosInstance.get('allBlog')
    return response.data
})

export const allBlogSlice=createSlice({
    name:'allBlogs',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllBlogsData.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchAllBlogsData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
        })
        .addCase(fetchAllBlogsData.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })
    }
})