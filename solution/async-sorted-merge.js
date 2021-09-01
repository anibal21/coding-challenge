"use strict";
const BinarySearch = require("./algorithm/binary-search");

// We drain the logs into an array, until we recieve false
const promiseRunner = (source, resolve, bucketListBySource) =>
  source.popAsync().then((promiseResolved) => {
    if (promiseResolved) {
      bucketListBySource.push(promiseResolved);
      promiseRunner(source, resolve, bucketListBySource);
    } else {
      resolve("done");
    }
  });

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    let log = undefined;
    let logBucket = [];
    let logBucketIndex = "";
    let promisesList = [];
    let drainCounter = 0;

    // Validations
    if (!logSources) return console.log("logSources was empty.");

    // We obtain and order the logs in an array
    logSources.map((source) =>
      new Promise((resolveSources) =>
        // We start the to drain the logs from a source
        promiseRunner(source, resolveSources, promisesList)
      ).then(() => {
        // We count the finished drains
        drainCounter++;

        // We start to evaluate logs after the last promise
        if (drainCounter === logSources.length) {
          // We order the logs
          while (promisesList.length) {
            log = promisesList.pop();
            logBucketIndex = BinarySearch(
              0,
              logBucket.length - 1,
              logBucket,
              log.date
            );
            logBucket.splice(logBucketIndex, 0, log);
          }
          // We print the logs
          logBucket.forEach((cachedLog) => {
            printer.print(cachedLog);
          });

          // We finish all the operation and close the first promise
          resolve(console.log("Async sort complete."));
        }
      })
    );
  });
};
