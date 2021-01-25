package service

import (
	"aminer.cn/crypt"
	"aminer.cn/developerTools/internal/modules"
	"github.com/google/uuid"
	"gopkg.in/mgo.v2/bson"
)

type toolImpl struct{}

func (t toolImpl) ViewObjectId(objectId string) modules.ViewObjectIdViewModel {
	var result modules.ViewObjectIdViewModel
	id := bson.ObjectIdHex(objectId)
	result.Time = id.Time()
	result.Machine = id.Machine()
	result.PID = id.Pid()
	result.Counter = id.Counter()
	return result
}

func (t toolImpl) Crypt(str string) string {
	return crypt.GetHash(str)
}

func (t toolImpl) UUID(size uint) []string {
	result := []string{}
	for i := uint(0); i < size; i++ {
		result = append(result, uuid.New().String())
	}
	return result
}

func New() ToolsService {
	return toolImpl{}
}
