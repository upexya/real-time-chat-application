import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IChatState } from "./chatPreviewSlice";
import { IUserState } from "./userSlice";

export interface IMessageState {
  _id: string;
  sender: IUserState;
  content: string;
  createdAt: string;
}

export interface IActiveChatState extends IChatState {
  messages: IMessageState[];
  has_more?: boolean;
  message_count: number;
}

const initialState: IActiveChatState = {
  _id: "",
  chat_name: "",
  is_group_chat: false,
  time_stamp: "",
  messages: [],
  message_count: 0,
  has_more: true,
};

export const activeChatSlice = createSlice({
  name: "active_chat",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<IActiveChatState>) => {
      Object.assign(state, action.payload);
    },
    clearActiveChat: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setActiveChat, clearActiveChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
