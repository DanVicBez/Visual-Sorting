sorts.bubbleSortFast = function(array) {
    var swaps;

    for(var i1 = 0; i1 < array.length; i1++) {
        swaps = 0;
        for(var i2 = 0; i2 < array.length - i1 - 1; i2++) {
            select(i2);
            if(array[i2] > array[i2 + 1]) {
                array = swap(array, i2, i2 + 1);
                swaps++;
            }
        }

        // No swaps have been made, the array is sorted
        if(swaps === 0) {
            return;
        }
    }
};