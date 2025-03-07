import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Spinner from "src/components/Common/Spinner";
import { IUserState } from "src/redux/userSlice";

const avatar_size = "30px";

export default function GroupMembers(props: {
  members?: IUserState[];
  group_admin?: IUserState;
  removeMember: (user_id: string) => void;
}) {
  const { members, group_admin, removeMember } = props;

  const [user_loading, setUserLoading] = useState<string[]>([]);

  const handleRemoveMember = async (user_id: string) => {
    setUserLoading([...user_loading, user_id]);
    try {
      await removeMember(user_id);
    } catch (error: any) {
      alert(error?.message);
    } finally {
      setUserLoading(user_loading.filter((id) => id !== user_id));
    }
  };

  if (!members?.length)
    return (
      <div className="font-work-sans flex items-center justify-center h-20">
        No members in this group
      </div>
    );

  return (
    <div
      className="flex flex-col gap-4 mt-4 overflow-y-scroll"
      style={{ maxHeight: "400px" }}
    >
      {members.map((user) => (
        <div
          key={`group-members-${user._id}`}
          className="flex items-center bg-gray-100 p-2 rounded-md gap-3 cursor-pointer justify-between"
        >
          <div className="flex items-center gap-3">
            {/* User avatar */}
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

            {/* User name and Email */}
            <div className="flex flex-col">
              <p className="font-work-sans text-gary-500">
                {user.name}
                {user?._id === group_admin?._id ? (
                  <span className="text-gray-400"> (Admin)</span>
                ) : null}
              </p>
              <p className="font-work-sans text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Remove/Loading button */}
          {user?._id === group_admin?._id ? (
            <div />
          ) : user_loading.includes(user._id) ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button onClick={() => handleRemoveMember(user._id)}>
              <FontAwesomeIcon icon={faTrash} className="text-red-700" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
