package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/portfolio-blog/server/models"
)

// getCV returns the CV data
func getCV() models.CV {
	return models.CV{
		// Personal Information
		Name:        "Vincent",
		Title:       "Full Stack Developer",
		Description: "Passionate developer with expertise in Golang, Next.js, and more.",
		ImageURL:    "https://via.placeholder.com/300",

		// Contact Information
		Contact: models.Contact{
			Email:    "lehoangdung.hcmus@gmail.com",
			GitHub:   "https://github.com/lehoangdung0412",
			Facebook: "https://www.facebook.com/le.hoangdung.37",
		},

		// Professional Information
		Education: []models.Education{
			{
				Institution: "University Name",
				Degree:      "Bachelor of Science in Computer Science",
				Year:        "2015-2019",
			},
			{
				Institution: "Another University",
				Degree:      "Master of Science in Software Engineering",
				Year:        "2019-2021",
			},
		},
		Experience: []models.Experience{
			{
				Company:     "Company Name",
				Position:    "Software Engineer",
				Year:        "2019-2022",
				Description: "Developed and maintained web applications using Golang and React.",
			},
			{
				Company:     "Another Company",
				Position:    "Senior Developer",
				Year:        "2022-Present",
				Description: "Leading a team of developers building microservices with Golang.",
			},
		},
		Skills: []string{
			"Golang", "Next.js", "React", "TypeScript", "Node.js", "Docker", "Kubernetes",
		},
		SoftSkills: []string{
			"Team Leadership", "Communication", "Problem Solving", "Agile Methodologies", "Project Management",
		},
		Languages: []models.Language{
			{
				Name:        "English",
				Proficiency: "Fluent",
			},
			{
				Name:        "Vietnamese",
				Proficiency: "Native",
			},
			{
				Name:        "French",
				Proficiency: "Intermediate",
			},
		},
		Awards: []models.Award{
			{
				Name:        "Best Developer Award",
				Issuer:      "Tech Conference 2022",
				Year:        "2022",
				Description: "Recognized for outstanding contributions to open source projects",
			},
			{
				Name:        "Innovation Prize",
				Issuer:      "Hackathon 2021",
				Year:        "2021",
				Description: "First place in annual coding competition",
			},
		},

		// Additional Information
		Certificates: []models.Certificate{
			{
				ID:          "1",
				Name:        "AWS Certified Developer",
				Issuer:      "Amazon Web Services",
				IssueDate:   parseTime("2022-01-15"),
				Description: "Certification for AWS cloud development",
				ImageURL:    "https://via.placeholder.com/300x200?text=AWS+Certificate",
			},
			{
				ID:          "2",
				Name:        "Certified Kubernetes Administrator",
				Issuer:      "Cloud Native Computing Foundation",
				IssueDate:   parseTime("2022-06-20"),
				Description: "Certification for Kubernetes administration",
				ImageURL:    "https://via.placeholder.com/300x200?text=Kubernetes+Certificate",
			},
		},
		Badges: []models.Badge{
			{
				ID:          "1",
				Name:        "Hacktoberfest 2022",
				Issuer:      "DigitalOcean",
				IssueDate:   parseTime("2022-10-31"),
				Description: "Participated in Hacktoberfest 2022",
				ImageURL:    "https://via.placeholder.com/150?text=Hacktoberfest",
			},
			{
				ID:          "2",
				Name:        "Google Cloud Certified",
				Issuer:      "Google",
				IssueDate:   parseTime("2023-02-15"),
				Description: "Certified in Google Cloud Platform",
				ImageURL:    "https://via.placeholder.com/150?text=GCP",
			},
		},

		// Professional Summary
		Summary: []string{
			"Over 5 years of experience in web development",
			"Specialized in building scalable applications",
			"Passionate about clean code and best practices",
			"Continuous learner and technology enthusiast",
		},
	}
}

// parseTime is a helper function to parse date strings
func parseTime(dateStr string) time.Time {
	t, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return time.Now() // Return current time as fallback
	}
	return t
}

// GetCV returns the user's CV information
func GetCV(c *gin.Context) {
	cv := getCV()

	// Sort education and experience to show most recent first
	sort.Slice(cv.Education, func(i, j int) bool {
		return compareYears(cv.Education[i].Year, cv.Education[j].Year) > 0
	})

	sort.Slice(cv.Experience, func(i, j int) bool {
		return compareYears(cv.Experience[i].Year, cv.Experience[j].Year) > 0
	})

	// Sort certificates by issue date (most recent first)
	sort.Slice(cv.Certificates, func(i, j int) bool {
		return cv.Certificates[i].IssueDate.After(cv.Certificates[j].IssueDate)
	})

	// Sort badges by issue date (most recent first)
	sort.Slice(cv.Badges, func(i, j int) bool {
		return cv.Badges[i].IssueDate.After(cv.Badges[j].IssueDate)
	})

	c.JSON(http.StatusOK, cv)
}

// DownloadCV serves a static PDF file from the social directory
func DownloadCV(c *gin.Context) {
	// Path to the static PDF file
	pdfPath := "social/CV-LeHoangDung.pdf"

	// Check if the file exists
	if _, err := os.Stat(pdfPath); os.IsNotExist(err) {
		log.Println("PDF file not found:", err)
		c.String(http.StatusNotFound, "CV PDF file not found")
		return
	}

	// Read the PDF file
	pdfData, err := os.ReadFile(pdfPath)
	if err != nil {
		log.Println("Error reading PDF file:", err)
		c.String(http.StatusInternalServerError, "Error reading PDF file")
		return
	}

	// Set headers for PDF file download
	fileName := "CV-LeHoangDung.pdf"
	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fileName))
	c.Header("Content-Type", "application/pdf")
	c.Header("Content-Transfer-Encoding", "binary")
	c.Header("Expires", "0")
	c.Header("Cache-Control", "must-revalidate")
	c.Header("Pragma", "public")

	// Serve the PDF file
	c.Data(http.StatusOK, "application/pdf", pdfData)
}

// compareYears compares two year strings and returns:
// 1 if a is more recent than b
// -1 if b is more recent than a
// 0 if they are equal
func compareYears(a, b string) int {
	// Extract the end year if there's a range (e.g., "2015-2019" -> "2019")
	getEndYear := func(yearStr string) string {
		parts := strings.Split(yearStr, "-")
		if len(parts) > 1 {
			return parts[1]
		}
		return parts[0]
	}

	yearA := getEndYear(a)
	yearB := getEndYear(b)

	// Handle "Present" as the most recent
	if yearA == "Present" {
		return 1
	}
	if yearB == "Present" {
		return -1
	}

	// Compare numeric years
	if yearA > yearB {
		return 1
	} else if yearA < yearB {
		return -1
	}
	return 0
}
