/**
 * Generic Binary Search algorithm to find the index where to put
 * a newer item to the array.
 * i: First index from chunked array
 * j: Last index from chunked array
 * n: Value to evaluate
 * */
const BinarySearch = (i, j, a, n) => {
  // We calculate pivot
  const pivot = Math.floor((j - i) / 2) + i;

  // First Case
  if (a.length === 0) return 0;

  // Case when we can't find the item
  if (j < i) return i;

  // Greater than
  if (a[pivot]?.date > n) return BinarySearch(i, pivot - 1, a, n);

  // Less than
  if (a[pivot]?.date < n) return BinarySearch(pivot + 1, j, a, n);

  // Equal than
  if (a[pivot] === n) return pivot;
};

module.exports = BinarySearch;
