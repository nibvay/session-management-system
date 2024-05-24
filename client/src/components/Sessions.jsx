import { useEffect, useState } from "react";
import { getThisWeek, isSameDay } from "../utility";
import http from "../http";
import { useDialog } from "../provider/DialogProvider";
import Dropdown from "./Dropdown";

const timeFormatter = new Intl.DateTimeFormat("en-US", { month: "numeric", day: "2-digit" });

function CreateSessionDialog({ setDialogData, speakerList }) {
  const [speaker, setSpeaker] = useState(null);
  const [session, setSession] = useState(null);

  return (
    <div>
      <Dropdown
        title="Session"
        options={["MySQL", "Postgres", "Mongodb"].map((value) => ({
          key: value,
          display: value,
          value,
        }))}
        value={session}
        onChange={(value) => {
          setSession(value);
          setDialogData({ speaker, session: value });
        }}
      />
      <Dropdown
        title="Speaker"
        options={speakerList.map(({ uniqueNum, name }) => ({
          key: uniqueNum,
          display: `${uniqueNum} ${name}`,
          value: uniqueNum,
        }))}
        value={speaker}
        onChange={(value) => {
          setSpeaker(value);
          setDialogData({ speaker: value, session });
        }}
      />
    </div>
  );
}

function Sessions() {
  const [sessionList, setSessionList] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dateList = getThisWeek();
  const tableDateList = dateList.map((d) => [d, d]).flat();

  const { openDialog, setDialogData } = useDialog();

  const handleCreateClick = ({ date, timeSlot, classroom }) => {
    openDialog(
      `Create Session on ${timeFormatter.format(date)} (${timeSlot}) in room: ${classroom}`,
      <CreateSessionDialog speakerList={speakerList} setDialogData={setDialogData} />,
      (dialogData) => {
        console.log({ dialogData });
      }
    );
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const sessions = await http.getSessions();
      const speakers = await http.getSpeakers();
      setSessionList(sessions);
      setSpeakerList(speakers);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="text-lg">Sessions</div>
      <div className="p-6">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 bg-gray-100"></th>
              {[...new Array(5)].map((_, index) => (
                <th key={index} className="border border-gray-200 px-4 py-2 bg-gray-100" colSpan="2">
                  <div>{`Day ${index + 1} (${timeFormatter.format(dateList[index])})`}</div>
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
                    sessionList={sessionList}
                    timeSlot="morning"
                    date={date}
                    classroom={index % 2 === 0 ? "A" : "B"}
                    handleCreateClick={handleCreateClick}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 bg-gray-50">Afternoon</td>
              {tableDateList.map((date, index) => (
                <td key={index} className="border border-gray-200 px-4 py-2">
                  <SessionItem
                    sessionList={sessionList}
                    timeSlot="afternoon"
                    date={date}
                    classroom={index % 2 === 0 ? "C" : "D"}
                    handleCreateClick={handleCreateClick}
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

function CreateButton({ onClick }) {
  return (
    <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-1 px-3 rounded text-xs" onClick={onClick}>
      Create
    </button>
  );
}

function EditButton({ onClick }) {
  return (
    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded text-xs" onClick={onClick}>
      Edit
    </button>
  );
}

function SessionItem({ sessionList, timeSlot, date, classroom, handleCreateClick }) {
  const target = sessionList.find(
    ({ timeSlot: t, date: d, classroom: c }) => timeSlot === t && isSameDay(date, d) && classroom === c
  );
  if (!target) return <CreateButton onClick={() => handleCreateClick({ date, timeSlot, classroom })} />;

  return (
    <div className="flex gap-1">
      <span>{target.title}</span>
      <EditButton />
    </div>
  );
}

export default Sessions;
