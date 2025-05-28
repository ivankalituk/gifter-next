import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/interfaces/interface";

const  initialState: UserState = {
    user_nickName: null,
    user_imgUrl: null,
    user_role: null,
    user_id: null,
    user_email: null,
    user_blocked: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user_nickName = action.payload.user_nickName;
            state.user_imgUrl = action.payload.user_imgUrl;
            state.user_role = action.payload.user_role;
            state.user_id = action.payload.user_id;
            state.user_email = action.payload.user_email;
            state.user_blocked = action.payload.user_blocked
        },
        
        clearUser: (state) => {
            state.user_nickName = null;
            state.user_imgUrl = null;
            state.user_role = null;
            state.user_id = null;
            state.user_email = null;
            state.user_blocked = null
        },

        setUserNickname: (state, action) => {
            state.user_nickName = action.payload.user_nickName
        },

        setUserImgPath:  (state, action) => {
            state.user_imgUrl = action.payload.user_imgUrl
        }
        
    }
})

export const {setUser, clearUser, setUserNickname, setUserImgPath} = userSlice.actions
export default userSlice.reducer