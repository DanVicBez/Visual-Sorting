sorts.insertionSort = function(array) {
    for(var i = 1; i < array.length; i++) {
        for(var j = i; j > 0 && array[j - 1] > array[j]; j--) {
            select(j);
            array = swap(array, j - 1, j);
        }
    }
};