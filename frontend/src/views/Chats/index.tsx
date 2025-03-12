import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import io, { Socket } from "socket.io-client";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import Modal from "src/components/Common/Modal";
import Spinner from "src/components/Common/Spinner";
import GroupMembers from "src/components/GroupChat/GroupMembersList";
import ConversationDialog from "src/components/Chat/ConversationDialog";
import Typing from "src/components/Common/Typing";

import { sendMessage, getActiveChatMessages } from "src/services/message";
import { removeGroupMember } from "src/services/groupChat";

import getTimeDifferenceInMin from "src/utils/getTimeDifference";
import socket_events from "src/constants/socket_events";

import { RootState } from "src/redux/store";
import { setActiveChat } from "src/redux/activeChat";
import { setChatPreviews } from "src/redux/chatPreviewSlice";

const time_diff_for_showing_avatar = 3; // In minutes
const time_diff_for_typing = 3000; // In ms

export default function Chats() {
  // Since we don't want re-renders when socket updates, useRef is the best choice
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  const url_params = useParams();
  const current_chat_id = url_params.chat_id;

  const [group_members_open, setGroupMembersOpen] = useState(false);
  const [message_input, setMessageInput] = useState("");
  const [page_number, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const dispatch = useDispatch();

  const active_chat = useSelector((state: RootState) => state.active_chat);
  const user = useSelector((state: RootState) => state.user);
  const chat_previews = useSelector((state: RootState) => state.chat_previews);
  const current_user = useSelector((state: RootState) => state.user);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [active_chat?._id]);

  useEffect(() => {
    if (!current_user) return;

    // Initialize socket if not already connected
    if (!socketRef?.current) {
      socketRef.current = io(process.env.REACT_APP_API_URL);
      socketRef.current.emit(socket_events.setup, current_user);
    }
    if (current_chat_id) {
      socketRef.current.emit(socket_events.join_room, current_chat_id);
    }

    return () => {
      socketRef.current?.disconnect(); // Cleanup socket on unmount
      socketRef.current = null;
    };
  }, [current_user, current_chat_id]);

  useEffect(() => {
    socketRef.current?.emit(socket_events.typing, current_chat_id);

    // Set a timeout to detect when the user stops typing
    const timeout = setTimeout(() => {
      socketRef.current?.emit(socket_events.stop_typing, current_chat_id);
    }, time_diff_for_typing);

    // Clear timeout if user types again before timeout completes
    return () => clearTimeout(timeout);
  }, [message_input]);

  useEffect(() => {
    socketRef.current?.on(socket_events.message_received, (data) =>
      handleNewMessageReceived(data)
    );

    socketRef?.current?.on(socket_events.typing, (chat_id) => {
      handleTyping(chat_id);
    });

    socketRef?.current?.on(socket_events.stop_typing, (chat_id) => {
      handleStopTyping(chat_id);
    });
  });

  const handleNewMessageReceived = (data: {
    chat: {
      _id: string;
      users: string[];
    };
    message: string;
    sender: {
      _id: string;
      name: string;
    };
  }) => {
    if (data?.chat?._id === current_chat_id) {
      dispatch(
        setActiveChat({
          ...active_chat,
          messages: [
            {
              content: data.message,
              sender: { _id: data?.sender?._id, name: data?.sender?.name },
              createdAt: new Date().toISOString(),
              _id: Math.random().toString(),
            },
            ...active_chat.messages,
          ],
        })
      );
    }
    dispatch(
      setChatPreviews(
        chat_previews.map((chat) => {
          if (chat._id === data?.chat?._id) {
            return {
              ...chat,
              latest_message: {
                _id: Math.random().toString(),
                content: data.message,
                sender: { _id: data?.sender?._id, name: data?.sender?.name },
                createdAt: new Date().toISOString(),
              },
              time_stamp: new Date().toISOString(),
              is_unread: chat._id !== current_chat_id,
            };
          }
          return chat;
        })
      )
    );
  };

  const handleTyping = (chat_id: string) => {
    if (chat_id === current_chat_id && !typing) {
      setTyping(true);
    }
  };

  const handleStopTyping = (chat_id: string) => {
    if (chat_id === current_chat_id && typing) {
      setTyping(false);
    }
  };

  const removeMember = async (user_id: string) => {
    try {
      await removeGroupMember({ chat_id: active_chat._id, user_id });
      let updated_active_chat = {
        ...active_chat,
        users: active_chat?.users?.filter((user) => user._id !== user_id),
      };
      dispatch(setActiveChat(updated_active_chat));

      let updated_chat_previews = [...chat_previews];
      let chat_index = updated_chat_previews.findIndex(
        (chat) => chat._id === active_chat._id
      );
      updated_chat_previews[chat_index] = updated_active_chat;
      dispatch(setChatPreviews(updated_chat_previews));
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const handleSendMessage = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && message_input) {
      setMessageInput("");
      try {
        let chat_messages = [
          {
            content: message_input,
            sender: user,
            createdAt: new Date().toISOString(),
            _id: Math.random().toString(),
          },
          ...active_chat.messages,
        ];
        await dispatch(
          setActiveChat({ ...active_chat, messages: chat_messages })
        );
        await sendMessage({ chat_id: active_chat._id, content: message_input });

        socketRef.current?.emit(socket_events.new_message, {
          chat: {
            _id: active_chat._id,
            users: active_chat?.users?.map((user) => user._id),
          },
          message: message_input,
          sender: {
            _id: current_user?._id,
            name: current_user?.name,
          },
        });
      } catch (err: any) {
        toast.error(err?.message || "An error occurred");
      }
    }
  };

  const handleLoadMoreMessages = async () => {
    if (loading) return;

    try {
      setLoading(true);
      let chat_messages = await getActiveChatMessages({
        chat_id: active_chat._id,
        page: page_number,
      });
      if (chat_messages) {
        dispatch(
          setActiveChat({
            ...active_chat,
            messages: [...active_chat.messages, ...chat_messages.messages],
            message_count: chat_messages.count || 0,
            has_more: chat_messages.has_more,
          })
        );
      }
      setPageNumber(page_number + 1);
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const group_members_content = active_chat?.users?.length ? (
    <div
      onClick={() => setGroupMembersOpen(true)}
      className="font-work-sans text-m text-gray-400 cursor-pointer hover:text-gray-500"
    >
      {active_chat?.users
        ?.slice(0, 3)
        .map((user) => user.name)
        .join(", ")}
      {active_chat?.users?.length > 3
        ? ` and ${active_chat.users.length - 3} more`
        : null}
    </div>
  ) : null;

  return (
    <>
      <div className="w-full md:w-3/4 bg-white shadow-2xl p-4 h-full rounded-md flex flex-col">
        <div className="font-work-sans text-2xl text-gray-600">
          {active_chat.chat_name}
        </div>
        {active_chat?.is_group_chat ? group_members_content : null}

        <div className="bg-gray-100 my-2 rounded-md w-full h-full overflow-hidden">
          <div
            className="p-4 overflow-y-scroll flex flex-col-reverse"
            style={{
              height: "calc(100% - 74px)",
            }}
          >
            <div ref={messagesEndRef} />
            {typing ? (
              <div className="mt-4">
                <Typing />
              </div>
            ) : null}

            {active_chat?.messages?.length
              ? active_chat.messages.map((message, i) => {
                  const message_type =
                    message?.sender?._id === user._id ? "sent" : "received";
                  const previous_message = active_chat?.messages?.[i - 1];
                  const show_avatar =
                    i === 0 ||
                    previous_message?.sender?._id !== message?.sender?._id ||
                    getTimeDifferenceInMin(
                      previous_message?.createdAt,
                      message?.createdAt
                    ) > time_diff_for_showing_avatar;

                  return (
                    <ConversationDialog
                      key={`message-${active_chat._id}-${message._id}`}
                      message={message.content}
                      has_time_difference={show_avatar}
                      created_at={message.createdAt}
                      avatar_url={
                        message_type === "received"
                          ? active_chat?.users?.find(
                              (user) => user?._id === message?.sender?._id
                            )?.avatar
                          : null
                      }
                      message_type={message_type}
                    />
                  );
                })
              : null}

            {active_chat?.has_more ? (
              <button
                disabled={loading}
                onClick={handleLoadMoreMessages}
                className="bg-blue-300 text-sm rounded-3xl px-4 py-2 w-fit flex justify-center mx-auto mb-4 font-work-sans hover:bg-blue-400"
              >
                {loading ? <Spinner /> : <>Load more</>}
              </button>
            ) : null}
          </div>

          <div className="p-4">
            <input
              value={message_input}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => handleSendMessage(e)}
              type="text"
              className="w-full p-2 rounded-md border border-gray-300 outline-none"
              placeholder="Type a message"
            />
          </div>
        </div>
      </div>

      <Modal
        title="Group Members"
        width="500px"
        is_open={group_members_open}
        setIsOpen={() => {
          setGroupMembersOpen(false);
        }}
      >
        <GroupMembers
          members={active_chat.users}
          group_admin={active_chat.group_admin}
          removeMember={removeMember}
        />
      </Modal>

      <ToastContainer />
    </>
  );
}
