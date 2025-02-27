import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import routes from "src/constants/routes";
import ChatPreview from "./ChatPreview";

import { RootState } from "src/redux/store";
import { IChatState } from "src/redux/chatPreviewSlice";

export default function MyChats() {
  const chats = useSelector((state: RootState) => state.chat_previews);

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
