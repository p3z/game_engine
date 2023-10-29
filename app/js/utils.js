function random_num(floor, ceil){

    return Math.floor(Math.random() * (ceil - floor + 1) + floor);
    
} // end random_num

// Returns an array of rgba color objects
function random_rgba(qty = 1){

    let colors = [];

    for(let i = 0; i < qty; i++){

        let color = {};

        let r = random_num(0, 255);
        let g = random_num(0, 255);
        let b = random_num(0, 255);
        let a = random_num(0, 100) / 100;

        let val = `rgba(${r}, ${g}, ${b}, ${a})`;

        colors.push(val);
    }

    return colors;
    
}

function rand_arr_select(arr){
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}