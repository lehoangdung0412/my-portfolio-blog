package models

// CV represents a curriculum vitae
type CV struct {
	// Personal Information
	Name        string `json:"name"`
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"imageUrl"`

	// Contact Information
	Contact Contact `json:"contact"`

	// Professional Information
	Education  []Education  `json:"education"`
	Experience []Experience `json:"experience"`
	Skills     []string     `json:"skills"`
	SoftSkills []string     `json:"softSkills"`
	Languages  []Language   `json:"languages"`
	Awards     []Award      `json:"awards"`

	// Additional Information
	Certificates []Certificate `json:"certificates"`
	Badges       []Badge       `json:"badges"`

	// Professional Summary
	Summary []string `json:"summary"`
}

// Education represents an educational background
type Education struct {
	Institution string `json:"institution"`
	Degree      string `json:"degree"`
	Year        string `json:"year"`
}

// Experience represents a work experience
type Experience struct {
	Company     string `json:"company"`
	Position    string `json:"position"`
	Year        string `json:"year"`
	Description string `json:"description"`
}

// Language represents a language skill
type Language struct {
	Name        string `json:"name"`
	Proficiency string `json:"proficiency"`
}

// Award represents an award or recognition
type Award struct {
	Name        string `json:"name"`
	Issuer      string `json:"issuer"`
	Year        string `json:"year"`
	Description string `json:"description,omitempty"`
}
