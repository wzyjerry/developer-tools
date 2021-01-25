package cache

// Cache 全局线程安全的键值对缓存接口
type Cache interface {
	Set(key string, value interface{})
	Get(key string) (interface{}, bool)
	Remove(key string)
	RemoveAll()
}
