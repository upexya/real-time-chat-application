import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chats from "src/views/Chats";
import Auth from "src/views/Auth";
import PageNotFound from "src/views/PageNotFound";

import AppLayout from "src/components/Layout";
import { setUser } from "src/redux/userSlice";

import routes from "src/constants/routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.CHATS} element={<AppLayout />}>
          <Route path={routes.CHAT_ID} element={<Chats />} />
        </Route>
        <Route path={routes.AUTH} element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
