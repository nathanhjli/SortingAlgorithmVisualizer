export function getMergeSortAnimations(array) {
  const animations = []
  if (array.length <= 1) return array;
  doMergeSort(array, 0, array.length - 1, animations);
  return animations;
}

function doMergeSort(array, l, r, animations) {
  if (l < r){
    // Find middle
    let m = Math.floor((l + r) / 2);

    // Sort the halves
    doMergeSort(array, l, m, animations);
    doMergeSort(array, m + 1, r, animations);

    // Merge the sorted halves
    merge(array, l, m, r, animations);
  }
}

function merge(array, l, m, r, animations) {
  const n1 = m - l + 1;
  const n2 = r - m;

  let temp_L = [];
  let temp_R = [];

  for (let i = 0; i < n1; i++) {
    temp_L.push(array[l + i]);
  }
  for (let i = 0; i < n2; i++) {
    temp_R.push(array[m + 1 + i]);
  }

  // Merge the two arrays
  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    animations.push([l + i, m + 1 + j, "compared"]);
    animations.push([l + i, m + 1 + j, "default"]);
    if (temp_L[i] < temp_R[j]) {
      array[k] = temp_L[i];
      animations.push([k, array[k]]);
      i++;
    } else {
      array[k] = temp_R[j];
      animations.push([k, array[k]]);
      j++;
    }
    k++;
  }

  // Copy any remaining elements over
  while (i < n1) {
    animations.push([l + i, l + i, "compared"]);
    animations.push([l + i, l + i, "default"]);
    array[k] = temp_L[i];
    animations.push([k, array[k]]);
    i++;
    k++;
  }

  while (j < n2) {
    animations.push([m + 1 + j, m + 1 + j, "compared"]);
    animations.push([m + 1 + j, m + 1 + j, "default"]);
    array[k] = temp_R[j];
    animations.push([k, array[k]]);
    j++;
    k++;
  }
}

export function getQuickSortAnimations(array) {
  const animations = []
  if (array.length <= 1) return array;
  doQuickSort(array, 0, array.length - 1, animations);
  return animations;
}

function doQuickSort(array, low, high, animations) {
  if (low < high) {
    let partition_index = partition(array, low, high, animations);

    doQuickSort(array, low, partition_index - 1, animations);
    doQuickSort(array, partition_index + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  // Select the first element as pivot and create the partitions
  let pivot = array[high];
  let j = low - 1;

  for (let i = low; i < high; i++) {
    animations.push([i, high, "compared"]);
    animations.push([i, high, "default"]);
    // If any elements are larger than pivot, swap them to the end of the array
    if (array[i] < pivot) {
      j++;

      swap(array, i, j);
      animations.push([i, array[i], j, array[j]]);
    }
  }

  // Now, pivot should go to index j+1 since everything before that is smaller
  swap(array, j+1, high);
  animations.push([j+1, array[j+1], high, array[high]]);

  return j+1;
}

export function getHeapSortAnimations(array) {
  const animations = []
  if (array.length <= 1) return array;
  doHeapSort(array, array.length, animations);
  return animations;
}

function doHeapSort(array, n, animations) {
  // Build the heap from array
  for (let i = n/2 - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // Extract each element from the heap. Since array needs to be sorted in increasing order
  // the root of the max-heap needs to go to the end of the array
  for (let i = n - 1; i > 0; i--) {
    // Move the root to the end
    swap(array, 0, i);
    animations.push([0, array[0], i, array[i]]);

    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  // This function turns the subtree rooted from i into a max heap
  let largest = i; 
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n) {
    animations.push([largest, l, "compared"]);
    animations.push([largest, l, "default"]);
    if (array[l] > array[largest]) {
      largest = l;
    }
  }

  if (r < n) {
    animations.push([largest, r, "compared"]);
    animations.push([largest, r, "default"]);
    if (array[r] > array[largest]) {
      largest = r;
    }
  }

  if (largest !== i) {
    swap(array, i, largest);
    animations.push([i, array[i], largest, array[largest]]);

    // Heapify the subtree from the largest
    heapify(array, n, largest, animations);
  }
}

export function getBubbleSortAnimations(array) {
  const animations = []
  if (array.length <= 1) return array;
  doBubbleSort(array, animations);
  return animations;
}

function doBubbleSort(array, animations) {
  const n = array.length;
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-i-1; j++) {
      // Comparing element at index j and j + 1
      animations.push([j, j+1, "compared"]);

      if (array[j] > array[j+1]) {
        // Place the animation for swapping them
        animations.push([j, array[j+1], j+1, array[j]]);
        swap(array, j, j+1);
      }

      // Change the colour back
      animations.push([j, j+1, "default"]);
    }
  }
}

export function getInsertionSortAnimations(array) {
  const animations = []
  if (array.length <= 1) return array;
  doInsertionSort(array, animations);
  return animations;
}

function doInsertionSort(array, animations) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let cur = array[i];
    let j = i - 1;

    // Move cur ahead of all elements of array[0..i-1] that are larger than it
    while (j >= 0 && array[j] > cur) {
      // Adding string to signify what the colour change should be
      animations.push([i, j, "compared"]);

      array[j+1] = array[j];
      animations.push([j+1, array[j]]);
      animations.push([i, j, "default"]);
      j -= 1;
    }
    array[j + 1] = cur;
    animations.push([j+1, cur]);
  }
}

export function getSelectionSortAnimations(array) {
  const animations = []
  if (array.length <= 1) return array;
  doSelectionSort(array, animations);
  return animations;
}

function doSelectionSort(array, animations) {
  const n = array.length;
  
  for (let i = 0; i < n-1; i++) {
    let min_index = i;
    for (let j = i+1; j < n; j++) {
      // Perform comparisons to find smallest element
      animations.push([min_index, j, "compared"]);
      animations.push([min_index, j, "default"]);
      if (array[j] < array[min_index]) {
        min_index = j;
      }
    }

    // Swap the minimum element with the first element of the unsorted subarray
    swap(array, min_index, i);
    animations.push([i, array[i], min_index, array[min_index]]);
  }
}

// Function for swapping the values of two array indices
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
