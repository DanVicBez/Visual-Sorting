var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    delay = document.getElementById('delay'),
    type = document.getElementById('type'),
    btnSort = document.getElementById('sort'),
    btnShuffle = document.getElementById('shuffle'),
    time = document.getElementById('time'),
    size = document.getElementById('size'),
    skip = document.getElementById('skip'),
    timeout,
    sorted = false,
    array = [],
    index = -1,
    selected,
    sorts = [],
    actions = [],
    timeStart,
    timeEnd,
    delayStart = 0,
    skipped;

for(var i = 0; i < 50; i++) {
    array.push(i + 1);
}

btnShuffle.addEventListener('click', function() {
    clearTimeout(timeout);

    sorted = false;
    actions = [];

    array = [];
    var arrSize = parseFloat(size.value) || 50;

    for(var i = 0; i < arrSize; i++) {
        array.push(i + 1);
    }

    shuffle();
});

btnSort.addEventListener('click', function() {    
    index = -1;
    skipped = 0;
    selected = undefined;

    clearTimeout(timeout);

    timeStart = window.performance.now();
    time.innerText = '';

    sorted = false;
    actions = [];

    var copy = array.slice();
    switch(type.selectedIndex) {
        case 0:
            sorts.bubbleSort(copy);
            break;
        case 1:
            sorts.bubbleSortFast(copy);
            break;
        case 2:
            sorts.mergeSort(copy);
            break;
        case 3:
            sorts.quickSort(copy);
            break;
        case 4:
            sorts.insertionSort(copy);
            break;
        case 5:
            sorts.selectionSort(copy);
            break;
    }

    sorted = true;
});

// Calculates how long it took to sort the array
function sortDone() {
    timeEnd = window.performance.now();

    time.innerText = 'Sort time: ' + (Math.round((timeEnd - timeStart)) / 1000) + ' seconds';

    selected = undefined;
}

// Draws the array onto the canvas
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if(sorted && (window.performance.now() - delayStart) > delay.value) {
        if(actions.length > 0) {
            while(skipped++ <= Math.max(0, +skip.value) && actions.length) {
                process(actions.shift());
            }

            skipped = 0;
            delayStart = window.performance.now();
        } else {
            sortDone();
            sorted = false;
        }
    }

    var cols = array.length;
    var width = canvas.width / cols;

    context.fillStyle = 'blue';

    // Draw the array
    for(var i = 0; i < cols; i++) {
        if(i === index) {
            context.fillStyle = 'red';
        } else if(selected && i >= selected.lo && i <= selected.hi) {
            context.fillStyle = '#eb0';
        } else if(array[i] - 1 === i) {
            context.fillStyle = 'green';
        } else {
            context.fillStyle = 'blue';
        }

        var height = array[i] * (500 / array.length) + 10;
        context.fillRect(i * width, canvas.height - height, width, height);
    }    


    requestAnimationFrame(render);
}

// Processes one action
function process(action) {
    switch(action.type) {
        case 'select':
            index = action.value;
            break;
        case 'selectMultiple':
            selected = {lo: action.lo, hi: action.hi};
            break;
        case 'swap':
            var temp = array[action.a];
            array[action.a] = array[action.b];
            array[action.b] = temp;

            // Since a select always comes after a swap, we just do the next select right here
            if(actions.length && actions[0].type === 'select') {
                process(actions.shift());
            }
            break;
        case 'replace':
            array[action.index] = action.value;   
            break;
    }   
}

// Shuffles the array (Fisher-Yates shuffle)
function shuffle() {
    var rand;
    for(var i = 0; i < array.length; i++) {
        rand = Math.round(Math.random() * (array.length - 1));

        var temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
}

// Swaps array[a] and array[b], and adds the swap to the actions array
function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;

    actions.push({type: 'swap', a: a, b: b});

    return array;
}

// Adds an element selection to the actions array
function select(value) {
    actions.push({type: 'select', value: value});
}

// Turns the selected range of indices yellow (lo and hi are inclusive)
function selectMultiple(lo, hi) {
    actions.push({type: 'selectMultiple', lo: lo, hi: hi});    
}

// Used for merge sort
function replace(index, value) {
    actions.push({type: 'replace', index: index, value: value});
}

requestAnimationFrame(render);