import { IChatState } from "src/redux/chatSlice";

export default function ChatPreview(props: {
  chat: IChatState;
  is_active: boolean;
}) {
  const { chat } = props;
  const { chat_name, latest_message } = chat;

  return (
    <div className="bg-gray-100 p-2 rounded-md w-full">
      <div className="font-work-sans text-lg text-gray-600">{chat_name}</div>
      <div className="font-work-sans text-sm text-gray-400">
        {latest_message}
      </div>
    </div>
  );
}
