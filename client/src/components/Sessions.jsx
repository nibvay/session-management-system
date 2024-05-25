import { useEffect, useState } from "react";
import { getThisWeek, isSameDay, timeFormatter } from "../utility";
import http from "../http";
import { useDialog } from "../provider/DialogProvider";
import Dropdown from "./Dropdown";

const SESSION_TITLE = ["MySQL", "Postgres", "Mongodb"];

function Sessions() {
  const [sessionList, setSessionList] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const dateList = getThisWeek();
  const tableDateList = dateList.map((d) => [d, d]).flat();

  const { openDialog, setDialogData } = useDialog();

  const handleCreateClick = ({ date, timeSlot, classroom }) => {
    // In the same time slot, a speaker can participate in only one session.
    const notAvailableSpeakerIds = sessionList
      .filter(({ timeSlot: t, date: d }) => timeSlot === t && date === d)
      .map(({ speakerId }) => speakerId);
    const availableSpeakerList = speakerList.filter(({ id }) => !notAvailableSpeakerIds.includes(id));

    openDialog(
      "Create Session",
      <CreateSessionDialog
        date={date}
        timeSlot={timeSlot}
        classroom={classroom}
        speakerList={availableSpeakerList}
        setDialogData={setDialogData}
      />,
      async (dialogData) => {
        console.log({ dialogData });
        await http.createSession({
          title: dialogData.session,
          timeSlot,
          date,
          speakerId: dialogData.speaker,
          classroom,
        });
        const { data: sessions } = await http.getSessions();
        setSessionList(sessions);
      }
    );
  };

  useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      const { data: sessions } = await http.getSessions();
      const { data: speakers } = await http.getSpeakers();
      setSessionList(sessions);
      setSpeakerList(speakers);
      // setIsLoading(false);
    }
    fetchData();
  }, []);

  // if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="text-2xl text-gray-800 font-bold pb-2 mb-4 tracking-wide">Sessions</div>
      <div className="p-6 max-w-95 overflow-x-scroll">
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
      {/* <EditButton /> */}
    </div>
  );
}

function CreateSessionDialog({ date, timeSlot, classroom, setDialogData, speakerList }) {
  const [speaker, setSpeaker] = useState(speakerList[0].id || undefined);
  const [session, setSession] = useState(SESSION_TITLE[0] || undefined);

  useEffect(() => {
    setDialogData({ speaker, session });
  }, []);

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700">{`Date: ${timeFormatter.format(
        date
      )} (${timeSlot})`}</label>
      <label className="mt-4 block text-sm font-medium text-gray-700">{`Classroom: ${classroom}`}</label>
      <Dropdown
        title="Session"
        options={SESSION_TITLE.map((value) => ({
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
        options={speakerList.map(({ id, uniqueNum, name }) => ({
          key: id,
          display: `${name} (${uniqueNum})`,
          value: id,
        }))}
        value={speaker}
        onChange={(speakerId) => {
          setSpeaker(speakerId);
          setDialogData({ speaker: speakerId, session });
        }}
      />
    </div>
  );
}

export default Sessions;
