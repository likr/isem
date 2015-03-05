'use strict';

enum Level {
  OFF,
  FATAL,
  ERROR,
  WARN,
  INFO,
  DEBUG
}

class Logger {
  // set level
  static level = Level.DEBUG;

  /**
   * @param {Level}      level
   * @param {IArguments} message
   * @returns {void}
   */
  private static logging(level: Level, message: IArguments) {
    if (Logger.level === Level.OFF) {return}
    var args    = Array.prototype.slice.call(message);
    var logArgs = [new Date().toISOString() + ' |'].concat(args);

    if (level === Level.DEBUG && level <= Logger.level) {
      console.log.apply(console, logArgs);
      return;
    }
    if (level === Level.INFO && level <= Logger.level) {
      console.info.apply(console, logArgs);
      return;
    }
    if (level === Level.WARN && level <= Logger.level) {
      console.warn.apply(console, logArgs);
      return;
    }
    if (level === Level.ERROR && level <= Logger.level) {
      console.error.apply(console, logArgs);
      return;
    }
    if (level === Level.FATAL && level <= Logger.level) {
      var fatalLogArgs = ['[FATAL]'].concat(logArgs);
      console.error.apply(console, fatalLogArgs);
      return;
    }
  }

  /* public */
  static debug(...args: any[]) {
    Logger.logging(Level.DEBUG, arguments);
  }

  static debugTrace(...args: any[]) {
    if (Logger.level === Level.OFF) {return}
    Logger.debug(arguments);
    console.trace();
  }

  static info(...args: any[]) {
    Logger.logging(Level.INFO, arguments);
  }

  static infoTrace(...args: any[]) {
    if (Logger.level === Level.OFF) {return}
    Logger.info(arguments);
    console.trace();
  }

  static warn(...args: any[]) {
    Logger.logging(Level.WARN, arguments);
  }

  static warnTrace(...args: any[]) {
    if (Logger.level === Level.OFF) {return}
    Logger.warn(arguments);
    console.trace();
  }

  static error(...args: any[]) {
    if (Logger.level === Level.OFF) {return}
    Logger.logging(Level.ERROR, arguments);
  }

  static fatal(...args: any[]) {
    Logger.logging(Level.FATAL, arguments);
  }
}

export = Logger;
