import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IReply {
  _id: string;
  post: string;
  content: string;
  author: IUser;
  createdAt: string;
}
export interface IRepost{
    _id: string;
       content: string; 
       author: IUser; 
       media:string
       likes: IUser[];
       comments: IComment[]; 
       createdAt: string;
}
export interface IThreads{
   _id: string;
       content: string;
       author: IUser; 
       media:string
       likes: IUser[];
       comments: IComment[]; 
       createdAt: string;
}
export interface IUser {
  _id: string;
  bio: string;
  createdAt: string;
  email: string;
  followers: IUser[];
  fullName: string;
  password: string;
  profilePicture: string;
  public_id: string;
  replies: IReply[]; 
  reposts: IRepost[];
  threads: IThreads[];
  updatedAt: string;
  userName: string;
}

export interface IComment {
  _id: string;
  content: string;
  author: IUser; // Populated user object
  createdAt: string; // Or Date, if you prefer
}

export interface IPost {
  _id: string;
  content: string; 
  author: IUser; 
  media: string;
  likes: IUser[];
  comments: IComment[]; 
  createdAt: string; 
  updatedAt: string;
}


interface ServiceState {
  openAddPostModal: boolean;
  openEditProfileModal: boolean;
  menuOpen: boolean;
  menuAnchorId: string | null;
  menuOpenli: boolean;
  menuAnchorIdli: string | null;
  darkMode: boolean;
  myInfo: IUser | null; 
  user: { user?: IUser } | null;
  allPost: IPost[];
  postId: string | null;
  searchedUsers: IUser[] | null; 
}


const initialState: ServiceState = {
  openAddPostModal: false,
  openEditProfileModal: false,
  menuOpen: false,
  menuAnchorId: null,
  menuOpenli: false,
  menuAnchorIdli: null,
  darkMode: true,
  myInfo: null,
  user: null,
  allPost: [],
  postId: null,
  searchedUsers:[],
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addPostModal: (state, action) => {
      state.openAddPostModal = action.payload;
    },
    addEditProfileModal: (state, action) => {
      state.openEditProfileModal = action.payload;
    },
    openMenu: (state, action: PayloadAction<string>) => {
      state.menuOpen = true;
      state.menuAnchorId = action.payload;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
      state.menuAnchorId = null;
    },
    openMenuli: (state, action: PayloadAction<string>) => {
      state.menuOpenli = true;
      state.menuAnchorIdli = action.payload;
    },
    closeMenuli: (state) => {
      state.menuOpenli = false;
      state.menuAnchorIdli = null;
    },
    toggleColorMode: (state) =>{
      state.darkMode = !state.darkMode
    },
    addMyInfo: (state, action) => {
      if (action.payload === null) {
        state.myInfo = null;
      } else {
        state.myInfo = action.payload.me;
      }
    },
    addUser: (state, action) => {
      if (!action.payload) {
        state.user = null;
        return;
      }
      state.user = action.payload;
    },
    addAllPost: (state, action) => {
      const newPostArr = [...action.payload.posts];
      if (state.allPost.length === 0) {
        state.allPost = newPostArr;
        return;
      }
      const existingPosts = [...state.allPost];
      newPostArr.forEach((e) => {
        const existingIndex = existingPosts.findIndex((i) => i._id === e._id);
        if (existingIndex !== -1) {
          existingPosts[existingIndex] = e;
        } else {
          existingPosts.push(e);
        }
      });
      state.allPost = existingPosts;
    },
    addSingle: (state, action) => {
      // Check if we have the post data in the expected format
      if (!action.payload || !action.payload.newPost) {
        console.error("Invalid post data format received");
        return;
      }
    
      const newPost = action.payload.newPost;
      
      // Check if this post already exists in the array
      const existingPostIndex = state.allPost.findIndex(post => post._id === newPost._id);
      
      if (existingPostIndex !== -1) {
        // Update existing post
        state.allPost[existingPostIndex] = newPost;
      } else {
        // Add new post at the beginning
        state.allPost = [newPost, ...state.allPost];
      }
      
      // Ensure no duplicate posts
      const uniquePosts = Array.from(
        new Map(state.allPost.map(post => [post._id, post])).values()
      );
      
      state.allPost = uniquePosts;
    },
    deleteThePost: (state) => {
      const postArr = [...state.allPost];
      const newArr = postArr.filter((e) => e._id !== state.postId);
      state.allPost = newArr;
    },
    addToSearchUsers: (state, action) => {
      state.searchedUsers = action.payload;
    }, 
    clearSearchResults: (state) => {
      state.searchedUsers = null; 
    },
    

    addPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});

export const {
  addPostModal,
  addEditProfileModal,
  openMenu,
  closeMenu,
  closeMenuli,
  openMenuli,
  toggleColorMode,
  addMyInfo,
  addUser,
  addAllPost,
  addSingle,
  deleteThePost,
  addToSearchUsers,
  addPostId,
  clearSearchResults
} = serviceSlice.actions;

export default serviceSlice.reducer;
