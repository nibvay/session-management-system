import { getThisWeek, isSameDay } from "../utility";

const timeFormatter = new Intl.DateTimeFormat("en-US", { month: "numeric", day: "2-digit" });
const dateList = getThisWeek();

function AttendeeSessionTable({ allSessions, selectedUserSessions, user, joinSession }) {
  const tableDateList = dateList.map((d) => [d, d]).flat();
  console.log({ selectedUserSessions });
  return (
    <>
      <div>{`${user.name}'s Sessions`}</div>
      <div className="p-6">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 bg-gray-100"></th>
              {[...new Array(5)].map((_, index) => (
                <th key={index} className="border border-gray-200 px-4 py-2 bg-gray-100" colSpan="2">
                  {/* <div>{`Day ${index + 1} (${timeFormatter.format(dateList[index])})`}</div> */}
                  <div>{`Day ${index + 1} ${dateList[index]}`}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2 bg-gray-50">Morning</td>
              {tableDateList.map((date, index) => (
                <td key={index} className="border border-gray-200 px-4 py-2">
                  <SessionItem
                    sessionList={allSessions}
                    selectedUserSessions={selectedUserSessions}
                    timeSlot="morning"
                    date={date}
                    classroom={index % 2 === 0 ? "A" : "B"}
                    joinSession={joinSession}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 bg-gray-50">Afternoon</td>
              {tableDateList.map((date, index) => (
                <td key={index} className="border border-gray-200 px-4 py-2">
                  <SessionItem
                    sessionList={allSessions}
                    selectedUserSessions={selectedUserSessions}
                    timeSlot="afternoon"
                    date={date}
                    classroom={index % 2 === 0 ? "C" : "D"}
                    joinSession={joinSession}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function SessionItem({ sessionList, selectedUserSessions, timeSlot, date, classroom, joinSession }) {
  const target = sessionList.find(
    ({ timeSlot: t, date: d, classroom: c }) => timeSlot === t && classroom === c && isSameDay(date, d)
  );
  if (!target) return "N/A";

  const attendeeIsBusy =
    selectedUserSessions.filter(({ timeSlot: t, date: d }) => timeSlot === t && isSameDay(date, d)).length === 1; // attendee's already has class in this slot

  return (
    <div className="flex gap-1">
      <span>{target.title}</span>
      <span>
        {selectedUserSessions.find(({ sessionId }) => target.id === sessionId) ? (
          <Joined />
        ) : (
          <JoinButton disabled={attendeeIsBusy} joinSession={joinSession} sessionId={target.id} />
        )}
      </span>
    </div>
  );
}
function Joined() {
  return (
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      Joined
    </span>
  );
}

function JoinButton({ disabled, joinSession, sessionId }) {
  return (
    <button
      className={`bg-sky-500 text-white font-bold py-1 px-3 rounded text-xs ${
        disabled ? "opacity-50" : "hover:bg-sky-700 cursor-pointer"
      }`}
      disabled={disabled}
      onClick={() => {
        console.log("click");
        joinSession(sessionId);
      }}
    >
      Join
    </button>
  );
}

export default AttendeeSessionTable;
