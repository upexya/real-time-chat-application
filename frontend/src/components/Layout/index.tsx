import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "src/components/Navbar";
import MyChats from "src/components/MyChats";

import { getChatPreviews } from "src/services/chat";

import { setChatPreviews } from "src/redux/chatPreviewSlice";
import { setActiveChat } from "src/redux/activeChat";
import { RootState } from "src/redux/store";

const current_chat_messages = [
  {
    message_id: "1",
    message: "hello world",
    sender_id: "679a4c829af58c3237f3e8fd",
    time_stamp: "2025-02-23T00:00:00",
  },
  {
    message_id: "2",
    message: "hello world received",
    sender_id: "679a4c829af58c3237f3e8f",
    time_stamp: "2025-02-23T00:05:00",
  },
  {
    message_id: "3",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8fd",
    time_stamp: "2025-02-23T00:06:00",
  },
  {
    message_id: "4",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8fd",
    time_stamp: "2025-02-23T00:07:00",
  },
  {
    message_id: "5",
    message: "hello world",
    sender_id: "679a4c829af58c3237f3e8fd",
    time_stamp: "2025-02-23T00:10:00",
  },
  {
    message_id: "6",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8fd",
    time_stamp: "2025-02-23T01:00:00",
  },
  {
    message_id: "7",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8f",
    time_stamp: "2025-02-23T02:00:00",
  },
  {
    message_id: "8",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8f",
    time_stamp: "2025-02-23T03:00:00",
  },
];

export default function Layout() {
  const dispatch = useDispatch();

  const chat_previews = useSelector((state: RootState) => state.chat_previews);

  const url_params = useParams();
  const chat_id = url_params.chat_id;

  useEffect(() => {
    handleChatPreviews();
  }, []);

  useEffect(() => {
    const active_chat = chat_previews.find((chat) => chat._id === chat_id);
    if (active_chat) {
      dispatch(
        setActiveChat({ ...active_chat, messages: current_chat_messages })
      );
    }
  }, [chat_id, chat_previews]);

  const handleChatPreviews = async () => {
    try {
      const chat_results = await getChatPreviews();
      dispatch(setChatPreviews(chat_results));
    } catch (err) {
      console.log(err);
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
