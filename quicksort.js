sorts.quickSort = function(array, lo, hi) {
    if(lo >= hi) {
        return array;
    }

    lo = lo || 0;
    hi = hi || array.length - 1;

    var wall = lo,
        pivot = Math.floor((lo + hi) / 2);

    // Place the pivot at the end
    array = swap(array, pivot, hi);
    pivot = hi;

    select(pivot);
    selectMultiple(lo, hi);

    for(var i = lo; i < hi; i++) {
        if(array[i] <= array[pivot]) {
            array = swap(array, i, wall++);
        }
    }

    // Move pivot to final location
    array = swap(array, pivot, wall);
    pivot = wall;

    // Quicksort left of pivot
    array = sorts.quickSort(array, lo, pivot - 1);
    // Quicksort right of pivot
    array = sorts.quickSort(array, pivot + 1, hi);

    return array;
};