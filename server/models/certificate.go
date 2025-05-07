package models

import "time"

// Certificate represents a professional certificate
type Certificate struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Issuer      string    `json:"issuer"`
	IssueDate   time.Time `json:"issueDate"`
	Description string    `json:"description"`
	ImageURL    string    `json:"imageUrl"`
}
