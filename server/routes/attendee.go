package routes

import (
	"fmt"
	"session-management-system/db"
	"session-management-system/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func RegisterAttendeeRoutes(app *fiber.App) {
	app.Get("/api/attendees", GetAllAttendees)
	app.Post("/api/attendee", CreateAttendee)
	app.Get("/api/attendee/:attendeeId/sessions", GetAttendeeSessions)
	app.Post("/api/attendee/:attendeeId/session", AttendeeJoinSession)
}

func GetAllAttendees(c *fiber.Ctx) error {
	return c.JSON(db.Attendees)
}

func CreateAttendee(c *fiber.Ctx) error {
	type Request struct {
		Name string `json:"name"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return err
	}

	uuidValue := uuid.New()

	attendee := models.Attendee{
		Id:        uuidValue,
		Name:      req.Name,
		UniqueNum: uuidValue,
	}
	db.Attendees = append(db.Attendees, attendee)
	return c.JSON(attendee)
}

func GetAttendeeSessions(c *fiber.Ctx) error {
	attendeeIdStr := c.Params("attendeeId")
	attendeeId, err := uuid.Parse(attendeeIdStr)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid attendeeId"})
	}

	var attendeeSessionsList = []models.Session{}

	for _, attendeeSession := range db.AttendeeSessions {
		if attendeeSession.AttendeeId == attendeeId {
			for _, session := range db.Sessions {
				if session.Id == attendeeSession.SessionId {
					attendeeSessionsList = append(attendeeSessionsList, session)
				}
			}
		}
	}

	return c.JSON(attendeeSessionsList)
}

func AttendeeJoinSession(c *fiber.Ctx) error {
	attendeeIdStr := c.Params("attendeeId")
	attendeeId, err := uuid.Parse(attendeeIdStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid attendee Id"})
	}

	type Request struct {
		SessionId string `json:"sessionId"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}

	sessionId, err := uuid.Parse(req.SessionId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid session Id"})
	}

	// // Check if the session exists
	// sessionExists := false
	// for _, session := range sessions {
	// 	if session.Id == sessionId {
	// 		sessionExists = true
	// 		break
	// 	}
	// }

	// if !sessionExists {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "this session Id does not exist"})
	// }

	// // Check if the attendee is already in this session
	// for _, attendeeSession := range attendeeSessions {
	// 	if attendeeSession.AttendeeID == attendeeID && attendeeSession.SessionID == sessionID {
	// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "attendee already in this session"})
	// 	}
	// }

	db.AttendeeSessions = append(db.AttendeeSessions, models.AttendeeSession{
		AttendeeId: attendeeId,
		SessionId:  sessionId,
	})
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": fmt.Sprintf("attendee: %s joined to the session: %s", attendeeId, sessionId),
	})

}
