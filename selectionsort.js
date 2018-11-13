sorts.selectionSort = function(array) {
    var min;
    
    for(var i = 0; i < array.length; i++) {
        min = i;
        
        for(var j = i; j < array.length; j++) {
            select(j);
            if(array[j] < array[min]) min = j;
        }
        
        array = swap(array, min, i);
    }
};