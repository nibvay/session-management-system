package routes

import (
	"session-management-system/db"

	"github.com/gofiber/fiber/v2"
)

func RegisterSpeakerRoutes(app *fiber.App) {
	app.Get("/api/speakers", GetAllSpeakers)
}

func GetAllSpeakers(c *fiber.Ctx) error {
	return c.JSON(db.Speakers)
}
