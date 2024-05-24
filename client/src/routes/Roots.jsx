import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <div className="flex">
      <div id="sidebar" className="w-40 h-screen bg-gray-100 p-4 shadow-lg">
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to={`sessions`}
                className="text-gray-700 font-bold hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-300"
              >
                Sessions
              </Link>
            </li>
            <li>
              <Link
                to={`attendees`}
                className="text-gray-700 font-bold hover:text-blue-500 hover:bg-gray-200 p-2 rounded transition-colors duration-300"
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
