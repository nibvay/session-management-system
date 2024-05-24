import { useEffect, useState } from "react";
import http from "../http";
import { useDialog } from "../provider/DialogProvider";
import AttendeeSessionTable from "./AttendeeSessionTable";

function AddAttendeeDialog({ setDialogData }) {
  const [name, setName] = useState("");
  return (
    <div className="block">
      <label className="pr-1 text-sm font-medium text-gray-700">Name</label>
      <input
        className="mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setDialogData({ name: e.target.value });
        }}
      />
    </div>
  );
}

function Attendees() {
  const [isLoading, setIsLoading] = useState(false);
  const [attendeeList, setAttendeeList] = useState([]);
  const [allSessions, setAllSessions] = useState(null);
  const [selectedUserSessions, setSelectedUserSessions] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { openDialog, setDialogData } = useDialog();

  const addAttendee = () => {
    openDialog("Add Attendee", <AddAttendeeDialog setDialogData={setDialogData} />, async (dialogData) => {
      console.log({ dialogData });
      await http.addAttendee(dialogData);
      const attendees = await http.getAttendees();
      setAttendeeList(attendees);
    });
  };

  const viewSessionByAttendee = async (attendeeId) => {
    const userSessions = await http.getSessionsByAttendee(attendeeId);

    if (!allSessions) {
      const all = await http.getSessions();
      console.log(all);
      setAllSessions(all);
    }

    setSelectedUserSessions(userSessions);
    setSelectedUserId(attendeeId);
  };

  const joinSession = async (sessionId) => {
    await http.joinSession({ sessionId, attendeeId: selectedUserId });
    const userSessions = await http.getSessionsByAttendee(selectedUserId);
    console.log("join", { sessionId, userSessions });
    setSelectedUserSessions(userSessions);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const attendees = await http.getAttendees();
      setAttendeeList(attendees);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  console.log({ allSessions, selectedUserSessions, selectedUserId });
  return (
    <div>
      <div className="text-lg">Attendees</div>
      <div className="flex flex-row-reverse px-2">
        <button
          onClick={addAttendee}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-1 px-3 rounded text-xs"
        >
          <div className="flex items-center	justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Add Attendee
          </div>
        </button>
      </div>
      <div className="p-2">
        <div className="overflow-x-auto mb-6 h-80">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unique Number
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendeeList.map(({ id, uniqueNum, name }) => (
                <tr key={uniqueNum}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{uniqueNum}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div
                      className="cursor-pointer inline-block"
                      onClick={async () => {
                        await viewSessionByAttendee(id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUserId && (
        <AttendeeSessionTable
          allSessions={allSessions}
          selectedUserSessions={selectedUserSessions}
          user={attendeeList.find(({ id }) => id === selectedUserId)}
          joinSession={joinSession}
        />
      )}
    </div>
  );
}

export default Attendees;
