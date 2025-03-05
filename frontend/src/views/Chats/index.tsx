import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import ConversationDialog from "src/components/Chat/ConversationDialog";
import { RootState } from "src/redux/store";

export default function Chats() {
  const active_chat = useSelector((state: RootState) => state.active_chat);
  const user = useSelector((state: RootState) => state.user);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [active_chat?.chat_id]);

  return (
    <div className="w-3/4 bg-white shadow-2xl p-4 h-full rounded-md flex flex-col">
      <div className="font-work-sans text-2xl text-gray-600">
        {active_chat.chat_name}
      </div>

      <div className="bg-gray-100 my-2 rounded-md w-full h-full overflow-hidden">
        <div
          className="p-4 overflow-y-scroll"
          style={{
            height: "calc(100% - 74px)",
          }}
        >
          {active_chat?.messages?.length
            ? active_chat.messages.map((message) => (
                <ConversationDialog
                  key={`message-${active_chat.chat_id}-${message.message_id}`}
                  message={message.message}
                  message_type={
                    message.sender_id === user._id ? "sent" : "received"
                  }
                />
              ))
            : null}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4">
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 outline-none"
            placeholder="Type a message"
          />
        </div>
      </div>
    </div>
  );
}
