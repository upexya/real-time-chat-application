import { useState } from "react";

import { IUserState } from "src/redux/userSlice";
import Pill from "src/components/Common/Pill";
import UserSelector from "src/components/User/UserSelector";

const mock_users: IUserState[] = [
  {
    id: "6798b0abbe6cd73f04daea41",
    name: "upeachya",
    email: "userachya@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798b3c3ed3a9ef44911108f",
    name: "upeachya",
    email: "userachya1@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798b3e7303463628be08a3e",
    name: "upeachya",
    email: "userachya2@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798b3f73026f86918d5fd8b",
    name: "upeachya",
    email: "userachya3@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798b444e3d960174fa6197a",
    name: "upeachya",
    email: "userachya4@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798b46e05248b840179e38e",
    name: "upeachya",
    email: "userachya5@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798b559dda070004c79aa3c",
    name: "upeachya",
    email: "userachya6@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798bae5d9c59b25c17106ac",
    name: "upeachya",
    email: "userachya7@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798bb075de77d11bdb4114d",
    name: "upeachya",
    email: "userachya8@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798bda07972e6060db9230f",
    name: "upeachya",
    email: "userachya9@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798c23fd8fd0c39b343fa1a",
    name: "upeachya",
    email: "userachya10@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798e00dd0d39e9169dc085c",
    name: "upeachya",
    email: "userachya11@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "6798e137a7de702a2822c91c",
    name: "upeachya",
    email: "userachya12@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
  {
    id: "679a48b79af58c3237f3e8fa",
    name: "upeachya",
    email: "userachya13@gmail.com",
    avatar:
      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
  },
];

export default function CreateGroupChat(props: { close: () => void }) {
  const { close } = props;

  const [group_name, setGroupName] = useState("");
  const [name_error, setNameError] = useState("");

  const [search_input, setSearchInput] = useState("");
  const [search_error, setSearchError] = useState("");
  const [search_results, setSearchResults] = useState<IUserState[]>(mock_users);
  const [selected_users, setSelectedUsers] = useState<IUserState[]>([]);

  const handleCreateGroupChat = () => {
    if (!group_name || group_name.length < 3 || group_name.length > 50) {
      if (!group_name) setNameError("Group name is required");
      else setNameError("Group name should be between 3 and 50 characters");
      return;
    } else if (name_error) {
      setNameError("");
    }

    if (!selected_users?.length || selected_users.length < 2) {
      if (!selected_users?.length) setSearchError("Select at least one user");
      else setSearchError("Select at least two users");
      return;
    } else if (search_error) {
      setSearchError("");
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

      <div className="w-full">
        <input
          type="text"
          placeholder="Select Users"
          className={`border border-gray-300 rounded-md p-2 outline-none w-full ${
            search_error ? "border-red-700" : ""
          }`}
          value={search_input}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {search_error && (
          <div className="text-red-700 text-sm mt-2 ml-1">{search_error}</div>
        )}

        {selected_users?.length ? (
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2">
            {selected_users.map((user) => (
              <Pill
                key={user.id}
                text={user.name}
                onRemove={() =>
                  setSelectedUsers((prev) =>
                    prev.filter((u) => u.id !== user.id)
                  )
                }
              />
            ))}
          </div>
        ) : null}

        <UserSelector
          user_list={search_results}
          selected_users={selected_users}
          setSelectedUsers={setSelectedUsers}
        />
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
