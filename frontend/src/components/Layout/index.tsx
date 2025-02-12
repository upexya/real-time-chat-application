import { Outlet } from "react-router-dom";

import Navbar from "src/components/Navbar";
import MyChats from "src/components/MyChats";

export default function Layout() {
  return (
    <div>
      <Navbar />

      <div
        className="flex w-screen bg-no-repeat bg-cover bg-left-bottom px-2 py-6 gap-x-4"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          height: "calc(100vh - 72px)",
        }}
      >
        <MyChats />
        <Outlet />
      </div>
    </div>
  );
}
