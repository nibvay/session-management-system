import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

function Root() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  const [page, setPage] = useState(currentPath);

  return (
    <div className="flex">
      <div id="sidebar" className="w-40 h-screen bg-gray-100 p-4 shadow-lg">
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                onClick={() => setPage("sessions")}
                to={`sessions`}
                className={`text-gray-700 font-bold p-2 rounded transition-colors duration-300 ${
                  page === "sessions" ? "text-blue-500 bg-gray-200" : "hover:text-blue-500 hover:bg-gray-200"
                }`}
              >
                Sessions
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setPage("attendees")}
                to={`attendees`}
                className={`text-gray-700 font-bold p-2 rounded transition-colors duration-300 ${
                  page === "attendees" ? "text-blue-500 bg-gray-200" : "hover:text-blue-500 hover:bg-gray-200"
                }`}
              >
                Attendees
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="main-view" className="flex-1 p-6 h-screen overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
