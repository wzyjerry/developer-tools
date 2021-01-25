module aminer.cn/developerTools

go 1.14

replace (
	aminer.cn/cache => ./pkg/cache
	aminer.cn/configure => ./pkg/configure
	aminer.cn/crypt => ./pkg/crypt
	aminer.cn/zapinit => ./pkg/zapinit
)

require (
	aminer.cn/configure v0.0.0-00010101000000-000000000000
	aminer.cn/crypt v0.0.0-00010101000000-000000000000
	aminer.cn/zapinit v0.0.0-00010101000000-000000000000
	github.com/alecthomas/template v0.0.0-20190718012654-fb15b899a751
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-gonic/gin v1.6.3
	github.com/google/uuid v1.1.4
	github.com/swaggo/files v0.0.0-20190704085106-630677cd5c14
	github.com/swaggo/gin-swagger v1.3.0
	github.com/swaggo/swag v1.5.1
	go.uber.org/zap v1.16.0
	gopkg.in/mgo.v2 v2.0.0-20190816093944-a6b53ec6cb22
)
