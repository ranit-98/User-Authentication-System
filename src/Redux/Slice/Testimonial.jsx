import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    IDLE:'idle',
    LOADING:'loading',
    ERROR:'error'
}
export const fetchTestimonial=createAsyncThunk('testimonial/fetch',async()=>{
    const response=await axiosInstance.get('testimonial')
    return response.data
})

export const testimonialSlice=createSlice({
    name:'testimonial',
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTestimonial.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchTestimonial.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
        })
        .addCase(fetchTestimonial.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })
    }
})