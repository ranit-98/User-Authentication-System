import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    IDLE:'idle',
    LOADING:'loading',
    ERROR: 'error'
}

export const fetchServiceData=createAsyncThunk('service/fetch',async()=>{
   const response=await axiosInstance.get(`service`)
    return response.data
})

export const serviceSlice=createSlice({
    name:'service',
    initialState:{
        data:[],
        status: STATUSES.IDLE
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchServiceData.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchServiceData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
        })
        .addCase(fetchServiceData.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })
    }

})