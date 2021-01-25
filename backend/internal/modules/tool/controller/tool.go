package controller

import (
	"aminer.cn/developerTools/internal/modules"
	ToolService "aminer.cn/developerTools/internal/modules/tool/service"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// UUID godoc
// @Summary 获取UUID
// @Description 获取10个UUID，返回UUID列表
// @Tags Tool
// @Accept  json
// @Produce  json
// @Success 200 {array} string "UUID列表"
// @Router /api/v1/tool/uuid [GET]
func UUID(c *gin.Context) {
	service := ToolService.New()
	c.AbortWithStatusJSON(http.StatusOK, service.UUID(10))
	return
}

// Crypt godoc
// @Summary 获取Crypt Hash
// @Description 使用bcrypt加密串，返回hash值
// @Tags Tool
// @Accept  json
// @Produce  json
// @Param model body modules.CryptBindingModel true "要Hash的串"
// @Success 200 string string "Hash值"
//@Failure 400 {object} modules.ErrorViewModel "需要提供要Hash的串"
// @Router /api/v1/tool/crypt [POST]
func Crypt(c *gin.Context) {
	var model modules.CryptBindingModel
	err := c.ShouldBindJSON(&model)
	if err != nil {
		modules.HandleError(c, http.StatusBadRequest, err.Error())
		return
	}
	service := ToolService.New()
	c.AbortWithStatusJSON(http.StatusOK, service.Crypt(*model.Str))
	return
}

// ViewObjectId godoc
// @Summary 查看ObjectId信息
// @Description 查看ObjectId信息，包括时间戳、MAC、PID和Counter
// @Tags Tool
// @Accept  json
// @Produce  json
// @Param model body modules.ViewObjectIdBindingModel true "要查看的ObjectId"
// @Success 200 {object} modules.ViewObjectIdViewModel "ObjectId信息"
//@Failure 400 {object} modules.ErrorViewModel "需要提供有效的ObjectId"
// @Router /api/v1/tool/viewObjectId [POST]
func ViewObjectId(c *gin.Context) {
	var model modules.ViewObjectIdBindingModel
	err := c.ShouldBindJSON(&model)
	if err != nil {
		modules.HandleError(c, http.StatusBadRequest, err.Error())
		return
	}
	if !bson.IsObjectIdHex(*model.ObjectId) {
		modules.HandleError(c, http.StatusBadRequest, "Invalid ObjectId")
		return
	}
	service := ToolService.New()
	c.AbortWithStatusJSON(http.StatusOK, service.ViewObjectId(*model.ObjectId))
	return
}
