import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import UserMenu from "./UserMenu";
import { RootState } from "src/redux/store";
import Search from "./Search";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex justify-between p-4">
      <Search />
      <div className="font-work-sans text-3xl text-gray-600">Talk-To-Me</div>
      <div className="flex items-center gap-x-2">
        <button className="mr-2">
          <FontAwesomeIcon icon={faBell} className="text-gray-600 text-lg" />
        </button>
        <UserMenu user={user} />
      </div>
    </div>
  );
}
