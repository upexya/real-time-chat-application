import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import UserSelector from "src/components/User/UserSelector";
import useDebouncedSearch from "src/customHooks/useDebouncedSearch";
import useClickOutside from "src/customHooks/useClickOutside";

import { RootState } from "src/redux/store";
import { IUserState } from "src/redux/userSlice";
import { setChatPreviews } from "src/redux/chatPreviewSlice";

import { createChat } from "src/services/chat";

import endpoints from "src/constants/endpoints";
import routes from "src/constants/routes";

export default function Search() {
  const el_ref = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const current_user = useSelector((state: RootState) => state.user);
  const chat_previews = useSelector((state: RootState) => state.chat_previews);

  const [search_text, setSearch] = useState("");
  const [popover_open, setPopoverOpen] = useState(false);

  useClickOutside(el_ref, () => setPopoverOpen(false));

  const { results: search_results, loading: search_results_loading } =
    useDebouncedSearch({ query: search_text, api: endpoints.user });

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setPopoverOpen(true);
    } else if (popover_open) {
      setPopoverOpen(false);
    }
  };

  const handleUserSelect = async (user: IUserState[]) => {
    try {
      console.log(user);
      const result = await createChat({
        chat_name: `${current_user.name} & ${user[0].name}`,
        users: [current_user._id, user[0]._id],
      });
      const is_existing_chat = result?.is_existing_chat;
      if (is_existing_chat) {
        const updated_chat_previews = chat_previews.filter(
          (chat) => chat._id !== result._id
        );
        dispatch(setChatPreviews([result, ...updated_chat_previews]));
      } else {
        dispatch(setChatPreviews([result, ...chat_previews]));
      }

      setPopoverOpen(false);
      navigate(`${routes.CHATS}/${result._id}`);
    } catch (error: any) {
      alert(error?.message ?? "An error occurred");
    }
  };

  return (
    <div
      ref={el_ref}
      className="flex items-center gap-x-2 bg-gray-200 py-2 px-4 rounded-2xl relative"
    >
      <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
      <input
        className="outline-none bg-transparent"
        placeholder="Search User"
        value={search_text}
        onChange={handleSearch}
        onClick={() => setPopoverOpen(true)}
      />

      {popover_open ? (
        <div
          className="absolute max-w-lvw bg-white rounded-xl shadow-xl left-0 overflow-hidden px-4 pb-4"
          style={{ top: "50px", width: "500px" }}
        >
          <UserSelector
            user_list={search_results}
            selected_users={[]}
            setSelectedUsers={handleUserSelect}
            loading={search_results_loading}
          />
        </div>
      ) : null}
    </div>
  );
}
