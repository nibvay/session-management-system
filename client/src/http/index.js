import axios from "axios";

import { generateFakeSessions } from "../utility";

const fakeAttendees = [
  {
    id: 22222,
    name: "Andy",
    uniqueNum: "A001",
  },
  {
    id: 33333,
    name: "Bob",
    uniqueNum: "A002",
  },
  {
    id: 55555,
    name: "Cindy",
    uniqueNum: "A003",
  },
  {
    id: 9482,
    name: "Jack",
    uniqueNum: "A004",
  },
  {
    id: 1830,
    name: "Jack",
    uniqueNum: "A005",
  },
  {
    id: 3822,
    name: "Jack",
    uniqueNum: "A006",
  },
  {
    id: 9092,
    name: "Jack",
    uniqueNum: "A007",
  },
  {
    id: 9392,
    name: "Jack",
    uniqueNum: "A008",
  },
  {
    id: 9452,
    name: "Jack",
    uniqueNum: "A009",
  },
  {
    id: 9432,
    name: "Jack",
    uniqueNum: "A010",
  },
];

const fakeAllSessions = [
  {
    id: 2734,
    title: "MySQL",
    date: 1716134400000,
    timeSlot: "afternoon",
    classroom: "C",
  },
  {
    id: 2742,
    title: "Postgres",
    date: 1716134499990,
    timeSlot: "afternoon",
    classroom: "D",
  },
  {
    id: 342,
    title: "MySQL",
    date: 1716220800000,
    timeSlot: "morning",
    classroom: "A",
  },
  {
    id: 390,
    title: "Postgres",
    date: 1716220800000,
    timeSlot: "afternoon",
    classroom: "D",
  },
  {
    id: 3613,
    title: "Postgres",
    date: 1716307200000,
    timeSlot: "morning",
    classroom: "A",
  },
  {
    id: 3693,
    title: "Postgres",
    date: 1716307200000,
    timeSlot: "morning",
    classroom: "B",
  },
  {
    id: 367,
    title: "MySQL",
    date: 1716393600000,
    timeSlot: "morning",
    classroom: "B",
  },
  {
    id: 5729,
    title: "Mongodb",
    date: 1716480000000,
    timeSlot: "morning",
    classroom: "A",
  },
];

const fakeSessionsByAttendee = [
  {
    sessionId: 2742,
    title: "Postgres",
    date: 1716134400000,
    timeSlot: "afternoon",
    classroom: "D",
  },
  {
    sessionId: 342,
    title: "MySQL",
    date: 1716220800000,
    timeSlot: "morning",
    classroom: "A",
  },
  {
    sessionId: 3613,
    title: "Postgres",
    date: 1716307200000,
    timeSlot: "morning",
    classroom: "A",
  },
  {
    sessionId: 367,
    title: "MySQL",
    date: 1716393600000,
    timeSlot: "morning",
    classroom: "B",
  },
  {
    sessionId: 5729,
    title: "Mongodb",
    date: 1716480000000,
    timeSlot: "morning",
    classroom: "A",
  },
];

const API_URL = "http://localhost:4000";

const apiAxios = axios.create({
  baseURL: `${API_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function http() {
  this.axios = apiAxios;
}

http.prototype = {
  getSessions: function () {
    // const sessions = generateFakeSessions(5);
    return new Promise((r) => {
      setTimeout(() => {
        r(fakeAllSessions);
      }, 1000);
    });
    // return this.axios.get("sessions");
  },
  createSession: function (data) {
    return this.axios.post("sessions", data);
  },
  getSpeakers: function () {
    const fakeSpeaker = [
      {
        id: 123123,
        name: "John",
        uniqueNum: "S001",
      },
      {
        id: 128293,
        name: "Mary",
        uniqueNum: "S002",
      },
      {
        id: 120193,
        name: "Joe",
        uniqueNum: "S003",
      },
    ];
    return new Promise((r) => {
      setTimeout(() => {
        r(fakeSpeaker);
      }, 1000);
    });
    // return this.axios.post("speakers");
  },
  getAttendees: function () {
    return new Promise((r) => {
      setTimeout(() => {
        r(fakeAttendees);
      }, 1000);
    });
    // return this.axios.get("attendees");
  },
  addAttendee: function (data) {
    const newAttendee = {
      name: data.name,
      id: 3993,
      uniqueNum: "A011",
    };
    fakeAttendees.push(newAttendee);
    return new Promise((r) => {
      setTimeout(() => {
        r(newAttendee);
      }, 1000);
    });
    // return this.axios.post("attendees");
  },
  getSessionsByAttendee: function (id) {
    return new Promise((r) => {
      setTimeout(() => {
        r([...fakeSessionsByAttendee]);
      }, 1000);
    });
    // return this.axios.get(`attendee/${id}/sessions`);
    // /attendee/{attendeeId}/sessions
  },
  joinSession: function (data) {
    const toAdd = {
      sessionId: 390,
      title: "Postgres",
      date: 1716220800000,
      timeSlot: "afternoon",
      classroom: "D",
    };

    fakeSessionsByAttendee.push(toAdd);

    return new Promise((r) => {
      setTimeout(() => {
        r();
      }, 500);
    });
  },
};
const httpInstance = new http();

export default httpInstance;
