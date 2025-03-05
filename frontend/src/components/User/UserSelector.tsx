import { IUserState } from "src/redux/userSlice";

import Spinner from "src/components/Common/Spinner";

const avatar_size = "40px";

export default function UserSelector(props: {
  user_list: IUserState[];
  selected_users: IUserState[];
  setSelectedUsers: (user: IUserState[]) => void;
  loading?: boolean;
}) {
  const { user_list, selected_users, setSelectedUsers, loading } = props;

  if (!user_list) {
    return null;
  }

  const handleSelectUser = (user: IUserState) => {
    if (!selected_users.find((u) => u._id === user._id)) {
      setSelectedUsers([...selected_users, user]);
    }
  };

  return (
    <div className="relative w-full" style={{ maxHeight: "300px" }}>
      {loading ? (
        <div className="absolute w-full h-full bg-gray-200 opacity-25 flex justify-center items-center">
          <Spinner size={8} />
        </div>
      ) : null}

      <div
        className={`${
          loading ? "overflow-hidden" : "overflow-y-scroll"
        } flex flex-col gap-4 mt-4 `}
        style={{ maxHeight: "300px" }}
      >
        {user_list.map((user) => (
          <div
            key={`group-user-search-${user._id}`}
            onClick={() => handleSelectUser(user)}
            className="flex items-center bg-gray-100 p-2 rounded-md gap-3 cursor-pointer hover:bg-gray-200"
          >
            <div
              className="shrink-0 bg-white flex align-center justify-center overflow-hidden border border-gray-200"
              style={{
                width: avatar_size,
                height: avatar_size,
                borderRadius: "50%",
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-work-sans text-gary-500">{user.name}</p>
              <p className="font-work-sans text-gray-400">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
