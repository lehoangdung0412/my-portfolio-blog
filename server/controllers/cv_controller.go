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
		Name:        "Nguyen Thi Hue",
		Title:       "Manual Tester",
		Description: "I am looking forward to learning, leveling up my Testing skillset and working in a friendly, dynamic, and creative environment. I would love to apply my knowledge to work and contribute to the development of your company. Working in your organization would be a great opportunity for me to gain insight into the working environment as well as earning valuable experience.",
		ImageURL:    "https://via.placeholder.com/300",

		// Contact Information
		Contact: models.Contact{
			Email:    "nguyenthihue14163@gmail.com",
			LinkedIn: "https://linkedin.com/in/hue-nguyen-thi-4b3489219",
			GitHub:   "https://github.com/HueYomi",
		},

		// Professional Information
		Education: []models.Education{
			{
				Institution: "University of Science",
				Degree:      "Bachelor of Science in Chemistry",
				Year:        "2013-2017",
			},
			{
				Institution: "University of Economics HCM City- Global Economic Center",
				Degree:      "Import- Export Certificate",
				Year:        "2022",
			},
		},
		Experience: []models.Experience{
			{
				Company:     "Final Project at Fresher Training Program",
				Position:    "Manual Tester",
				Year:        "11/2022-12/2023",
				Description: "Calculate hotel fees based on room type, check-in and check-out dates, service fees and discounts if any.",
			},
			{
				Company:     "Learning Testing - Practical Practice Testing VN",
				Position:    "Manual Tester",
				Year:        "09/2023-11/2023",
				Description: "...",
			},
			{
				Company:     "Habi Baby Clothing",
				Position:    "Co-founder",
				Year:        "02/2021-Present",
				Description: "A website to introduce products, purchasing instructions and contact information for kids and baby fashion shop.",
			},
		},
		Skills: []string{
			"Postman", "SQL Server Config", "SQL Server Management", "JIRA", "Visual Studio Code", "Excel",
		},
		SoftSkills: []string{
			"Good in self-directing", "Teamwork", "Good in management", "Problems solving", "Working under pressure",
		},
		Languages: []models.Language{
			{
				Name:        "English",
				Proficiency: "Basic in communication",
			},
			{
				Name:        "Japanese",
				Proficiency: "N5",
			},
			{
				Name:        "Chinese",
				Proficiency: "Basic in communication",
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
				Name:        "Introduction to HTML5",
				Issuer:      "University of Michigan",
				IssueDate:   parseTime("2024-06-24"),
				Description: "Certification for HTML5",
				ImageURL:    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~GSA2JH8BSZDJ/CERTIFICATE_LANDING_PAGE~GSA2JH8BSZDJ.jpeg",
			},
			{
				ID:          "2",
				Name:        "Introduction to CSS3",
				Issuer:      "University of Michigan",
				IssueDate:   parseTime("2024-07-11"),
				Description: "Certification for CSS3",
				ImageURL:    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~T53W29ZF23MF/CERTIFICATE_LANDING_PAGE~T53W29ZF23MF.jpeg",
			},
			{
				ID:          "3",
				Name:        "Foundations of Software Testing and Validation",
				Issuer:      "University of Leeds",
				IssueDate:   parseTime("2024-07-17"),
				Description: "Certification for Foundations of Software Testing and Validation",
				ImageURL:    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~XQQWNRACRWJK/CERTIFICATE_LANDING_PAGE~XQQWNRACRWJK.jpeg",
			},
			{
				ID:          "4",
				Name:        "Introduction to Databases",
				Issuer:      "Meta",
				IssueDate:   parseTime("2024-07-21"),
				Description: "Certification for Databases",
				ImageURL:    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~W28FHVTQ67QR/CERTIFICATE_LANDING_PAGE~W28FHVTQ67QR.jpeg",
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
