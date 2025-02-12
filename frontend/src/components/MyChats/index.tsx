import { NavLink } from "react-router-dom";

import routes from "src/constants/routes";
import { IChatState } from "src/redux/chatSlice";
import ChatPreview from "./ChatPreview";

const chats = [
  {
    chat_id: "1",
    chat_name: "John Doe",
    is_group_chat: false,
    latest_message: "Hello! john 1",
    time_stamp: "2021-08-20T00:00:00",
  },
  {
    chat_id: "2",
    chat_name: "Group Chat",
    is_group_chat: true,
    latest_message: "Hello! group 2",
    time_stamp: "2021-08-20T00:00:00",
  },
  {
    chat_id: "3",
    chat_name: "Jane Doe",
    is_group_chat: false,
    latest_message: "Hello! jane 3",
    time_stamp: "2021-08-20T00:00:00",
  },
  {
    chat_id: "4",
    chat_name: "Group Chat 2",
    is_group_chat: true,
    latest_message: "Hello! group 4",
    time_stamp: "2021-08-20T00:00:00",
  },
];

export default function MyChats() {
  return (
    <div className="w-1/4 bg-white shadow-2xl p-4 h-full rounded-md">
      <div className="flex flex-col gap-y-2">
        <div className="font-work-sans text-2xl text-gray-600">My Chats</div>
        {chats.map((chat: IChatState) => (
          <NavLink
            key={`chat-preview-${chat.chat_id}`}
            to={`${routes.CHATS}/${chat.chat_id}`}
          >
            <ChatPreview chat={chat} is_active />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
