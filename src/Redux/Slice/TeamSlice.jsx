import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../API/AxiosInstance"

export const STATUSES={
    IDLE:'idle',
    LOADING:'loading',
    ERROR: 'error'
}

export const fetchTeamData=createAsyncThunk('team/fetch',async()=>{
   const response=await axiosInstance.get(`team`)
    return response.data
})

export const teamSlice=createSlice({
    name:'team',
    initialState:{
        data:[],
        status: STATUSES.IDLE
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTeamData.pending,(state)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchTeamData.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
        })
        .addCase(fetchTeamData.rejected,(state)=>{
            state.status=STATUSES.ERROR
        })
    }

})