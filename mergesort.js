sorts.mergeSort = function(array, index) {
    var left = [],
        right = [];
    
    index = index || 0;

    if(array.length === 1) {
        return array;
    }

    // Divide array into left and right halves
    array.forEach(function(num, ind) {
        if(ind < array.length / 2) {
            left.push(num);
        } else {
            right.push(num);
        }
    });

    // merge sort left array
    left = sorts.mergeSort(left, index);
    // merge sort right array
    right = sorts.mergeSort(right, index + left.length);

    return merge(left, right, index);
};

// Merge sorted arrays a and b into one sorted array
function merge(a, b, index) {
    var merged = [];
    
    selectMultiple(index, index + a.length + b.length - 1);

    while(a.length > 0 && b.length > 0) {
        var value;
        
        if(a[0] <= b[0]) {
            value = a.shift();
            
            merged.push(value);
            replace(index++, value);
        } else {
            value = b.shift();
            
            merged.push(value);
            replace(index++, value);
        }
    }

    // Excess left values
    while(a.length > 0) {
        var value = a.shift();
        
        merged.push(value);
        replace(index++, value);
    }

    // Excess right values
    while(b.length > 0) {
        var value = b.shift();
        
        merged.push(value);
        replace(index++, value);
    }

    return merged;
}