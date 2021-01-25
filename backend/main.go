package main

import (
	_ "aminer.cn/developerTools/docs"
	"aminer.cn/developerTools/internal/global/variables"
	ToolController "aminer.cn/developerTools/internal/modules/tool/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/swaggo/files"
	"github.com/swaggo/gin-swagger"
	"go.uber.org/zap"
)

func main() {
	var app *gin.Engine
	app = gin.Default()
	app.Use(cors.Default())
	v1 := app.Group("api/v1")
	{
		toolAPI := v1.Group("tool")
		{
			toolAPI.GET("uuid", ToolController.UUID)
			toolAPI.POST("crypt", ToolController.Crypt)
			toolAPI.POST("viewObjectId", ToolController.ViewObjectId)
		}
	}
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	err := app.Run(variables.Config.GetString("Server.Bind"))
	if err != nil {
		variables.ZapLog.Fatal("Startup fatal.", zap.String("error", err.Error()))
	}
}
