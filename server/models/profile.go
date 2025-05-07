package models

// Profile represents the user's profile information
type Profile struct {
	Name        string   `json:"name"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Skills      []string `json:"skills"`
	Contact     Contact  `json:"contact"`
}

// Contact represents contact information
type Contact struct {
	Email    string `json:"email"`
	GitHub   string `json:"github"`
	Facebook string `json:"facebook"`
}
