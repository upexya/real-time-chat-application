import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./userSlice";
import ChatPreviewReducer from "./chatPreviewSlice";
import ActiveChatReducer from "./activeChat";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    chat_previews: ChatPreviewReducer,
    active_chat: ActiveChatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
