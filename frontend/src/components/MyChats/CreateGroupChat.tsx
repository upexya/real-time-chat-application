import { useState } from "react";

export default function CreateGroupChat(props: { close: () => void }) {
  const { close } = props;

  const [group_name, setGroupName] = useState("");
  const [name_error, setNameError] = useState("");

  const handleCreateGroupChat = () => {
    if (!group_name) {
      setNameError("Group name is required");
      return;
    }
    if (group_name.length < 3 || group_name.length > 50) {
      setNameError("Group name should be between 3 and 50 characters");
      return;
    }
    close();
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full">
        <input
          type="text"
          placeholder="Group Name"
          className={`border border-gray-300 rounded-md p-2 outline-none w-full ${
            name_error ? "border-red-700" : ""
          }`}
          value={group_name}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {name_error && (
          <div className="text-red-700 text-sm mt-2 ml-1">{name_error}</div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCreateGroupChat}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Create Chat
        </button>
      </div>
    </div>
  );
}
