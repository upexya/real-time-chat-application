import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [search_text, setSearch] = useState("");

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center gap-x-2 bg-gray-200 py-2 px-4 rounded-2xl">
      <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
      <input
        className="outline-none bg-transparent"
        placeholder="Search User"
        value={search_text}
        onChange={handleSearch}
      />
    </div>
  );
}
