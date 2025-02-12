import {IUserState} from "./userSlice";

export interface IChatState {
  chat_id: string;
  chat_name: string;
  is_group_chat: boolean;
  users?: IUserState[];
  latest_message?: string;
  group_admin?: IUserState;
  time_stamp: string;
}

