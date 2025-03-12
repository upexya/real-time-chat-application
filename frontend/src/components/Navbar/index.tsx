import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";

import UserMenu from "./UserMenu";
import { RootState } from "src/redux/store";
import Search from "./Search";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);

  const [show_search_popup, setShowSearchPopup] = useState(false);

  return (
    <div className="relative">
      <div className="flex justify-between p-4">
        <div className="hidden md:block">
          <Search />
        </div>
        <div className="font-work-sans text-3xl text-gray-600">Talk-To-Me</div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2 md:hidden">
            <button
              className="mr-2"
              onClick={() => setShowSearchPopup(!show_search_popup)}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-600 text-lg"
              />
            </button>
          </div>
          <UserMenu user={user} />
        </div>

        {show_search_popup ? (
          <div className="absolute top-0 right-0 bg-white shadow-md w-full p-4 rounded-md z-10 flex items-center justify-between md:hidden">
            <Search />
            <button onClick={() => setShowSearchPopup(false)}>
              <FontAwesomeIcon
                icon={faClose}
                className="text-gray-600 text-lg"
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
