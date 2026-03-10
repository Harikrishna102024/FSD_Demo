const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;
import DailyRotateFile from "winston-daily-rotate-file";


const myFormat = printf(({ level, message, timestamp }: { level: string; message: string; timestamp: string }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const formatter = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  myFormat
)

const logger = createLogger({

  level: "info",
  format: formatter,

  transports: [

    // new transports.File({
    //   filename: "src/logs/app.log",
    // }),

    // new transports.File({
    //   filename: "src/logs/error.log",
    //   level: "error"
    // }),

    // new transports.File({
    //   filename: "src/logs/warn.log",
    //   level: "warn"
    // }),

    // new transports.File({
    //   filename: "src/logs/info.log",
    //   level: "info",
    // })

    new DailyRotateFile({
      filename: 'src/logs/app-%DATE%.log',
      datePattern: "YYYY-MM-DD",
      maxFiles: '1d',
      auditFile: "src/logs/audit.json"
    })

  ]
});


export default logger;