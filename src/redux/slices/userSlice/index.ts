import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    name: string;
    email: string;
}

interface UserState {
    userInfo: UserInfo | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    userInfo: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        },
    },
});

export const { setUserInfo, clearUserInfo, setIsLoggedIn, logOut } = userSlice.actions;

export default userSlice.reducer;