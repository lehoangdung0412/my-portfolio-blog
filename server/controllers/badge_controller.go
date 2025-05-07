package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/portfolio-blog/server/models"
)

// GetAllBadges returns all badges
func GetAllBadges(c *gin.Context) {
	// In a real application, this would fetch from a database
	badge1Date, _ := time.Parse("2006-01-02", "2022-10-31")
	badge2Date, _ := time.Parse("2006-01-02", "2023-02-15")

	badges := []models.Badge{
		{
			ID:          "1",
			Name:        "Hacktoberfest 2022",
			Issuer:      "DigitalOcean",
			IssueDate:   badge1Date,
			Description: "Participated in Hacktoberfest 2022",
			ImageURL:    "/badges/hacktoberfest-2022.jpg",
		},
		{
			ID:          "2",
			Name:        "Google Cloud Certified",
			Issuer:      "Google",
			IssueDate:   badge2Date,
			Description: "Certified in Google Cloud Platform",
			ImageURL:    "/badges/gcp-certified.jpg",
		},
	}

	c.JSON(http.StatusOK, badges)
}
