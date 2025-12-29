import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://4b355dca-9fb9-403e-bf80-0675cc4356df-00-16tntpxz0g1he.sisko.replit.dev"

export const fetchPostsByUser = createAsyncThunk("posts/fetchPostsByUser", async (userId) => {
  const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
  return response.json();
});

export const savePost = createAsyncThunk("posts/savePost", async (postContent) => {
    const token = localStorage.getItem('authToken')
    const decode = jwtDecode(token)
    const userId = decode.id

    const data = {
        title: "Post title",
        content: postContent,
        user_id: userId
    }
    
    const response = await axios.post(`${BASE_URL}/posts`, data);
    return response.data;
});

export const searchPost = createAsyncThunk("posts/searchPost", async (searchTerm) => {
  const response = await axios.get(`${BASE_URL}/posts/search?q=${searchTerm}`);
  return response.data;
});



const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(savePost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts];
    });
    builder.addCase(searchPost.pending, (state) => {
        state.loading = true
    })
    builder.addCase(searchPost.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loading = false
    })
    
  }
});

export default postSlice.reducer;