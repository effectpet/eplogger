const fs = require('fs');

/**
 * Simple logger class
 */
module.exports = class EPLogger {

	/**
	  * @param {object} options Configuration options
	  * @param {string} options.logFolder Path to the log folder
	  * @param {string} options.logFile Name of the log file (if singleFile is enabled)
	  * @param {boolean} options.singleFile Enable single file logging
	  * @param {boolean} options.filePerDay Enable one file per day (adds yearmonthday to filename)
	  */
	constructor(options = {}) {
		this.logFolder = (options.folder !== undefined ? options.folder : './log');
		this.logFile = (options.file !== undefined ? options.file : 'application.log');
		this.singleFile = (options.singleFile !== undefined ? options.singleFile : true);
		this.filePerDay = (options.filePerDay !== undefined ? options.filePerDay : false);
	}

	/**
	  * Writes an error log entry
	  *
	  * @param {string} msg Message to log
	  */
	async error(msg) {
		this.write('error', msg);
	}

	/**
	 * Writes an info log entry
	 *
	 * @param {string} msg Message to log
	 */
	async info(msg) {
		this.write('info', msg);
	}

	/**
	 * Writes an notice log entry
	 *
	 * @param {string} msg Message to log
	 */
	async notice(msg) {
		this.write('notice', msg);
	}

	/**
	 * Writes an warning log entry
	 *
	 * @param {string} msg Message to log
	 */
	async warning(msg) {
		this.write('warning', msg);
	}

	/**
	 * Writes an log entry with given tag
	 *
	 * @param {string} tag Tag to log (or filename if options.singleFile is disabled)
	 * @param {string} msg Message to log
	 */
	async write(tag, msg) {
		EPLogger.checkFolderExistence(this.logFolder);

		const date = new Date();
		const strDate = `${date.getFullYear()}-${EPLogger.pad(date.getMonth(), 2)}-${EPLogger.pad(date.getDay(), 2)} ${EPLogger.pad(date.getHours(), 2)}:${EPLogger.pad(date.getMinutes(), 2)}:${EPLogger.pad(date.getSeconds(), 2)}`;

		let fileName = `${this.logFile}`;
		let printMsg = `[${strDate}] [${tag}] ${msg}\n`;

		if (this.singleFile === false) {
			fileName = `${tag}.log`;
			printMsg = `[${strDate}] ${msg}\n`;
		}

		if (this.filePerDay === true) {
			fileName = `${date.getFullYear()}${EPLogger.pad(date.getMonth(), 2)}${EPLogger.pad(date.getDay(), 2)}_${fileName}`;
		}

		const appendFileCallback = function cb(err) {
			if (err) {
				throw err;
			}
		};

		fs.appendFile(`${this.logFolder}/${fileName}`, printMsg, appendFileCallback);
	}

	/**
	 * @private
	 * Checks if a folder exists or creates it
	 *
	 * @param {string} folder Path to folder
	 */
	static checkFolderExistence(folder) {
		if (fs.existsSync(folder) === false) {
			fs.mkdirSync(folder);
		}
	}

	/**
	 * Adds leading zeros to given number
	 *
	 * @param {integer} num Number to edit
	 * @param {integer} size Size of number
	 *
	 * @returns {string}
	 */
	static pad(num, size) {
		let s = `${num}`;
		while (s.length < size) {
			s = `0${s}`;
		}

		return s;
	}

};
