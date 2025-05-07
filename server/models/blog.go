package models

import "time"

// BlogPost represents a blog post
type BlogPost struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Summary     string    `json:"summary"`
	Content     string    `json:"content"`
	PublishDate time.Time `json:"publishDate"`
	Tags        []string  `json:"tags"`
}
