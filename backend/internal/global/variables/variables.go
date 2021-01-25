package variables

import (
	"aminer.cn/configure"
	"aminer.cn/zapinit"
	"flag"
	"go.uber.org/zap"
	"os"
	"testing"
)

var (
	Config configure.Configure
	ZapLog *zap.Logger
)

func init() {
	basePath := os.Getenv("BasePath")
	configFilename := "config"
	testing.Init()
	flag.StringVar(&configFilename, "config", "config", "config file name, default is config.")
	flag.Parse()
	Config = configure.NewYmlConfigure(basePath + "/configs/" + configFilename + ".yml")
	zapOption := zapinit.ZapOption{
		IsDebug:       Config.GetBool("AppDebug"),
		TimePrecision: Config.GetString("Logs.TimePrecision"),
		TextFormat:    Config.GetString("Logs.TextFormat"),
		Filename:      basePath + Config.GetString("Logs.Filename"),
		MaxSize:       Config.GetInt("Logs.MaxSize"),
		MaxBackups:    Config.GetInt("Logs.MaxBackups"),
		MaxAge:        Config.GetInt("Logs.MaxAge"),
		Compress:      Config.GetBool("Logs.Compress"),
	}
	ZapLog = zapinit.New(zapOption)
}
