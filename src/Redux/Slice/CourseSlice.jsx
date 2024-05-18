import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchCourseData=createAsyncThunk('course/fetch',async()=>{
    const response=await axiosInstance.get('course')
    return response.data
})

export const courseSlice=createSlice({
    name:'course',
    initialState:{
        data:[],
        state:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchCourseData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchCourseData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchCourseData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})