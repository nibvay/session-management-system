package models

import "github.com/google/uuid"

type AttendeeSession struct {
	Id         uuid.UUID `json:"id"`
	AttendeeId uuid.UUID `json:"attendeeId"`
	SessionId  uuid.UUID `json:"sessionId"`
}
