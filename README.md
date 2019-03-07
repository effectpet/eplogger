## About
EPLogger is a simple, async logger class without external dependencies.

## Howto use
```javascript
	const EPLogger = require('eplogger');
	const logger = new EPLogger({
		logFolder: './log',
		logFile: 'application.log',
		singleFile: true,
		filePerDay: false
	});

	logger.error('Some error message');
	logger.info('Some info message');
	logger.notice('Some notice message');
	logger.warning('Some warning message');
	logger.write('custom tag', 'Some custom warning');
```

Following options exist:
-   `options.logFolder` Path to the log folder
-   `options.logFile` Name of the log file (if singleFile is enabled)
-   `options.singleFile` Enable single file logging
-   `options.filePerDay` Enable one file per day (adds yearmonthday to filename)

LogFile looks like this:
```
[2019-02-04 13:07:11] [error] Some error message
[2019-02-04 13:07:11] [info] Some info message
[2019-02-04 13:07:11] [warning] Some warning message
[2019-02-04 13:07:11] [notice] Some notice message
[2019-02-04 13:07:11] [custom tag] Some custom warning
```
