import { useSearchParams } from "react-router-dom";

import Login from "src/components/Login";
import Signup from "src/components/Signup";

export default function Auth() {
  const [url_params, setUrlParams] = useSearchParams();

  const handleTabChange = (tab: "login" | "signup") => {
    setUrlParams({ tab: tab });
  };

  const active_tab = url_params.get("tab") || "login";

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {active_tab === "login" ? "Login" : "Sign up"}
        </h2>
      </div>

      <div className="mt-10 flex justify-center width-full">
        <button
          onClick={() => handleTabChange("login")}
          className={`${
            active_tab === "login" ? "bg-indigo-600" : "bg-gray-200"
          } text-white px-4 py-2 rounded-l-md`}
        >
          Login
        </button>
        <button
          onClick={() => handleTabChange("signup")}
          className={`${
            active_tab === "signup" ? "bg-indigo-600" : "bg-gray-200"
          } text-white px-4 py-2 rounded-r-md`}
        >
          Sign up
        </button>
      </div>

      {active_tab === "login" ? <Login /> : <Signup />}
    </div>
  );
}
