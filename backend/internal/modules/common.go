package modules

import (
	"github.com/gin-gonic/gin"
	"time"
)

type ErrorViewModel struct {
	Error string `json:"error" example:"Error message"`
}

func HandleError(c *gin.Context, status int, error string) {
	viewModel := ErrorViewModel{
		Error: error,
	}
	c.AbortWithStatusJSON(status, viewModel)
}

type UUIDBindingModel struct {
	Size *uint `uri:"size" binding:"required" example:"10"`
}

type CryptBindingModel struct {
	Str *string `json:"str" binding:"required" example:"password"`
}

type ViewObjectIdBindingModel struct {
	ObjectId *string `json:"objectId" binding:"required" example:"5ffd59f403762e429ea59a72"`
}

type ViewObjectIdViewModel struct {
	Time    time.Time `json:"time"`
	Machine []byte    `json:"machine"`
	PID     uint16    `json:"pid"`
	Counter int32     `json:"counter"`
}
