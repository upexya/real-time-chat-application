import getReadableTimeStamp from "src/utils/getReadableTimestamp";

const sent_msg_background = "rgb(91 161 155)";
const received_msg_background = "#005b89";
const avatar_size = "30px";

export default function ConversationDialog(props: {
  message: string;
  message_type: "sent" | "received";
  has_time_difference?: boolean;
  avatar_url?: string | null;
  created_at?: string;
}) {
  const { message, message_type, has_time_difference, avatar_url, created_at } =
    props;

  return (
    <div>
      <div
        className={`flex gap-2 w-full mt-2 ${
          message_type === "sent" ? "justify-end" : "justify-start"
        }`}
      >
        {has_time_difference && avatar_url ? (
          <div
            className="rounded-full overflow-hidden flex items-center justify-center"
            style={{ width: avatar_size, height: avatar_size }}
          >
            <img
              src={avatar_url}
              alt="avatar"
              className="h-full object-cover object-center"
            />
          </div>
        ) : (
          <div style={{ width: avatar_size }}></div>
        )}

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
          <p className="font-roboto text-sm text-white inline-block">
            {message}
          </p>
          {has_time_difference && created_at ? (
            <p
              className="font-roboto text-gray-100 mt-1 text-right"
              style={{ fontSize: "0.6rem" }}
            >
              {getReadableTimeStamp(created_at)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
