import { useParams } from "react-router-dom";

import { IChatState } from "src/redux/chatPreviewSlice";

export default function ChatPreview(props: { chat: IChatState }) {
  const url_params = useParams();
  const chat_id = url_params.chat_id;

  const { chat } = props;
  const { chat_name, latest_message, is_unread } = chat;

  return (
    <div
      className={`${
        chat_id === chat?._id ? "bg-blue-100" : "bg-gray-100"
      } py-2 px-4 rounded-md w-full relative`}
    >
      <div className="font-work-sans text-lg text-gray-600 line-clamp-2">
        {chat_name}
      </div>
      {latest_message?.content ? (
        <div
          className={`font-work-sans text-sm line-clamp-2 ${
            is_unread ? "text-gray-500 font-bold" : "text-gray-400 font-normal"
          }`}
        >
          <span className={`text-gray-500 font-medium`}>
            {latest_message?.sender?.name}
          </span>
          : {latest_message?.content}
        </div>
      ) : null}

      {is_unread ? (
        <div
          className="absolute top-2 right-2 bg-blue-500 rounded-full"
          style={{ width: "8px", height: "8px" }}
        />
      ) : null}
    </div>
  );
}
