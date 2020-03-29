export const LOG_LEVELS = {
  VERBOSE: {
    level: 1,
    func: console.log // eslint-disable-line no-console
  },
  DEBUG: {
    level: 2,
    func: console.log // eslint-disable-line no-console
  },
  INFO: {
    level: 3,
    func: console.log // eslint-disable-line no-console
  },
  WARN: {
    level: 4,
    func: console.warn // eslint-disable-line no-console
  },
  ERROR: {
    level: 5,
    func: console.error // eslint-disable-line no-console
  }
};

export default new class Logger {
  constructor() {
    this.minLevelString = (process.env.CHAINSORT_LOG_LEVEL || 'error').toUpperCase();
    this.minLevel = LOG_LEVELS[this.minLevelString].level;
  }

  _log(levelString, ...args) {
    let { level, func } = LOG_LEVELS[levelString];
    if(level >= this.minLevel) {
      func(this._prefix, ...args);
    }
  }

  verbose(...args) {
    this._log('VERBOSE', ...args);
  }

  debug(...args) {
    this._log('DEBUG', ...args);
  }

  info(...args) {
    this._log('INFO', ...args);
  }

  warn(...args) {
    this._log('WARN', ...args);
  }

  error(...args) {
    this._log('ERROR', ...args);
  }

  get _prefix() {
    return `chainsort.js - ${this.minLevelString}:`;
  }
};
