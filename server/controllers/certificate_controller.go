package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/portfolio-blog/server/models"
)

// GetAllCertificates returns all certificates
func GetAllCertificates(c *gin.Context) {
	// In a real application, this would fetch from a database
	cert1Date, _ := time.Parse("2006-01-02", "2022-01-15")
	cert2Date, _ := time.Parse("2006-01-02", "2022-06-20")

	certificates := []models.Certificate{
		{
			ID:          "1",
			Name:        "AWS Certified Developer",
			Issuer:      "Amazon Web Services",
			IssueDate:   cert1Date,
			Description: "Certification for AWS cloud development",
			ImageURL:    "/certificates/aws-developer.jpg",
		},
		{
			ID:          "2",
			Name:        "Certified Kubernetes Administrator",
			Issuer:      "Cloud Native Computing Foundation",
			IssueDate:   cert2Date,
			Description: "Certification for Kubernetes administration",
			ImageURL:    "/certificates/cka.jpg",
		},
	}

	c.JSON(http.StatusOK, certificates)
}
