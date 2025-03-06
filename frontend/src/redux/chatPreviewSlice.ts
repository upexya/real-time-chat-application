import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {IUserState} from "./userSlice";

export interface IChatState {
  _id: string;
  chat_name: string;
  is_group_chat: boolean;
  users?: IUserState[];
  latest_message?: string;
  group_admin?: IUserState;
  time_stamp: string;
}

const initialState: IChatState[] = []


export const chatPreviewSlice = createSlice({
  name: "chat_previews",
  initialState,
  reducers: {
    setChatPreviews: (state, action: PayloadAction<IChatState[]>) => {
      Object.assign(state, action.payload);
    },
    clearChatPreviews: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setChatPreviews, clearChatPreviews } = chatPreviewSlice.actions;

export default chatPreviewSlice.reducer;
