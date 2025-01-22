import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "src/views/Home";
import Chats from "src/views/Chats";
import Auth from "src/views/Auth";
import PageNotFound from "src/views/PageNotFound";

import AppLayout from "src/components/Layout";

import routes from "src/constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME} element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.CHATS} element={<Chats />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path={routes.AUTH} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
