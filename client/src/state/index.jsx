import { createSlice } from "@reduxjs/toolkit"

// state tha will be stored in the global state, can be grabbed in the whole app
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
}

// reducers are functions that you need to change the info in initialState
// in redux you cant change the values only replace them, but in reducers you can do so
// https://redux-toolkit.js.org/api/createSlice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.log("User friends don't exist")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.post_id)
                    return action.payload.post
                return post
            })
            state.posts = updatedPosts
        },
    },
})

// syntax from redux
export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } =
    authSlice.actions
export default authSlice.reducer
