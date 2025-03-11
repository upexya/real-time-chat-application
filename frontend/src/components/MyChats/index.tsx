import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ChatPreview from "./ChatPreview";
import routes from "src/constants/routes";
import Modal from "src/components/Common/Modal";
import CreateGroupChat from "src/components/GroupChat";

import { RootState } from "src/redux/store";
import { IChatState } from "src/redux/chatPreviewSlice";

export default function MyChats() {
  const [group_chat_modal_open, setGroupChatModalOpen] = useState(false);

  const chats = useSelector((state: RootState) => state.chat_previews);

  const group_chat_button = (
    <button
      onClick={() => setGroupChatModalOpen(true)}
      data-modal-target="default-modal"
      data-modal-toggle="default-modal"
      className="font-work-sans bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium px-2 py-1 rounded-md"
    >
      {" "}
      Group Chat &nbsp;
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );

  return (
    <>
      <div
        className="w-1/4 bg-white shadow-2xl p-4 h-full rounded-md"
        style={{ minWidth: "260px" }}
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <div className="font-work-sans text-2xl text-gray-600">
              My Chats
            </div>
            {group_chat_button}
          </div>

          {chats.map((chat: IChatState) => (
            <NavLink
              key={`chat-preview-${chat._id}`}
              to={`${routes.CHATS}/${chat._id}`}
            >
              <ChatPreview chat={chat} />
            </NavLink>
          ))}
        </div>
      </div>

      <Modal
        title="Create Group Chat"
        width="500px"
        is_open={group_chat_modal_open}
        setIsOpen={setGroupChatModalOpen}
      >
        <CreateGroupChat close={() => setGroupChatModalOpen(false)} />
      </Modal>
    </>
  );
}
