import {configureStore} from '@reduxjs/toolkit'
import serviceSlice from './serviceSlice';
import { serviceApi } from './service';


const store=configureStore({

    reducer:{
        service:serviceSlice,
        [serviceApi.reducerPath]:serviceApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(serviceApi.middleware),
} )


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;