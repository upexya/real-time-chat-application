import { IChatState } from "src/redux/chatPreviewSlice";

export default function ChatPreview(props: {
  chat: IChatState;
  is_active: boolean;
}) {
  const { chat } = props;
  const { chat_name, latest_message } = chat;

  return (
    <div className="bg-gray-100 p-2 rounded-md w-full">
      <div className="font-work-sans text-lg text-gray-600">{chat_name}</div>
      {latest_message?.content ? (
        <div className="font-work-sans text-sm text-gray-400 line-clamp-2">
          <span className="text-gray-500 font-medium">
            {latest_message?.sender?.name}
          </span>
          : {latest_message?.content}
        </div>
      ) : null}
    </div>
  );
}
