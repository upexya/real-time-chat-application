import { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import UserSelector from "src/components/User/UserSelector";
import useDebouncedSearch from "src/customHooks/useDebouncedSearch";
import useClickOutside from "src/customHooks/useClickOutside";

import { IUserState } from "src/redux/userSlice";

import endpoints from "src/constants/endpoints";

export default function Search() {
  const el_ref = useRef(null);

  const [search_text, setSearch] = useState("");
  const [selected_users, setSelectedUsers] = useState<IUserState[]>([]);
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
      />

      {popover_open ? (
        <div
          className="absolute max-w-lvw bg-white rounded-xl shadow-xl left-0 overflow-hidden px-4 pb-4"
          style={{ maxHeight: "300px", top: "50px", width: "500px" }}
        >
          <UserSelector
            user_list={search_results}
            selected_users={selected_users}
            setSelectedUsers={setSelectedUsers}
            loading={search_results_loading}
          />
        </div>
      ) : null}
    </div>
  );
}
