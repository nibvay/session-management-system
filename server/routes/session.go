package routes

import (
	"session-management-system/db"
	"session-management-system/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func RegisterSessionRoutes(app *fiber.App) {
	app.Get("/api/sessions", GetAllSessions)
	app.Post("/api/session", CreateSession)
}

func GetAllSessions(c *fiber.Ctx) error {
	return c.JSON(db.Sessions)
}

func CreateSession(c *fiber.Ctx) error {
	type Request struct {
		Title     string `json:"title"`
		TimeSlot  string `json:"timeSlot"`
		SpeakerId string `json:"speakerId"`
		Classroom string `json:"classroom"`
		Date      int64  `json:"date"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}

	parsedSpeakerId, err := uuid.Parse(req.SpeakerId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid speaker ID"})
	}

	speakerExists := false
	for _, speaker := range db.Speakers {
		if speaker.Id == parsedSpeakerId {
			speakerExists = true
			break
		}
	}
	if !speakerExists {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"msg": "speaker does not exist", "error": true})
	}

	session := models.Session{
		Id:        uuid.New(),
		Title:     req.Title,
		TimeSlot:  req.TimeSlot,
		SpeakerId: parsedSpeakerId,
		Date:      req.Date,
		Classroom: req.Classroom,
	}

	db.Sessions = append(db.Sessions, session)
	return c.JSON(session)
}
