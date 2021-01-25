package cache

import (
	"sync"
)

type cache struct {
	sMap sync.Map
}

func New() *cache {
	return &cache{}
}

func (p *cache) Set(key string, value interface{}) {
	p.sMap.Store(key, value)
}

func (p *cache) Get(key string) (interface{}, bool) {
	return p.sMap.Load(key)
}

func (p *cache) Remove(key string) {
	p.sMap.Delete(key)
}

func (p *cache) RemoveAll() {
	p.sMap = sync.Map{}
}
