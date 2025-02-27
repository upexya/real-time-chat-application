import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navbar from "src/components/Navbar";
import MyChats from "src/components/MyChats";

import { setChatPreviews } from "src/redux/chatPreviewSlice";
import { setActiveChat } from "src/redux/activeChat";

const mock_chat_previews = [
  {
    chat_id: "1",
    chat_name: "John Doe",
    is_group_chat: false,
    latest_message: "Hello! john 1",
    time_stamp: "2025-02-23T00:00:00",
  },
  {
    chat_id: "2",
    chat_name: "Group Chat",
    is_group_chat: true,
    latest_message: "Hello! group 2",
    time_stamp: "2025-02-23T00:00:00",
  },
  {
    chat_id: "3",
    chat_name: "Jane Doe",
    is_group_chat: false,
    latest_message: "Hello! jane 3",
    time_stamp: "2025-02-23T00:00:00",
  },
  {
    chat_id: "4",
    chat_name: "Group Chat 2",
    is_group_chat: true,
    latest_message: "Hello! group 4",
    time_stamp: "2025-02-23T00:00:00",
  },
];

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
    message_id: "1",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8f",
    time_stamp: "2025-02-23T02:00:00",
  },
  {
    message_id: "1",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sender_id: "679a4c829af58c3237f3e8f",
    time_stamp: "2025-02-23T03:00:00",
  },
];

export default function Layout() {
  const dispatch = useDispatch();

  const url_params = useParams();
  const chat_id = url_params.chat_id;

  useEffect(() => {
    dispatch(setChatPreviews(mock_chat_previews));
  }, []);

  useEffect(() => {
    const active_chat = mock_chat_previews.find(
      (chat) => chat.chat_id === chat_id
    );
    if (active_chat) {
      dispatch(
        setActiveChat({ ...active_chat, messages: current_chat_messages })
      );
    }
  }, [chat_id]);

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
