# Session Management System

## API doc

#### GET /sessions

- view all sessions
- response
  ```json
  [
    {
      "id": 1234,
      "title": "MySQL", // MySQL, Postgres, Mongodb
      "date": "xxx",
      "time_slot": "morning" // morning, afternoon
    }
    // ...
  ]
  ```

#### POST /sessions

- create a session
- request

```json
{
  "title": "MySQL", // MySQL, Postgres, Mongodb
  "date": "xxx",
  "time_slot": "morning", // morning, afternoon
  "speakerId": "A001"
}
```

#### GET /speakers

- get all speakers
- response

```json
[
  {
    "id": 123123,
    "name": "John",
    "uniqueNum": "A001"
  }
  // ...
]
```

#### POST /speaker

- create a speaker
- request

```json
{
  "name": "John",
  "uniqueNum": "A001"
}
```

#### GET /attendees

- get all attendees
- response

```json
[
  {
    "id": 223223,
    "name": "Hank",
    "uniqueNum": "D001"
  }
  // ...
]
```

#### POST /attendee

- create a attendee
- request

```json
{
  "name": "Hank",
  "uniqueNum": "D001"
}
```

#### GET /attendee/{attendeeId}/sessions

- get specific attendee's all sessions
- response

```json
[
  {
    "sessionId": "xxx",
    "title": "MySQL", // MySQL, Postgres, Mongodb
    "date": "xxx",
    "time_slot": "morning", // morning, afternoon
    "speakerId": "A001"
  }
  // ...
]
```

#### POST /attendee/{attendee}/session

- make specific attendee's join a session
- request

```json
{
  "sessionId": "1234"
}
```
