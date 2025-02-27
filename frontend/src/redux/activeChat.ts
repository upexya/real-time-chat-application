import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IChatState } from "./chatPreviewSlice";

export interface IMessageState {
  message_id: string;
  sender_id: string;
  message: string;
  time_stamp: string;
}

export interface IActiveChatState extends IChatState {
  messages: IMessageState[];
}

const initialState: IActiveChatState = {
  chat_id: "",
  chat_name: "",
  is_group_chat: false,
  time_stamp: "",
  messages: [],
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
