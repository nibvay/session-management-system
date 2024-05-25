package db

import (
	"session-management-system/models"

	"github.com/google/uuid"
)

// In-memory databases
var Sessions = []models.Session{}
var Attendees = []models.Attendee{}
var Speakers = []models.Speaker{}
var AttendeeSessions = []models.AttendeeSession{}

func CreateSpeakers(names []string) []models.Speaker {
	var uuids []uuid.UUID
	for i := 0; i < len(names); i++ {
		uuids = append(uuids, uuid.New())
	}

	for i, name := range names {
		Speakers = append(Speakers, models.Speaker{
			Id:        uuids[i],
			Name:      name,
			UniqueNum: uuids[i],
		})
	}

	return Speakers
}
