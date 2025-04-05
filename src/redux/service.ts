import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addAllPost, addMyInfo, addSingle, addUser, deleteThePost } from "./serviceSlice";

interface argstype{
  _id:string;
}
// https://server-threadbackend-production.up.railway.app/api
export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["Posts", "User", "Me"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
      
    }),
    myInfo: builder.query({
      query: () => ({
        url: "myinfo",
        method: "GET",
      }),
      providesTags: ["Me"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMyInfo(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),
    userDetails: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: ( { id }) => [{ type: "User", id }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    searchUsers:builder.query({
        query:(query)=>({
            url:`/users/search/${query}`,
            method:"GET"
        })
    })
     ,
     followUser:builder.mutation({
        query:(id)=>({

            url: `user/follow/${id}`,
            method:"PUT"
        }),
        invalidatesTags:({id})=>[{
            type:"User",id
        }],
     }), 
     updateProfile: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Me'],
      // Add an onQueryStarted to update myInfo after successful profile update
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // Wait for the mutation to complete
          const { data } = await queryFulfilled;
          
          // If the server returns updated user data, update myInfo
          if (data && data.user) {
            dispatch(addMyInfo({ me: data.user }));
          }
        } catch (err) {
          console.log("Error updating profile:", err);
        }
      }
    })
     ,
     addPost: builder.mutation({
        query:(data)=>({
            url:"post/",
            method:"POST",
            body:data,
        }),
        invalidatesTags:["Posts"],
        async onQueryStarted(_,{dispatch,queryFulfilled}){

            try{

                const {data}=await queryFulfilled;
                dispatch(addSingle(data));
            }catch(err){
                console.log(err);
                
            }

        }
    }),
    
    allPosts: builder.query({
      query: (page) => ({
        url: `post?page=${page}`,
        method: "GET",
      }),
      // Provide proper tags for the cache invalidation system
      providesTags: (result) => {
        if (!result) return [{ type: "Posts", id: "LIST" }];
        
        return [
          ...result.posts.map((args:argstype) => ({ type: "Posts", id: args._id })),
          { type: "Posts", id: "LIST" }
        ];
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // Update the Redux store with all posts
          dispatch(addAllPost(data));
        } catch (err) {
          console.log("Error fetching posts:", err);
        }
      },
    })
,
   
    deletePost:builder.mutation({
        query:(id)=>({
            url:`post/delete/${id}`,
            method:'DELETE',
        }),
        async onQueryStarted(_,{dispatch,queryFulfilled}){
            try{
                const {data}=await queryFulfilled;
                dispatch(deleteThePost(data))

            }catch(err){
                console.log(err);
                
            }

        }
    })
    ,
    likePost:builder.mutation({
        query:(id)=>({
            url:`post/like/${id}`,
            method:"PUT"
        }),
        invalidatesTags:({id})=>[{
            type:"Posts",
            id
        }],
    }),
    singlePost:builder.query({
        query:(id)=>({

            url:`post/${id}`,
            method:"GET"
        }),
        providesTags:({id})=>[{
            type:"Posts",
            id
        }]
    })
    ,
    repost:builder.mutation({
        query:(id)=>({
            url:`repost/${id}`,
            method:"PUT"
        }),
        invalidatesTags:["User"],

    }),

    addComment: builder.mutation({
      query: ({ id, content }) => ({
          url: `comment/${id}`,  // Adjust this URL to match your backend API
          method: "POST",  // Make sure it's using POST, not GET
          body: { content }
      }),
      invalidatesTags: ( { id }) => [{
          type: "Posts",
          id
      }]
  }),
    deleteComment:builder.mutation({
        query:({postId,id})=>({
            url:`comment/${postId}/${id}`,
            method:"DELETE"
        }),
        invalidatesTags:({postId})=>[{
            type:"Posts",
            postId
        }],
      
    })

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMutation,
  useUserDetailsQuery,
  useLazySearchUsersQuery,
  useFollowUserMutation,
  useUpdateProfileMutation,
  useAddPostMutation,
  useAllPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useSinglePostQuery,
  useRepostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,

} = serviceApi;
