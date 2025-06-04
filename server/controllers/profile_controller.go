package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/portfolio-blog/server/models"
)

// GetProfile returns the user's profile information
func GetProfile(c *gin.Context) {
	profile := models.Profile{
		Name:        "Vincent",
		Title:       "Full Stack Developer",
		Description: "Passionate developer with expertise in Golang, Next.js, and more.",
		Skills:      []string{"Golang", "Next.js", "React", "TypeScript", "Node.js", "Docker"},
		Contact: models.Contact{
			Email:    "lehoangdung.hcmus@gmail.com",
			LinkedIn: "https://www.facebook.com/le.hoangdung.37",
			GitHub:   "https://github.com/lehoangdung0412",
		},
	}

	c.JSON(http.StatusOK, profile)
}
