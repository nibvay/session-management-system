import axios from "axios";

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
    return this.axios.get("sessions");
  },
  createSession: function (data) {
    return this.axios.post("session", data);
  },
  getSpeakers: function () {
    return this.axios.get("speakers");
  },
  getAttendees: function () {
    return this.axios.get("attendees");
  },
  addAttendee: function (data) {
    return this.axios.post("attendee", data);
  },
  getSessionsByAttendee: function (attendeeId) {
    return this.axios.get(`attendee/${attendeeId}/sessions`);
  },
  joinSession: function ({ attendeeId, sessionId }) {
    return this.axios.post(`attendee/${attendeeId}/session`, { sessionId });
  },
};
const httpInstance = new http();

export default httpInstance;
