module aminer.cn/configure

go 1.14

require (
	aminer.cn/cache v0.0.0-00010101000000-000000000000
	github.com/fsnotify/fsnotify v1.4.9
	github.com/spf13/viper v1.7.1
)

replace aminer.cn/cache => ../cache
