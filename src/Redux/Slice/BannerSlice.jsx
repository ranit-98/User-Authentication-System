import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    IDLE:'idle',
    LOADING:'loading',
    ERROR:'error'
}

export const fetchBanner=createAsyncThunk('banner/fetch',async()=>{
    const res=await axiosInstance.get('banner')
    return res.data
})

export const bannerSlice=createSlice({
    name: "banner",
    initialState: {
        data:[],
        status: STATUSES.IDLE
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchBanner.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        builder.addCase(fetchBanner.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
        })
        builder.addCase(fetchBanner.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })

    }
})