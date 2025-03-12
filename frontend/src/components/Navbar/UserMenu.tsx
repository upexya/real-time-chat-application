import { useState, useRef } from "react";

import useClickOutside from "src/customHooks/useClickOutside";

import { IUserState } from "src/redux/userSlice";

import routes from "src/constants/routes";

export default function UserMenu(props: { user: IUserState }) {
  const { user } = props;

  const [is_open, setIsOpen] = useState(false);

  const el_ref = useRef(null);
  useClickOutside(el_ref, () => setIsOpen(false));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = routes.AUTH;
  };

  return (
    <div ref={el_ref} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="relative inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset bo hover:bg-gray-50 rounded"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!is_open)}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full border border-gray-200"
            />
          ) : null}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {is_open ? (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <p className="block px-4 py-2 text-sm text-gray-700">{user.name}</p>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
