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
      animations.push([j, j+1]);

      if (array[j] > array[j+1]) {
        // Place the animation for swapping them
        animations.push([j, array[j+1], j+1, array[j]]);
        swap(array, j, j+1);
      } else {
        // Place filler animation to keep them the same
        animations.push([j, array[j], j+1, array[j+1]]);
      }

      // Change the colour back
      animations.push([j, j+1]);
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
