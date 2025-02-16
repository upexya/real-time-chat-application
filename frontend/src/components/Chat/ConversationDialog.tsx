const sent_msg_background = "rgb(91 161 155)";
const received_msg_background = "#005b89";

export default function ConversationDialog(props: {
  message: string;
  message_type: "sent" | "received";
}) {
  const { message, message_type } = props;

  return (
    <div
      className={`flex w-full mt-2 ${
        message_type === "sent" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-2xl w-fit`}
        style={{
          maxWidth: "60%",
          backgroundColor:
            message_type === "sent"
              ? sent_msg_background
              : received_msg_background,
        }}
      >
        <p className="font-roboto text-sm text-white inline-block">{message}</p>
      </div>
    </div>
  );
}
