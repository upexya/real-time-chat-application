import { Outlet, NavLink } from "react-router-dom";

import routes from "src/constants/routes";

export default function Layout() {
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
