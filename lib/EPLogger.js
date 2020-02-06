const fs = require('fs');
const path = require('path');

/**
 * Simple logger class
 */
module.exports = class EPLogger {

	/**
	  * @param {object} options Configuration options
	  * @param {string} options.folder Path to the log folder
	  * @param {string} options.file Name of the log file (if singleFile is enabled)
	  * @param {boolean} options.singleFile Enable single file logging
	  * @param {boolean} options.filePerDay Enable one file per day (adds yearmonthday to filename)
	  */
	constructor(options = {}) {
		this.folder = (options.folder !== undefined ? options.folder : './log');
		this.file = (options.file !== undefined ? options.file : 'application.log');
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
		EPLogger.checkFolderExistence(this.folder);

		const date = new Date();
		const dateDay = EPLogger.pad(date.getDate(), 2);
		const dateMonth = EPLogger.pad(date.getMonth() + 1, 2);
		const dateYear = date.getFullYear();

		const dateHours = EPLogger.pad(date.getHours(), 2);
		const dateMinutes = EPLogger.pad(date.getHours(), 2);
		const dateSeconds = EPLogger.pad(date.getHours(), 2);

		const strDate = `${dateYear}-${dateMonth}-${dateDay} ${dateHours}:${dateMinutes}:${dateSeconds}`;

		let fileName = `${this.file}`;
		let printMsg = `[${strDate}] [${tag}] ${msg}\n`;

		if (this.singleFile === false) {
			fileName = `${tag}.log`;
			printMsg = `[${strDate}] ${msg}\n`;
		}

		if (this.filePerDay === true) {
			fileName = `${fileName}_${dateYear}${dateMonth}${dateDay}`;
		}

		const appendFileCallback = function cb(err) {
			if (err) {
				throw err;
			}
		};

		fs.appendFile(path.join(this.folder, fileName), printMsg, appendFileCallback);
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
