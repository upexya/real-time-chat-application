import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "src/components/Common/Modal";
import GroupMembers from "src/components/GroupChat/GroupMembersList";
import ConversationDialog from "src/components/Chat/ConversationDialog";

import { sendMessage } from "src/services/message";
import { removeGroupMember } from "src/services/groupChat";

import getTimeDifferenceInMin from "src/utils/getTimeDifference";

import { RootState } from "src/redux/store";
import { setActiveChat } from "src/redux/activeChat";
import { setChatPreviews } from "src/redux/chatPreviewSlice";

const time_diff_for_showing_avatar = 3;

export default function Chats() {
  const [group_members_open, setGroupMembersOpen] = useState(false);
  const [message_input, setMessageInput] = useState("");

  const dispatch = useDispatch();

  const active_chat = useSelector((state: RootState) => state.active_chat);
  const user = useSelector((state: RootState) => state.user);
  const chat_previews = useSelector((state: RootState) => state.chat_previews);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [active_chat?._id]);

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
      alert(err?.message);
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
      } catch (err: any) {
        alert(err?.message || "An error occurred");
      }
    }
  };

  return (
    <>
      <div className="w-3/4 bg-white shadow-2xl p-4 h-full rounded-md flex flex-col">
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
            <div ref={messagesEndRef} />
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
    </>
  );
}
