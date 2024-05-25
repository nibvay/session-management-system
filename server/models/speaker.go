package models

import "github.com/google/uuid"

type Speaker struct {
	Id        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	UniqueNum uuid.UUID `json:"uniqueNum"`
}
