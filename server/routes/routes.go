package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/portfolio-blog/server/controllers"
)

// SetupRoutes configures all the API routes
func SetupRoutes(router *gin.Engine) {
	// API routes
	api := router.Group("/api")
	{
		// Health check endpoint
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "ok",
			})
		})

		// Profile endpoints
		profile := api.Group("/profile")
		{
			profile.GET("", controllers.GetProfile)
		}

		// Blog endpoints
		blog := api.Group("/blog")
		{
			blog.GET("", controllers.GetAllPosts)
			blog.GET("/:id", controllers.GetPostByID)
		}

		// CV endpoints
		cv := api.Group("/cv")
		{
			cv.GET("", controllers.GetCV)
			cv.GET("/download", controllers.DownloadCV)
		}

		// Certificates endpoints
		certificates := api.Group("/certificates")
		{
			certificates.GET("", controllers.GetAllCertificates)
		}

		// Badges endpoints
		badges := api.Group("/badges")
		{
			badges.GET("", controllers.GetAllBadges)
		}
	}
}
