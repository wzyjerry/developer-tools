package service

import "aminer.cn/devTools/internal/modules"

type ToolsService interface {
	UUID(size uint) []string
	Crypt(str string) string
	ViewObjectId(objectId string) modules.ViewObjectIdViewModel
}
