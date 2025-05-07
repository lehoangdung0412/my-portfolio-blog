package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/portfolio-blog/server/models"
)

// GetAllPosts returns all blog posts
func GetAllPosts(c *gin.Context) {
	// In a real application, this would fetch from a database
	post1Date, _ := time.Parse("2006-01-02", "2023-05-01")
	post2Date, _ := time.Parse("2006-01-02", "2023-05-15")

	posts := []models.BlogPost{
		{
			ID:          "1",
			Title:       "Getting Started with Golang",
			Summary:     "A beginner's guide to Golang programming",
			Content:     "This is a placeholder for the blog content...",
			PublishDate: post1Date,
			Tags:        []string{"golang", "programming", "tutorial"},
		},
		{
			ID:          "2",
			Title:       "Next.js and Chakra UI: A Perfect Combination",
			Summary:     "How to build beautiful UIs with Next.js and Chakra UI",
			Content:     "This is a placeholder for the blog content...",
			PublishDate: post2Date,
			Tags:        []string{"nextjs", "chakraui", "frontend", "tutorial"},
		},
	}

	c.JSON(http.StatusOK, posts)
}

// GetPostByID returns a specific blog post by ID
func GetPostByID(c *gin.Context) {
	id := c.Param("id")

	// In a real application, this would fetch from a database
	postDate, _ := time.Parse("2006-01-02", "2023-05-01")

	post := models.BlogPost{
		ID:          id,
		Title:       "Getting Started with Golang",
		Summary:     "A beginner's guide to Golang programming",
		Content:     "This is a placeholder for the full blog content...",
		PublishDate: postDate,
		Tags:        []string{"golang", "programming", "tutorial"},
	}

	c.JSON(http.StatusOK, post)
}
