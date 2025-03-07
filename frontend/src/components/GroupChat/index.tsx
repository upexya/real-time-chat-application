import { useState } from "react";
import { useSelector } from "react-redux";

import { IUserState } from "src/redux/userSlice";
import { RootState } from "src/redux/store";

import Pill from "src/components/Common/Pill";
import Toast from "src/components/Common/Toast";
import UserSelector from "src/components/User/UserSelector";
import useDebouncedSearch from "src/customHooks/useDebouncedSearch";

import endpoints from "src/constants/endpoints";

import { createGroupChat } from "src/services/groupChat";

export default function CreateGroupChat(props: { close: () => void }) {
  const current_user = useSelector((state: RootState) => state.user);

  const { close } = props;

  const [group_name, setGroupName] = useState("");
  const [name_error, setNameError] = useState("");

  const [search_input, setSearchInput] = useState("");
  const [search_error, setSearchError] = useState("");
  const [selected_users, setSelectedUsers] = useState<IUserState[]>([]);

  const [error_message, setErrorMessage] = useState("");

  const { results: search_results, loading: search_results_loading } =
    useDebouncedSearch({ query: search_input, api: endpoints.user });

  const handleCreateGroupChat = async () => {
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

    try {
      await createGroupChat({
        chat_name: group_name,
        users: [current_user._id, ...selected_users.map((user) => user._id)],
        group_admin: current_user._id,
      });
      // TODO: add group chat to redux store and redirect to chat
      close();
    } catch (error: any) {
      setErrorMessage(error?.message ?? "An error occurred");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {error_message ? <Toast type="danger" message={error_message} /> : null}

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
                key={user._id}
                text={user.name}
                onRemove={() =>
                  setSelectedUsers((prev) =>
                    prev.filter((u) => u._id !== user._id)
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
          loading={search_results_loading}
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
