import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    LOADING:'loading',
    IDLE:'idle',
    ERROR:'error'
}

export const fetchAllCategoryData=createAsyncThunk('allCategory/fetch',async()=>{
    const response=await axiosInstance.get('showallcategory')
    return response.data
})

export const allCategorySlice=createSlice({
    name:'allCategory',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchAllCategoryData.pending,(state)=>{
            state.status=STATUSES.LOADING
          })
          .addCase(fetchAllCategoryData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
          })
          .addCase(fetchAllCategoryData.rejected,(state)=>{
            state.status=STATUSES.ERROR
          })
    }
})