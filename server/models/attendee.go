package models

import "github.com/google/uuid"

type Attendee struct {
	Id        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	UniqueNum uuid.UUID `json:"uniqueNum"`
}
