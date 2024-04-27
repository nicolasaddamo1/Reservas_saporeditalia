import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userData:{},
    reservasUser:[]
}
export const userSlice = createSlice({
    name:"actualUser",
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.userData = action.payload

        },
        setReservasUser: (state, action) => {
            state.reservasUser = action.payload
        }
    }
})
export const {setUser, setReservasUser} = userSlice.actions
export default userSlice.reducer