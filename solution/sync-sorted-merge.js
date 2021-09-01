"use strict";
const BinarySearch = require("./algorithm/binary-search");

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  let log = undefined;
  let logBucket = [];
  let logBucketIndex = 0;

  // Validations
  if (!logSources) return console.log("logSources was empty.");

  // We obtain and order the logs in an array
  logSources.map((source, index) => {
    while ((log = source.pop())) {
      logBucketIndex = BinarySearch(
        0,
        logBucket.length - 1,
        logBucket,
        log.date
      );
      logBucket.splice(logBucketIndex, 0, log);
    }
  });

  // We print the ordered logs
  logBucket.forEach((cachedLog) => printer.print(cachedLog));

  return console.log("Sync sort complete.");
};
