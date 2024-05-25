package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"session-management-system/db"
	"session-management-system/routes"
)

var ClientPort int = 5173

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: fmt.Sprintf("http://localhost:%d", ClientPort),
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// init in-memory Speakers data
	names := []string{"John", "Mary", "Jim", "Gary", "Frank"}
	db.CreateSpeakers(names)

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	routes.RegisterSessionRoutes(app)
	routes.RegisterSpeakerRoutes(app)
	routes.RegisterAttendeeRoutes(app)

	log.Fatal(app.Listen(":4000"))
	fmt.Println("Server start on port 4000")
}
