package models

import "github.com/google/uuid"

type Session struct {
	Id        uuid.UUID `json:"id"`
	Title     string    `json:"title"`
	TimeSlot  string    `json:"timeSlot"`
	SpeakerId uuid.UUID `json:"speakerId"`
	Date      int64     `json:"date"`
	Classroom string    `json:"classroom"`
}
