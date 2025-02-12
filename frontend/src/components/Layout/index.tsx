import { Outlet, NavLink } from "react-router-dom";

import Navbar from "src/components/Navbar";

import routes from "src/constants/routes";

export default function Layout() {

  return (
    <div> 
      <Navbar />
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
