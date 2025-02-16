import ConversationDialog from "src/components/Chat/ConversationDialog";
// import { IChatState } from "src/redux/chatSlice";

const chat = {
  chat_id: "1",
  chat_name: "John Doe",
  is_group_chat: false,
  latest_message: "Hello! john 1",
  time_stamp: "2021-08-20T00:00:00",
};

export default function Chats() {
  // props: { chat: IChatState }
  // const { chat } = props;

  return (
    <div className="w-3/4 bg-white shadow-2xl p-4 h-full rounded-md flex flex-col">
      <div className="font-work-sans text-2xl text-gray-600">
        {chat.chat_name}
      </div>

      <div className="bg-gray-100 my-2 rounded-md w-full h-full overflow-hidden">
        <div
          className="p-4 overflow-y-scroll"
          style={{
            height: "calc(100% - 74px)",
          }}
        >
          <ConversationDialog message="hello world" message_type={"sent"} />
          <ConversationDialog
            message="hello world received"
            message_type={"received"}
          />
          <ConversationDialog
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            message_type={"sent"}
          />
          <ConversationDialog
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            message_type={"sent"}
          />
          <ConversationDialog
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            message_type={"sent"}
          />
          <ConversationDialog
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            message_type={"received"}
          />
          <ConversationDialog
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            message_type={"received"}
          />
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
