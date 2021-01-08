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

// Function for swapping the values of two array indices
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
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
