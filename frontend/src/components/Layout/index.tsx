import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";

import { RootState } from "src/redux/store";

import routes from "src/constants/routes";

export default function Layout() {
  const user = useSelector((state: RootState) => state.user);
  console.log("user--->", user);

  return (
    <div>
      <h1>Layout</h1>
      <ul>
        <li>
          <NavLink to={routes.HOME}>Home</NavLink>
        </li>
        <li>
          <NavLink to={routes.CHATS}>Chats</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
