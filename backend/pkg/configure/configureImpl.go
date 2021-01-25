package configure

import (
	"aminer.cn/cache"
	"log"
	"time"

	"github.com/fsnotify/fsnotify"

	"github.com/spf13/viper"
)

var (
	lastChangeTime time.Time
	cacheConfig    cache.Cache
)

func init() {
	lastChangeTime = time.Now()
	cacheConfig = cache.New()
}

// NewYmlConfigure 读取Yml配置文件
func NewYmlConfigure(filename string) Configure {
	yamlConfig := viper.New()
	yamlConfig.SetConfigFile(filename)
	yamlConfig.SetConfigType("yml")
	if err := yamlConfig.ReadInConfig(); err != nil {
		log.Fatal("初始化配置文件失败, " + err.Error())
	}
	return &ymlConfig{
		yamlConfig,
	}
}

type ymlConfig struct {
	viper *viper.Viper
}

func (p *ymlConfig) ConfigFileChangeListen() {
	// 处理vipver包本身的BUG，原逻辑可能在检测到文件变更时多次触发事件，监控如果两次回调事件时间差小于1秒认为第二次调用无效
	p.viper.OnConfigChange(func(changeEvent fsnotify.Event) {
		if time.Now().Sub(lastChangeTime).Seconds() >= 1 {
			if changeEvent.Op == fsnotify.Write {
				p.clearCache()
				lastChangeTime = time.Now()
			}
		}
	})
	p.viper.WatchConfig()
}
func (p *ymlConfig) cache(key string, value interface{}) {
	cacheConfig.Set(key, value)
}

func (p *ymlConfig) getFromCache(key string) (interface{}, bool) {
	return cacheConfig.Get(key)
}

func (p *ymlConfig) clearCache() {
	cacheConfig.RemoveAll()
}

func (p *ymlConfig) Get(key string) interface{} {
	if value, exists := p.getFromCache(key); exists {
		return value
	}
	value := p.viper.Get(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetString(key string) string {
	if value, exists := p.getFromCache(key); exists {
		return value.(string)
	}
	value := p.viper.GetString(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetBool(key string) bool {
	if value, exists := p.getFromCache(key); exists {
		return value.(bool)
	}
	value := p.viper.GetBool(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetInt(key string) int {
	if value, exists := p.getFromCache(key); exists {
		return value.(int)
	}
	value := p.viper.GetInt(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetInt32(key string) int32 {
	if value, exists := p.getFromCache(key); exists {
		return value.(int32)
	}
	value := p.viper.GetInt32(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetInt64(key string) int64 {
	if value, exists := p.getFromCache(key); exists {
		return value.(int64)
	}
	value := p.viper.GetInt64(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetFloat64(key string) float64 {
	if value, exists := p.getFromCache(key); exists {
		return value.(float64)
	}
	value := p.viper.GetFloat64(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetDuration(key string) time.Duration {
	if value, exists := p.getFromCache(key); exists {
		return value.(time.Duration)
	}
	value := p.viper.GetDuration(key)
	p.cache(key, value)
	return value
}

func (p *ymlConfig) GetStringSlice(key string) []string {
	if value, exists := p.getFromCache(key); exists {
		return value.([]string)
	}
	value := p.viper.GetStringSlice(key)
	p.cache(key, value)
	return value
}
