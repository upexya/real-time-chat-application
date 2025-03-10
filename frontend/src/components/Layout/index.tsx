import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "src/components/Navbar";
import MyChats from "src/components/MyChats";

import { getChatPreviews } from "src/services/chat";
import { getActiveChatMessages } from "src/services/message";

import { setChatPreviews } from "src/redux/chatPreviewSlice";
import { setActiveChat } from "src/redux/activeChat";
import { RootState } from "src/redux/store";

export default function Layout() {
  const dispatch = useDispatch();

  const chat_previews = useSelector((state: RootState) => state.chat_previews);

  const url_params = useParams();
  const chat_id = url_params.chat_id;

  useEffect(() => {
    handleChatPreviews();
  }, []);

  useEffect(() => {
    handleActiveChat();
  }, [chat_id, chat_previews]);

  const handleChatPreviews = async () => {
    try {
      const chat_results = await getChatPreviews();
      dispatch(setChatPreviews(chat_results));
    } catch (err) {
      console.log(err);
    }
  };

  const handleActiveChat = async () => {
    if (!chat_id) return;

    const active_chat = chat_previews.find((chat) => chat._id === chat_id);
    if (!active_chat) return;

    try {
      const chat_messages = await getActiveChatMessages({ chat_id });
      if (chat_messages) {
        dispatch(setActiveChat({ ...active_chat, messages: chat_messages }));
      }
    } catch (err: any) {
      alert(err?.messages || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="flex w-screen bg-no-repeat bg-cover bg-left-bottom px-2 py-6 gap-x-4"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          height: "calc(100vh - 72px)",
        }}
      >
        <MyChats />
        <Outlet />
      </div>
    </div>
  );
}
