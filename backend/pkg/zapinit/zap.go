package zapinit

import (
	"log"
	"time"

	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type ZapOption struct {
	IsDebug       bool
	TimePrecision string
	TextFormat    string
	Filename      string
	MaxSize       int
	MaxBackups    int
	MaxAge        int
	Compress      bool
}

// New 配置一个日志记录器
func New(option ZapOption) *zap.Logger {
	if option.IsDebug {
		if logger, err := zap.NewDevelopment(); err != nil {
			log.Fatal("Zap初始化失败: " + err.Error())
		} else {
			return logger
		}
	}
	encoderConfig := zap.NewProductionEncoderConfig()
	timePrecision := option.TimePrecision
	timeFormat := "2006-01-02 15:04:05"
	if timePrecision == "ms" {
		timeFormat = "2006-01-02 15:04:05.000"
	}
	encoderConfig.EncodeTime = func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(t.Format(timeFormat))
	}
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	// 修改时间戳键值，方便导入ELK
	encoderConfig.TimeKey = "created_at"

	encoder := zapcore.NewConsoleEncoder(encoderConfig)
	if option.TextFormat == "json" {
		encoder = zapcore.NewJSONEncoder(encoderConfig)
	}

	lumberJackLogger := &lumberjack.Logger{
		Filename:   option.Filename,
		MaxSize:    option.MaxSize,
		MaxBackups: option.MaxBackups,
		MaxAge:     option.MaxAge,
		Compress:   option.Compress,
	}
	writer := zapcore.AddSync(lumberJackLogger)
	zapCore := zapcore.NewCore(encoder, writer, zap.InfoLevel)
	return zap.New(zapCore)
}
