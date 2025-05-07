package models

import "time"

// Badge represents an earned badge or achievement
type Badge struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Issuer      string    `json:"issuer"`
	IssueDate   time.Time `json:"issueDate"`
	Description string    `json:"description"`
	ImageURL    string    `json:"imageUrl"`
}
